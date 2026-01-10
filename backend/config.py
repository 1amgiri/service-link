import os

class Config:
    # SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:password@localhost/servicelink'
    # Use environment variables for security in production, fallback for dev
    # If on Vercel and no DATABASE_URL, fallback to temp sqlite to prevent crash
    if os.environ.get('VERCEL') and not os.environ.get('DATABASE_URL'):
        SQLALCHEMY_DATABASE_URI = 'sqlite:////tmp/servicelink.db'
    else:
        SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'mysql+pymysql://root:2060@localhost/servicelink_db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev_secret_key'
