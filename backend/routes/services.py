from flask import Blueprint, jsonify
from ..models import Service

services_bp = Blueprint('services', __name__)

@services_bp.route('/', methods=['GET'])
def get_services():
    services = Service.query.all()
    # Return simplifed list
    return jsonify([{'id': s.name, 'name': s.name.capitalize()} for s in services]), 200
