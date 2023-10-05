import os
import shutil
from collections import defaultdict

import boto3
import cv2
import numpy as np
import tensorflow as tf
from PIL import Image
from dotenv import load_dotenv
from fastapi import FastAPI, UploadFile, Form, File
from keras.src.utils import img_to_array
from pydantic import BaseModel
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from starlette.middleware.cors import CORSMiddleware

from model import models
from model.models import Word
from segmentation.predict_image import segmentation

os.environ["CUDA_DEVICE_ORDER"] = "PCI_BUS_ID"
os.environ["CUDA_VISIBLE_DEVICES"] = "-1"


class ObjectImage(BaseModel):
    image: str = None
    answer: str


class ResultDto(BaseModel):
    image: str = None
    result: bool


model = tf.keras.models.load_model("ai/keras.h5")

inception_model = tf.keras.applications.InceptionV3(
    include_top=True,
    weights="imagenet",
    input_tensor=None,
    input_shape=None,
    pooling=None,
    classes=1000,
    classifier_activation="softmax",
)


app = FastAPI()

load_dotenv()

MYSQL_HOST = os.getenv("MYSQL_HOST")
MYSQL_USER = os.getenv("MYSQL_USER")
MYSQL_PASSWORD = os.getenv("MYSQL_PASSWORD")
MYSQL_DATABASE = os.getenv("MYSQL_DATABASE")


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
def read_users():
    db = SessionLocal()
    users = db.query(Word).all()
    return users


@app.post("/uploads")
async def upload(userId: int = Form(...), file: UploadFile = File(...)):
    # file 다운로드 및 저장
    # user_id 폴더 생성
    try:
        os.makedirs(f"segmentation/upload/{userId}")
    except:
        pass

    # 파일 저장
    with open(f"segmentation/upload/{userId}/{file.filename}", "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # 파일 경로 설정
    file_location = f"segmentation/upload/{userId}/{file.filename}"

    # segmentation
    file_paths = segmentation(image_path=file_location, user_id=userId)
    url_list = defaultdict(list)
    for key, value in file_paths.items():
        for v in value:
            s3_client.upload_file(
                f"segmentation/result/{v}.png",
                bucket_name,
                f"segmentation/{v}.png",
            )
            url = f"https://{bucket_name}.s3.{region_name}.amazonaws.com/segmentation/{v}.png"
            url_list[key].append(url)

    return url_list


@app.post("/doodle")
async def analyze_object(file: UploadFile = File(...), userId: int = Form(...)):
    try:
        os.rmdir(f"ai/doodle/{userId}")
    except:
        pass
    try:
        os.makedirs(f"ai/doodle/{userId}")
    except:
        pass

    # 파일 저장
    with open(f"ai/doodle/{userId}/{file.filename}", "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    img = Image.open(f"ai/doodle/{userId}/{file.filename}").resize((28, 28))
    img_array = img_to_array(img)
    img_gray = cv2.cvtColor(img_array, cv2.COLOR_RGB2GRAY)
    img_gray = np.expand_dims(img_gray, axis=-1)
    img_gray = np.expand_dims(img_gray, axis=0)
    class_names = [line.rstrip("\n") for line in open("ai/mini_classes.txt")]
    model = tf.keras.models.load_model("ai/keras.h5")
    pred = model.predict(img_gray)[0]
    ind = (-pred).argsort()[:10]
    latex = [class_names[x] for x in ind]
    return latex
