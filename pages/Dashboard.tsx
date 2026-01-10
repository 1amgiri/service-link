
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { SERVICES } from '../constants';
import { Service } from '../types';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleSelectService = (service: Service) => {
    localStorage.setItem('selectedService', JSON.stringify(service));
    navigate('/professionals');
  };

  return (
    <div className="space-y-12 animate-fadeIn py-4">
      <header className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-6 tracking-tight">
          Find the perfect <span className="text-blue-600">local expert</span>
        </h2>
        <p className="text-xl text-gray-600 font-medium">
          Professional services delivered to your doorstep. Vetted, reliable, and ready to help.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {SERVICES.map((service) => (
          <div 
            key={service.id}
            className="group bg-white rounded-3xl border border-gray-100 p-8 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col items-start cursor-default hover:-translate-y-1"
          >
            <div className="text-5xl mb-6 bg-blue-50 w-20 h-20 flex items-center justify-center rounded-2xl group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-inner">
              {service.icon}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">{service.name}</h3>
            <p className="text-gray-500 text-base mb-8 flex-grow leading-relaxed">
              {service.description}
            </p>
            <button 
              onClick={() => handleSelectService(service)}
              className="w-full py-4 px-6 bg-gray-900 text-white font-bold rounded-2xl hover:bg-blue-600 transition-all shadow-lg active:scale-95"
            >
              View Professionals
            </button>
          </div>
        ))}
      </div>

      {/* Become a Professional CTA */}
      <div className="mt-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] p-10 md:p-16 text-white shadow-2xl shadow-blue-500/20 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <h3 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight">Are you a professional?</h3>
          <p className="text-blue-100 text-lg md:text-xl mb-8 font-medium">
            Join our network of experts and start growing your business today. List your services and connect with local clients.
          </p>
          <Link 
            to="/profile" 
            className="inline-block bg-white text-blue-600 font-extrabold px-10 py-4 rounded-2xl shadow-xl hover:bg-blue-50 transition-all active:scale-95"
          >
            List My Services
          </Link>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/20 rounded-full -ml-10 -mb-10 blur-2xl"></div>
      </div>
    </div>
  );
};

export default Dashboard;
