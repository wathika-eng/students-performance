from sqlmodel import create_engine, SQLModel, Session
import os
from dotenv import load_dotenv
from .models import *
from functools import lru_cache

load_dotenv()


# config variables needed
class Settings:
    # url from .env else use sqlite fallbacl
    DATABASE_URL: str = os.getenv("DB_URL", "sqlite:///./users.sqlite")


@lru_cache()
def get_settings():
    return Settings()


settings = get_settings()

engine = create_engine(settings.DATABASE_URL, echo=True)


# initialize db else throw an error
def init_db():
    try:
        SQLModel.metadata.create_all(bind=engine)
    except Exception as e:
        raise ValueError(f"failed to connect to db {e}")


# get db session
@lru_cache()
def get_session():
    try:
        with Session(engine) as session:
            yield session
    finally:
        session.close()
