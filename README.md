# ServiceLink – Local Service Booking Platform

ServiceLink is a full-stack web application that connects users with verified local service professionals such as electricians, plumbers, and mechanics.  
It enables seamless service discovery, booking, and request management through a role-aware booking system.

---

## 🚀 Project Overview

ServiceLink solves a real-world problem of unstructured local service booking by providing:

- A unified platform for customers to book services  
- A dedicated flow for professionals to receive and manage service requests  
- A clean backend architecture focused on authentication, data integrity, and business logic  

The project is designed with a clear separation between frontend and backend, following a REST-based architecture.

---

## ✨ Key Features

### 🔐 Authentication
- Google OAuth 2.0 based login  
- Automatic user registration on first login  
- Secure, password-less authentication  

### 👤 User & Professional Roles
- Users can browse services and book professionals  
- Professionals can list services and manage incoming requests  
- A single account can act as both user and professional  

### 📅 Booking Management
- Book services with date, time, and custom message  
- Booking lifecycle:
  - **Pending**
  - **Accepted**
  - **Declined**

### 🔄 Smart Booking Routing
Email-based booking linkage ensures:
- Requests appear under **My Bookings** for customers  
- The same requests appear under **Client Requests** for professionals  

Implemented using backend logic (no duplicate APIs).

---

## 🧠 Backend Design Highlights

- Normalized relational database schema  
- Central **Bookings** table linking requester and provider  
- Role-based data filtering using logged-in email  
- Single API serving multiple UI views based on context  

---

## 🛠 Tech Stack

### Frontend
- React  
- TypeScript  
- TailwindCSS  
- Vite  

### Backend
- Python (Flask)  
- SQLAlchemy ORM  
- MySQL  

### Database
- MySQL (Local instance / XAMPP)

---
```bash

## 📂 Project Structure

ServiceLink/
│
├── backend/
│ ├── app/
│ ├── models/
│ ├── routes/
│ ├── config.py
│ ├── run_backend.py
│
├── frontend/
│ ├── src/
│ ├── components/
│ ├── pages/
│ ├── services/
│
└── README.md
```


---

## ⚙️ Setup Instructions

### 1️⃣ Backend Setup

```bash
cd backend
python -m venv venv
Activate virtual environment:

Windows

venv\Scripts\activate


Linux / macOS

source venv/bin/activate


Install dependencies:

pip install -r requirements.txt


Create a .env file inside backend/ (optional for local development):

DATABASE_URI=mysql+pymysql://root:@localhost/servicelink_db
SECRET_KEY=dev


Run the backend server:

python run_backend.py

2️⃣ Frontend Setup
cd frontend
npm install
npm run dev


Open the app in your browser:

http://localhost:3000

📌 Future Enhancements

Online payment integration

Notification system (Email / WhatsApp)

Ratings & reviews for professionals

Time-slot conflict handling

Admin dashboard

```
---

👨‍💻 Author

Giri G
BCA Student | Backend & Full-Stack Development

📧 Email: yadavgiri406@gmail.com
🔗 LinkedIn: https://linkedin.com/in/giri-g-a80884308
