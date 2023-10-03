import os

import boto3
from dotenv import load_dotenv
from fastapi import FastAPI, UploadFile, HTTPException
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from starlette.middleware.cors import CORSMiddleware

from model import models
from model.models import User

app = FastAPI()

load_dotenv()

# MYSQL_HOST = os.getenv("MYSQL_HOST")
# MYSQL_USER = os.getenv("MYSQL_USER")
# MYSQL_PASSWORD = os.getenv("MYSQL_PASSWORD")
# MYSQL_DATABASE = os.getenv("MYSQL_DATABASE")

MYSQL_HOST = "localhost"
MYSQL_USER = "root"
MYSQL_PASSWORD = "root"
MYSQL_DATABASE = "detection"

# SQLAlchemy 엔진 생성
SQLALCHEMY_DATABASE_URL = f"mysql+mysqlconnector://{MYSQL_USER}:{MYSQL_PASSWORD}@{MYSQL_HOST}/{MYSQL_DATABASE}"
engine = create_engine(SQLALCHEMY_DATABASE_URL)
models.Base.metadata.create_all(bind=engine)

# SQLAlchemy 세션 생성
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# SQLAlchemy 연결 종료
@app.on_event("shutdown")
def shutdown_event():
    engine.dispose()


@app.get("/fast")
async def root():
    return {"message": "Hello World"}


access_key = os.getenv("access_key")
secret_key = os.getenv("secret_key")
region_name = os.getenv("region_name")
bucket_name = os.getenv("bucket_name")


s3_client = boto3.client(
    "s3",
    aws_access_key_id=access_key,
    aws_secret_access_key=secret_key,
    region_name=region_name,
)


@app.get("/users")
def read_users(skip: int = 0, limit: int = 10):
    db = SessionLocal()
    users = db.query(User).offset(skip).limit(limit).all()
    return {
        "users": [
            dict(
                user_id=user.id,
                picture=user.picture,
                word=user.word,
                letter=user.letter,
            )
            for user in users
        ]
    }


@app.post("/upload")
async def upload_file(file: UploadFile):
    file_location = f"uploads/{file.filename}"
    try:
        s3_client.upload_fileobj(
            file.file,
            bucket_name,
            file_location,
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=e)

    file_url = f"https://{bucket_name}.s3.{region_name}.amazonaws.com/{file_location}"
    return {"file_url": file_url}
