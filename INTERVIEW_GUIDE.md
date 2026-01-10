# ServiceLink - Project Interview Guide

## 1. Project Overview
**ServiceLink** is a local services marketplace that connects users with professionals (Electricians, Plumbers, etc.) for real-time booking and service management.

## 2. Your Role: Backend Developer
*   **Focus**: Architecting the REST API, Database Design, Authentication, and Business Logic.
*   **Frontend**: Built with React & TailwindCSS (Assisted by AI tools), integrated by you into the full stack.

---

## 3. Key Backend Contributions (Talking Points)

### A. Tech Stack & Architecture
*   **Framework**: Python **Flask** (chosen for its lightweight nature and flexibility).
*   **Database Object Relational Mapper (ORM)**: **SQLAlchemy** to manage complex relationships between Users, Services, and Bookings.
*   **Database**: **MySQL** for robust, relational data storage.
*   **Authentication**: Integrated **Google OAuth 2.0** for secure, password-less login using ID tokens.

### B. Database Schema Design
Explain how you designed the normalized database to handle the marketplace logic:
*   **Users**: Stores basic profile info and email.
*   **Services**: Categorized list of available skills (static data moved to DB).
*   **Professionals**: Linked to `Services` and `Owners`.
    *   *Challenge*: Professional listings needed to be linked to the specific user who created them.
    *   *Solution*: Added `owner_email` field to enforce ownership permissions.
*   **Bookings**: The central transaction table connecting a `User` (requester) and a `Professional` (provider).

### C. Complex Logic: Email-Based Routing
This was a specific challenge you solved.
*   **Problem**: When a user booked a service, the request wasn't showing up in the Professional's dashboard because the system didn't know *who* the professional was (it only had a name).
*   **Solution**:
    1.  Updated the Database Schema to store `professional_email` in the `Booking` table.
    2.  Implemented logic in the `GET /bookings` endpoint to check **two conditions**:
        *   Is the user the **Requester**? (`user_email == current_user`) -> Show in "My Bookings".
        *   Is the user the **Provider**? (`professional_email == current_user`) -> Show in "Client Requests".
    3.  This enabled a single API endpoint to serve two different UI views dynamically.

### D. Authentication Flow
*   Implemented a secure Token verification flow:
    1.  Frontend receives Google ID Token.
    2.  Backend (`/api/auth/google`) verifies the token against Google's public keys.
    3.  If valid, the system checks if the email exists in the DB.
    4.  **Auto-Registration**: If it's a new user, they are automatically created and logged in.

## 4. Why this Stack?
*   "I chose Flask and SQLAlchemy because I wanted full control over the database queries and relationships, ensuring the booking system was reliable and ACID-compliant."
*   "Separating the Frontend (React) and Backend (Flask) allows for independent scaling and cleaner code organization."
