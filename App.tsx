
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import ProfessionalsPage from './pages/ProfessionalsPage';
import BookingPage from './pages/BookingPage';
import RequestsPage from './pages/RequestsPage';
import ProfilePage from './pages/ProfilePage';

const App: React.FC = () => {
  const [userEmail, setUserEmail] = useState<string | null>(localStorage.getItem('userEmail'));

  const handleLogin = (email: string) => {
    localStorage.setItem('userEmail', email);
    setUserEmail(email);
  };

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('selectedService');
    localStorage.removeItem('selectedProfessional');
    setUserEmail(null);
  };

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col">
        {userEmail && <Navbar userEmail={userEmail} onLogout={handleLogout} />}
        <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl">
          <Routes>
            <Route 
              path="/login" 
              element={!userEmail ? <LoginPage onLogin={handleLogin} /> : <Navigate to="/dashboard" />} 
            />
            <Route 
              path="/dashboard" 
              element={userEmail ? <Dashboard /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/professionals" 
              element={userEmail ? <ProfessionalsPage /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/book" 
              element={userEmail ? <BookingPage /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/requests" 
              element={userEmail ? <RequestsPage /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/profile" 
              element={userEmail ? <ProfilePage /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/" 
              element={<Navigate to={userEmail ? "/dashboard" : "/login"} />} 
            />
          </Routes>
        </main>
        <footer className="bg-white border-t py-6 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} ServiceLink. All rights reserved. (Learning Project)
        </footer>
      </div>
    </HashRouter>
  );
};

export default App;
