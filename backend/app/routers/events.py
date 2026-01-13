# from fastapi import APIRouter, Depends
# from app.dependencies.auth import get_current_user
# from app.db.database import conn

# router = APIRouter()

# @router.post("/")
# def create_event(event: dict, user_id: str = Depends(get_current_user)):
#     cur = conn.cursor()
#     cur.execute(
#         """
#         INSERT INTO events
#         (user_id, title, description, event_date, start_time, end_time, notify_before)
#         VALUES (%s, %s, %s, %s, %s, %s, %s)
#         """,
#         (
#             user_id,
#             event["title"],
#             event.get("description"),
#             event["event_date"],
#             event["start_time"],
#             event["end_time"],
#             event.get("notify_before"),
#         )
#     )
#     conn.commit()
#     return {"message": "Event created"}


# @router.get("/")
# def get_events(user_id: str = Depends(get_current_user)):
#     cur = conn.cursor()
#     cur.execute(
#         """
#        SELECT id, title, description, event_date, start_time, end_time, notify_before
#         FROM events
#         WHERE user_id = %s
#         """,
#         (user_id,)
#     )
#     events = cur.fetchall()

#     return [
#        {
#   "id": e[0],
#   "title": e[1],
#   "description": e[2],
#   "start": f"{e[3]}T{e[4]}",
#   "end": f"{e[3]}T{e[5]}",
#   "notify_before": e[6],
# }

#         for e in events
#     ]

# @router.put("/{event_id}")
# def update_event(event_id: str, event: dict, user_id: str = Depends(get_current_user)):
#     cur = conn.cursor()
#     cur.execute(
#         """
#         UPDATE events
#         SET title=%s,
#             description=%s,
#             event_date=%s,
#             start_time=%s,
#             end_time=%s,
#             notify_before=%s
#         WHERE id=%s AND user_id=%s
#         """,
#         (
#             event["title"],
#             event.get("description"),
#             event["event_date"],
#             event["start_time"],
#             event["end_time"],
#             event.get("notify_before"),
#             event_id,
#             user_id,
#         )
#     )
#     conn.commit()
#     return {"message": "Event updated"}


# @router.delete("/{event_id}")
# def delete_event(event_id: str, user_id: str = Depends(get_current_user)):
#     cur = conn.cursor()
#     cur.execute(
#         "DELETE FROM events WHERE id=%s AND user_id=%s",
#         (event_id, user_id)
#     )
#     conn.commit()
#     return {"message": "Event deleted"}

from fastapi import APIRouter, Depends
from app.dependencies.auth import get_current_user
from app.db.database import get_db

router = APIRouter()

@router.post("/")
def create_event(event: dict, user_id: str = Depends(get_current_user)):
    conn = get_db()
    cur = conn.cursor()

    cur.execute(
        """
        INSERT INTO events
        (user_id, title, description, event_date, start_time, end_time, notify_before)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
        """,
        (
            user_id,
            event["title"],
            event.get("description"),
            event["event_date"],
            event["start_time"],
            event["end_time"],
            event.get("notify_before"),
        )
    )

    conn.commit()
    cur.close()
    conn.close()

    return {"message": "Event created"}


@router.get("/")
def get_events(user_id: str = Depends(get_current_user)):
    conn = get_db()
    cur = conn.cursor()

    cur.execute(
        """
        SELECT id, title, description, event_date, start_time, end_time, notify_before
        FROM events
        WHERE user_id = %s
        """,
        (user_id,)
    )

    events = cur.fetchall()

    cur.close()
    conn.close()

    return [
        {
            "id": e[0],
            "title": e[1],
            "description": e[2],
            "start": f"{e[3]}T{e[4]}",
            "end": f"{e[3]}T{e[5]}",
            "notify_before": e[6],
        }
        for e in events
    ]


@router.put("/{event_id}")
def update_event(event_id: str, event: dict, user_id: str = Depends(get_current_user)):
    conn = get_db()
    cur = conn.cursor()

    cur.execute(
        """
        UPDATE events
        SET title=%s,
            description=%s,
            event_date=%s,
            start_time=%s,
            end_time=%s,
            notify_before=%s
        WHERE id=%s AND user_id=%s
        """,
        (
            event["title"],
            event.get("description"),
            event["event_date"],
            event["start_time"],
            event["end_time"],
            event.get("notify_before"),
            event_id,
            user_id,
        )
    )

    conn.commit()
    cur.close()
    conn.close()

    return {"message": "Event updated"}


@router.delete("/{event_id}")
def delete_event(event_id: str, user_id: str = Depends(get_current_user)):
    conn = get_db()
    cur = conn.cursor()

    cur.execute(
        "DELETE FROM events WHERE id=%s AND user_id=%s",
        (event_id, user_id)
    )

    conn.commit()
    cur.close()
    conn.close()

    return {"message": "Event deleted"}
