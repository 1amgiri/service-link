
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { API_BASE_URL } from '../constants';
import { Service, Professional } from '../types';

const ProfessionalsPage: React.FC = () => {
  const navigate = useNavigate();
  const [service, setService] = useState<Service | null>(null);
  const [filteredPros, setFilteredPros] = useState<Professional[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedService = localStorage.getItem('selectedService');
    if (savedService) {
      const parsedService = JSON.parse(savedService) as Service;
      setService(parsedService);

      const fetchPros = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/professionals?serviceId=${parsedService.id}`);
          if (response.ok) {
            const data = await response.json();
            setFilteredPros(data);
          }
        } catch (error) {
          console.error('Failed to fetch professionals:', error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchPros();
    } else {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleRequestService = (pro: Professional) => {
    localStorage.setItem('selectedProfessional', JSON.stringify(pro));
    navigate('/book');
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  if (!service) return null;
  if (isLoading) return <div className="text-center py-20">Loading experts...</div>;

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
        <Link to="/dashboard" className="hover:text-blue-600">Services</Link>
        <span>/</span>
        <span className="font-medium text-gray-900">{service.name} Experts</span>
      </div>

      <div className="flex justify-between items-end border-b border-gray-100 pb-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Available Professionals</h1>
          <p className="text-gray-600 mt-1">Found {filteredPros.length} experts for {service.name}</p>
        </div>
      </div>

      {filteredPros.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPros.map((pro) => (
            <div
              key={pro.id}
              className="bg-white rounded-3xl border border-gray-100 p-8 flex flex-col sm:flex-row gap-8 hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative shrink-0">
                <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-blue-200 uppercase tracking-tighter border-4 border-white">
                  {getInitials(pro.name)}
                </div>
                {pro.isUserAdded && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-full border-2 border-white shadow-sm">
                    USER LISTING
                  </span>
                )}
              </div>
              <div className="flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-extrabold text-gray-900">{pro.name}</h3>
                  <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full text-yellow-700 text-xs font-bold border border-yellow-100">
                    ★ {pro.rating.toFixed(1)}
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed line-clamp-3">{pro.description}</p>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100">
                    <p className="text-[10px] uppercase tracking-wider text-gray-400 font-extrabold mb-1">Base Fee</p>
                    <p className="text-lg font-extrabold text-blue-600">{pro.fees}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100">
                    <p className="text-[10px] uppercase tracking-wider text-gray-400 font-extrabold mb-1">Experience</p>
                    <p className="text-lg font-extrabold text-gray-900">{pro.experience}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleRequestService(pro)}
                  className="mt-auto bg-gray-900 hover:bg-blue-600 text-white font-bold py-3.5 rounded-2xl transition-all shadow-lg active:scale-95"
                >
                  Request Service
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
          <div className="text-5xl mb-4 opacity-50">🔍</div>
          <p className="text-gray-500 font-bold text-xl">No professionals found</p>
          <p className="text-gray-400 mt-1">Be the first to list yourself in this category!</p>
          <Link to="/profile" className="text-blue-600 font-bold mt-6 inline-block hover:bg-blue-50 px-6 py-2 rounded-full border border-blue-100">
            List My Service
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProfessionalsPage;
