import os

import boto3
from dotenv import load_dotenv
from fastapi import FastAPI, UploadFile, HTTPException

from config.cors_config import setup_cors

load_dotenv()
app = FastAPI()
setup_cors(app)


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
