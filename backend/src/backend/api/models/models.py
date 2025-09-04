from sqlmodel import Field, SQLModel
from enum import Enum
from uuid import UUID


class UserRoles(Enum):
    Admin = "admin"
    Student = "student"
    Teacher = "teacher"


class User(SQLModel, table=True):
    # will be none in our code/api
    id: UUID | None = Field(default=None, primary_key=True)
    full_name: str
    email: str
    password: str = Field(exclude=True)
    phone_number: str | None = None
    role: UserRoles
