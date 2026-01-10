from datetime import datetime
from .extensions import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False) # In real app, hash this!
    name = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships - Removed unused bookings relationship to avoid FK issues

class Service(db.Model):
    __tablename__ = 'service'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    
    # Relationships
    professionals = db.relationship('Professional', backref='service', lazy=True)

class Professional(db.Model):
    __tablename__ = 'professional'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    service_id = db.Column(db.Integer, db.ForeignKey('service.id'), nullable=False)
    description = db.Column(db.Text, nullable=True)
    experience = db.Column(db.String(50), nullable=True)
    fees = db.Column(db.String(50), nullable=True)
    rating = db.Column(db.Float, default=5.0)
    is_user_added = db.Column(db.Boolean, default=False)
    owner_email = db.Column(db.String(120), nullable=True) # Link to user who created this listing
    
    # Relationships - Removed unused bookings relationship

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'serviceId': self.service_id,
            'description': self.description,
            'experience': self.experience,
            'fees': self.fees,
            'rating': self.rating,
            'isUserAdded': self.is_user_added,
            'ownerEmail': self.owner_email
        }

class Booking(db.Model):
    id = db.Column(db.String(50), primary_key=True) # Using string ID to match frontend simulation
    user_email = db.Column(db.String(120), nullable=False) # Requester email
    service_name = db.Column(db.String(100), nullable=False)
    professional_name = db.Column(db.String(100), nullable=False)
    professional_email = db.Column(db.String(120), nullable=True) # Provider email for routing
    
    date = db.Column(db.String(20), nullable=False)
    time = db.Column(db.String(20), nullable=False)
    description = db.Column(db.Text, nullable=True)
    status = db.Column(db.String(20), default='pending')
    created_at = db.Column(db.BigInteger, default=lambda: int(datetime.utcnow().timestamp() * 1000))

    def to_dict(self):
        return {
            'id': self.id,
            'userEmail': self.user_email,
            'serviceName': self.service_name,
            'professionalName': self.professional_name,
            'professionalEmail': self.professional_email,
            'date': self.date,
            'time': self.time,
            'description': self.description,
            'status': self.status,
            'createdAt': self.created_at
        }
