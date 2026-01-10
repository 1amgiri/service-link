
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
  userEmail: string;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ userEmail, onLogout }) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const getInitials = (email: string) => {
    return email.split('@')[0].substring(0, 2).toUpperCase();
  };

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/dashboard" className="flex items-center space-x-2 mr-4">
              <span className="text-2xl">⚡</span>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                ServiceLink
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-6">
              <Link 
                to="/dashboard" 
                className={`text-sm font-medium transition-colors ${isActive('/dashboard') ? 'text-blue-600 underline decoration-2 underline-offset-8' : 'text-gray-600 hover:text-blue-600'}`}
              >
                Services
              </Link>
              <Link 
                to="/requests" 
                className={`text-sm font-medium transition-colors ${isActive('/requests') ? 'text-blue-600 underline decoration-2 underline-offset-8' : 'text-gray-600 hover:text-blue-600'}`}
              >
                Requests
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-right hidden sm:block">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider leading-none mb-0.5">Logged in as</p>
              <p className="text-xs font-semibold text-gray-600">{userEmail}</p>
            </div>
            
            <Link 
              to="/profile" 
              title="My Profile"
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${
                isActive('/profile') 
                ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-200 scale-105' 
                : 'bg-gray-100 text-gray-600 border-transparent hover:bg-gray-200 hover:scale-105'
              }`}
            >
              <span className="text-xs font-black tracking-tighter">
                {getInitials(userEmail)}
              </span>
            </Link>

            <button 
              onClick={onLogout}
              className="px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-50 rounded-xl transition-colors border border-red-100 ml-2"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
