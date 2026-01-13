from app.db.database import conn

def get_user_by_email(email: str):
    cur = conn.cursor()
    cur.execute("SELECT id, password_hash FROM users WHERE email=%s", (email,))
    return cur.fetchone()

def create_user(email: str, password_hash: str):
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO users (email, password_hash) VALUES (%s, %s)",
        (email, password_hash)
    )
    conn.commit()
