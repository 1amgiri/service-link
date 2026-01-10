# ServiceLink

ServiceLink is a web platform connecting users with local service professionals (Electricians, Plumbers, Mechanics, etc.).

## Features
- **User & Professional Profiles**: Users can book services; Professionals can list services.
- **Real-time Booking**: Email-based routing ensures requests go to the right professional.
- **Google Login**: Secure and quick authentication.
- **Status Tracking**: Track bookings from Pending to Accepted/Rejected.

## Tech Stack
- **Frontend**: React, TypeScript, TailwindCSS, Vite
- **Backend**: Flask, SQLAlchemy, MySQL
- **Database**: MySQL (using XAMPP or local instance)

## Setup Instructions

### 1. Backend Setup
```bash
cd backend
python -m venv venv
# Windows
venv\Scripts\activate
# Linux/Mac
source venv/bin/activate

pip install -r requirements.txt
```

Create a `.env` file in `backend/` (or rely on `config.py` defaults for local dev):
```
DATABASE_URI=mysql+pymysql://root:@localhost/servicelink_db
SECRET_KEY=dev
```

Run the backend:
```bash
# From root directory
python run_backend.py
```

### 2. Frontend Setup
```bash
npm install
npm run dev
```

Visit `http://localhost:3000`
