from fastapi import APIRouter, Depends

# from models import UserBase

router = APIRouter(prefix="/users", tags=["users"])

users = []


@router.post("", status_code=201)
def create_users(new_user: str):

    print(new_user)
    return {"okay"}
