from flask import Blueprint, request, jsonify
from ..models import User, db
from ..extensions import db

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    # password = data.get('password') # For now we are just simulated login with email like frontend
    
    if not email:
        return jsonify({'error': 'Email is required'}), 400
        
    user = User.query.filter_by(email=email).first()
    
    if not user:
        # Auto-register for simulation simplicity if not exists, or return error?
        # Frontend just sets email in localstorage. Let's create user if not exists to match "just enter email" flow
        # Or returns error to prompt register?
        # The frontend login page just asks for email.
        user = User(email=email, name=email.split('@')[0], password='hashed_password_placeholder')
        db.session.add(user)
        db.session.commit()
    
    return jsonify({'message': 'Login successful', 'user': {'email': user.email, 'name': user.name}}), 200

@auth_bp.route('/register', methods=['POST'])
def register():
    # If we want a separate register flow
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    name = data.get('name')
    
    
    if User.query.filter_by(email=email).first():
        return jsonify({'error': 'User already exists'}), 400
        
    new_user = User(email=email, password=password, name=name)
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({'message': 'User created successfully'}), 201

from google.oauth2 import id_token
from google.auth.transport import requests
import os

@auth_bp.route('/google', methods=['POST'])
def google_login():
    data = request.get_json()
    token = data.get('token')
    
    try:
        # Specify the CLIENT_ID of the app that accesses the backend:
        CLIENT_ID = "288921506718-u24926jau1kav1adn1snvvei1t3dh1u3.apps.googleusercontent.com"
        idinfo = id_token.verify_oauth2_token(token, requests.Request(), CLIENT_ID)

        # ID token is valid. Get the user's Google Account information from the decoded token.
        email = idinfo['email']
        name = idinfo.get('name')
        
        user = User.query.filter_by(email=email).first()
        if not user:
            # Create user if not exists
            user = User(email=email, name=name, password='google_oauth_placeholder')
            db.session.add(user)
            db.session.commit()
            
        return jsonify({'message': 'Google login successful', 'user': {'email': user.email, 'name': user.name, 'isGoogle': True}}), 200
        
    except ValueError:
        # Invalid token
        return jsonify({'error': 'Invalid Google Token'}), 401
