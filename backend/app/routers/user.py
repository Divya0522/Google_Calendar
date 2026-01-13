from fastapi import APIRouter, Depends
from app.dependencies.auth import get_current_user
from app.db.database import conn

router = APIRouter()

@router.get("/me")
def get_me(user_id: str = Depends(get_current_user)):
    cur = conn.cursor()
    cur.execute(
        "SELECT id, email FROM users WHERE id=%s",
        (user_id,)
    )
    user = cur.fetchone()

    return {
        "id": user[0],
        "email": user[1]
    }