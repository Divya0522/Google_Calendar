from fastapi import APIRouter, HTTPException
from app.schemas.user import UserRegister, UserLogin
from app.models.user import get_user_by_email, create_user
from app.core.security import hash_password, verify_password, create_access_token

router = APIRouter()

@router.post("/register")
def register(data: UserRegister):
    if get_user_by_email(data.email):
        raise HTTPException(status_code=400, detail="Email exists")

    create_user(data.email, hash_password(data.password))
    return {"message": "User registered"}

@router.post("/login")
def login(data: UserLogin):
    user = get_user_by_email(data.email)
    if not user or not verify_password(data.password, user[1]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token(user[0])
    return {"access_token": token}
