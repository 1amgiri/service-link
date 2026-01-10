from flask import Blueprint, request, jsonify
from ..models import Booking, db
from datetime import datetime

bookings_bp = Blueprint('bookings', __name__)

@bookings_bp.route('/', methods=['POST'])
def create_booking():
    data = request.get_json()
    
    new_booking = Booking(
        id=data.get('id'), # Frontend generates ID
        user_email=data.get('userEmail'),
        service_name=data.get('serviceName'),
        professional_name=data.get('professionalName'),
        professional_email=data.get('professionalEmail'),
        date=data.get('date'),
        time=data.get('time'),
        description=data.get('description'),
        status='pending',
        created_at=int(datetime.utcnow().timestamp() * 1000)
    )
    
    db.session.add(new_booking)
    db.session.commit()
    
    return jsonify(new_booking.to_dict()), 201

@bookings_bp.route('/user', methods=['GET'])
def get_user_bookings():
    email = request.args.get('email')
    if not email:
        return jsonify({'error': 'Email required'}), 400
        
    # Get bookings where user is the requester OR the professional
    from sqlalchemy import or_
    bookings = Booking.query.filter(
        or_(Booking.user_email == email, Booking.professional_email == email)
    ).all()
    
    # Sort by created_at desc
    bookings.sort(key=lambda x: x.created_at, reverse=True)
    
    return jsonify([b.to_dict() for b in bookings]), 200
