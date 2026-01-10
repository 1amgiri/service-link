from flask import Blueprint, request, jsonify
from ..models import Professional, Service, db

professionals_bp = Blueprint('professionals', __name__)

@professionals_bp.route('/', methods=['GET'])
def get_professionals():
    service_id = request.args.get('serviceId')
    if service_id:
        # We need to join with Service to filter by service string ID (e.g. 'plumber')
        # But our Service model has Int ID.
        # Wait, the frontend uses string IDs for services (e.g. 'plumber').
        # My model used Integer ID. I should probably adjust Service model to accept string ID or map it.
        # Let's check Service model again. It has Integer ID.
        # I will look up the service by name (which acts as ID) or allow filtering by Service.name (which is unique).
        
        service = Service.query.filter_by(name=service_id).first() # Assuming frontend sends name/id as query
        # Actually frontend sends 'plumber', 'electrician' which matches Service.id in constants.
        # In DB, if I seed them, I can use those strings as IDs or mapped names.
        # Let's assume I seed Service with name='electrician' etc.
        
        if service:
            pros = Professional.query.filter_by(service_id=service.id).all()
        else:
            return jsonify([]), 200
    elif request.args.get('name'):
        name = request.args.get('name')
        pros = Professional.query.filter_by(name=name).all()
    else:
        pros = Professional.query.all()
        
    return jsonify([p.to_dict() for p in pros]), 200

@professionals_bp.route('/', methods=['POST'])
def add_professional():
    data = request.get_json()
    
    # Check if service exists
    service_name = data.get('serviceId') # Frontend sends 'electrician' etc
    service = Service.query.filter_by(name=service_name).first()
    
    if not service:
        # Maybe create it implicitly or error?
        # Let's error
        return jsonify({'error': 'Service not found'}), 404

    new_pro = Professional(
        name=data.get('name'),
        service_id=service.id,
        description=data.get('description'),
        experience=data.get('experience'),
        fees=data.get('fees'),
        rating=data.get('rating', 0.0),
        is_user_added=True,
        owner_email=data.get('ownerEmail')
    )
    
    db.session.add(new_pro)
    db.session.commit()
    
    return jsonify(new_pro.to_dict()), 201
