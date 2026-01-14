from app.db.database import get_db

def get_user_by_email(email: str):
    conn = get_db()
    cur = conn.cursor()

    cur.execute(
        "SELECT id, password_hash FROM users WHERE email=%s",
        (email,)
    )

    user = cur.fetchone()

    cur.close()
    conn.close()

    return user


def create_user(email: str, password_hash: str):
    conn = get_db()
    cur = conn.cursor()

    cur.execute(
        "INSERT INTO users (email, password_hash) VALUES (%s, %s)",
        (email, password_hash)
    )

    conn.commit()
    cur.close()
    conn.close()
