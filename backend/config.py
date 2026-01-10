import os

class Config:
    # SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:password@localhost/servicelink'
    # Use environment variables for security in production, fallback for dev
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'mysql+pymysql://root:2060@localhost/servicelink_db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev_secret_key'
