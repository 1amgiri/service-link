from flask import Flask
from flask_cors import CORS
from .config import Config
from .extensions import db
from .routes.auth import auth_bp
from .routes.professionals import professionals_bp
from .routes.bookings import bookings_bp
from .routes.services import services_bp
from .models import Service, Professional

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Initialize extensions
    db.init_app(app)
    CORS(app) # Enable CORS for frontend integration

    # Register blueprints
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(professionals_bp, url_prefix='/api/professionals')
    app.register_blueprint(bookings_bp, url_prefix='/api/bookings')
    app.register_blueprint(services_bp, url_prefix='/api/services')

    with app.app_context():
        # strict check to create tables and seed if empty
        try:
            db.create_all()
            if not Service.query.first():
                seed_data()
        except Exception as e:
            if app.config.get('TESTING'):
                raise e
            print(f"Database error: {e}")

    @app.route('/')
    def index():
        return "ServiceLink API is running!", 200

    return app

def seed_data():
    # Seed Services
    services = [
        {'name': 'electrician', 'icon': '⚡'},
        {'name': 'plumber', 'icon': '🚰'},
        {'name': 'salon', 'icon': '✂️'},
        {'name': 'painter', 'icon': '🎨'},
        {'name': 'cleaning', 'icon': '🧹'}
    ]
    
    service_objs = {}
    for s in services:
        new_service = Service(name=s['name'])
        db.session.add(new_service)
        service_objs[s['name']] = new_service
    
    db.session.commit()
    
    # Reload to get IDs
    for s_name in service_objs:
        service_objs[s_name] = Service.query.filter_by(name=s_name).first()

    db.session.commit()
    
    # Reload to get IDs
    for s_name in service_objs:
        service_objs[s_name] = Service.query.filter_by(name=s_name).first()

    # Seed Professionals removed as per user request
    
    db.session.commit()
    print("Database seeded!")

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, port=5000)
