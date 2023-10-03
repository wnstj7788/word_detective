from sqlalchemy import Column, Integer, String, ForeignKey, create_engine, UUID
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


category = relationship("Category", back_populates="word")


class Photo(Base):
    __tablename__ = "photo"
    photo_id = Column(Integer, primary_key=True)
    url = Column(String(330))
    user_id = Column(Integer, ForeignKey("user.user_id"))
    word_id = Column(Integer, ForeignKey("word.word_id"))


user = relationship("User", back_populates="photo")
word = relationship("Word", back_populates="photo")

engine = create_engine(
    "mysql+mysqlconnector://root:detection-password@j9b105.p.ssafy.io/detection", echo=True
)
Base.metadata.create_all(bind=engine)
