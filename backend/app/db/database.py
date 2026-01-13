import psycopg2
from app.core.config import DATABASE_URL

conn = psycopg2.connect(DATABASE_URL)
