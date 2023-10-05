import os

from dotenv import load_dotenv
from sqlalchemy import Column, Integer, String, ForeignKey, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()


class Category(Base):
    __tablename__ = "category"
    category_id = Column(Integer, primary_key=True)
    name = Column(String(30), nullable=False)


class User(Base):
    __tablename__ = "user"
    user_id = Column(Integer, primary_key=True)
    picture = Column(String(330))
    letter = Column(Integer)
    word = Column(Integer)


class Word(Base):
    __tablename__ = "word"
    word_id = Column(Integer, primary_key=True)
    category_id = Column(Integer, ForeignKey("category.category_id"))
    name = Column(String(30), nullable=False)
    url = Column(String(330))
    cls_num = Column(Integer)


category = relationship("Category", back_populates="word")


class Photo(Base):
    __tablename__ = "photo"
    photo_id = Column(Integer, primary_key=True)
    url = Column(String(330))
    user_id = Column(Integer, ForeignKey("user.user_id"))
    word_id = Column(Integer, ForeignKey("word.word_id"))


user = relationship("User", back_populates="photo")
word = relationship("Word", back_populates="photo")

# load env
load_dotenv(".env")

MYSQL_HOST = os.getenv("MYSQL_HOST")
MYSQL_USER = os.getenv("MYSQL_USER")
MYSQL_PASSWORD = os.getenv("MYSQL_PASSWORD")
MYSQL_DATABASE = os.getenv("MYSQL_DATABASE")

engine = create_engine(
    f"mysql+mysqlconnector://{MYSQL_USER}:{MYSQL_PASSWORD}@{MYSQL_HOST}/{MYSQL_DATABASE}",
    echo=True,
)
Base.metadata.create_all(bind=engine)
