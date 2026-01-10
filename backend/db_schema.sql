-- Database Creation
CREATE DATABASE IF NOT EXISTS servicelink_db;
USE servicelink_db;

-- Users Table
CREATE TABLE IF NOT EXISTS user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(120) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Services Table
CREATE TABLE IF NOT EXISTS service (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- Professionals Table
CREATE TABLE IF NOT EXISTS professional (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    service_id INT NOT NULL,
    description TEXT,
    experience VARCHAR(50),
    fees VARCHAR(50),
    rating FLOAT DEFAULT 5.0,
    is_user_added BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (service_id) REFERENCES service(id)
);

-- Bookings Table
CREATE TABLE IF NOT EXISTS booking (
    id VARCHAR(50) PRIMARY KEY,
    user_email VARCHAR(120) NOT NULL,
    service_name VARCHAR(100) NOT NULL,
    professional_name VARCHAR(100) NOT NULL,
    date VARCHAR(20) NOT NULL,
    time VARCHAR(20) NOT NULL,
    description TEXT,
    status VARCHAR(20) DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Data Seeding will be handled by the application logic if tables are empty.
