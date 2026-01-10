
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Service, Professional, BookingRequest } from '../types';
import { API_BASE_URL } from '../constants';

const BookingPage: React.FC = () => {
  const navigate = useNavigate();
  const [service, setService] = useState<Service | null>(null);
  const [pro, setPro] = useState<Professional | null>(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const s = localStorage.getItem('selectedService');
    const p = localStorage.getItem('selectedProfessional');
    if (s && p) {
      setService(JSON.parse(s));
      setPro(JSON.parse(p));
    } else {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const userEmail = localStorage.getItem('userEmail') || 'anonymous@test.com';
    const newRequest: BookingRequest = {
      id: Math.random().toString(36).substr(2, 9),
      userEmail,
      serviceName: service?.name || 'Service',
      professionalName: pro?.name || 'Professional',
      professionalEmail: pro?.ownerEmail,
      date,
      time,
      description,
      status: 'pending',
      createdAt: Date.now()
    };

    try {
      const response = await fetch(`${API_BASE_URL}/bookings/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRequest)
      });

      if (response.ok) {
        setIsSubmitting(false);
        setIsSuccess(true);
        setTimeout(() => {
          navigate('/requests');
        }, 2000);
      } else {
        alert('Failed to submit booking');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Booking failed:', error);
      alert('Internal Server Error');
      setIsSubmitting(false);
    }
  };

  if (!service || !pro) return null;

  return (
    <div className="max-w-3xl mx-auto animate-fadeIn py-4">
      {isSuccess ? (
        <div className="bg-white p-12 rounded-[2.5rem] shadow-2xl border border-green-100 text-center space-y-4">
          <div className="w-24 h-24 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto text-5xl mb-6 shadow-inner">
            ✓
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Request Sent Successfully!</h2>
          <p className="text-gray-600 text-lg">Your booking request has been sent to {pro.name}. They will get back to you shortly.</p>
          <p className="text-sm text-gray-400 font-medium pt-4 uppercase tracking-widest">Redirecting to management...</p>
        </div>
      ) : (
        <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden">
          {/* Header style from screenshot */}
          <div className="bg-blue-600 px-10 py-12 text-white">
            <h2 className="text-4xl font-extrabold tracking-tight mb-2">Confirm Booking</h2>
            <p className="opacity-90 font-bold text-xl">Book {pro.name} for your {service.name} needs.</p>
          </div>

          <form onSubmit={handleSubmit} className="p-10 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <label className="block text-[11px] uppercase font-black text-gray-400 mb-2 ml-1 tracking-widest">Service Type</label>
                <div className="px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-gray-900 font-extrabold text-lg">
                  {service.name}
                </div>
              </div>
              <div>
                <label className="block text-[11px] uppercase font-black text-gray-400 mb-2 ml-1 tracking-widest">Professional</label>
                <div className="px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-gray-900 font-extrabold text-lg flex justify-between">
                  <span>{pro.name}</span>
                  <span className="text-blue-600 text-sm">{pro.fees}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <label className="block text-[11px] uppercase font-black text-gray-400 mb-2 ml-1 tracking-widest">Select Date</label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white transition-all outline-none text-gray-900 font-bold"
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase font-black text-gray-400 mb-2 ml-1 tracking-widest">Select Time</label>
                <select
                  required
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white transition-all outline-none text-gray-900 font-bold appearance-none cursor-pointer"
                >
                  <option value="">Choose a slot</option>
                  <option value="09:00 AM">09:00 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="01:00 PM">01:00 PM</option>
                  <option value="03:00 PM">03:00 PM</option>
                  <option value="05:00 PM">05:00 PM</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase font-black text-gray-400 mb-2 ml-1 tracking-widest">Problem Description</label>
              <textarea
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Briefly describe what you need help with (e.g., Leaking sink in the kitchen)..."
                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white transition-all outline-none resize-none text-gray-900 font-medium placeholder:text-gray-400"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-5 px-8 rounded-2xl font-black text-xl text-white transition-all shadow-2xl active:scale-[0.98] ${isSubmitting ? 'bg-gray-400 cursor-not-allowed shadow-none' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/40'}`}
            >
              {isSubmitting ? 'Processing Request...' : 'Confirm My Booking'}
            </button>
            <p className="text-center text-xs text-gray-400 font-medium">By clicking confirm, you agree to our service terms.</p>
          </form>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
