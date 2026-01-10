import pymysql
from backend.config import Config

def init_db():
    uri = Config.SQLALCHEMY_DATABASE_URI
    # Extract params roughly or just assume structure for this helper
    # mysql+pymysql://root:2060@localhost/servicelink
    
    try:
        if 'mysql+pymysql://' in uri:
            parts = uri.split('mysql+pymysql://')[1]
            creds, addr = parts.split('@')
            user, password = creds.split(':')
            host, db_name = addr.split('/')
            
            # Connect without DB to create it
            conn = pymysql.connect(host=host, user=user, password=password)
            cursor = conn.cursor()
            cursor.execute(f"CREATE DATABASE IF NOT EXISTS {db_name}")
            print(f"Database '{db_name}' checked/created.")
            conn.close()
    except Exception as e:
        print(f"Warning: Could not check/create database automatically. Error: {e}")
        print("Ensure the database exists manually if this fails.")

if __name__ == "__main__":
    init_db()
