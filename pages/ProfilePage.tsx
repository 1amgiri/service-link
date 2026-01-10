import React, { useState, useEffect } from 'react';
import { SERVICES, API_BASE_URL } from '../constants';
import { Professional } from '../types';

const ProfilePage: React.FC = () => {
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || '');
  const [name, setName] = useState(userEmail.split('@')[0]); // Default to email name part
  const [serviceId, setServiceId] = useState('');
  const [description, setDescription] = useState('');
  const [fees, setFees] = useState('');
  const [experience, setExperience] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userListings, setUserListings] = useState<Professional[]>([]);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    loadUserListings();
  }, [userEmail]);

  const loadUserListings = async () => {
    if (!userEmail) return;
    try {
      const response = await fetch(`${API_BASE_URL}/professionals?name=${userEmail}`);
      if (response.ok) {
        const data = await response.json();
        setUserListings(data);
      }
    } catch (error) {
      console.error('Failed to load listings', error);
    }
  };

  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newListing = {
      serviceId,
      name: name,
      description,
      fees: `₹${fees}/hr`,
      experience: `${experience} Years`,
      rating: 5.0,
      ownerEmail: userEmail
    };

    try {
      const response = await fetch(`${API_BASE_URL}/professionals/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newListing)
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Service listing added successfully!' });
        setServiceId('');
        setDescription('');
        setFees('');
        setExperience('');
        loadUserListings();
      } else {
        const data = await response.json();
        setMessage({ type: 'error', text: data.error || 'Failed to add listing.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error connecting to server.' });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleDeleteListing = (id: string) => {
    // API endpoint for delete not implemented yet in this task
    alert('Delete functionality not implemented in backend yet.');
  };

  const getInitials = (name: string) => {
    return name.split('@')[0].substring(0, 2).toUpperCase();
  };

  return (
    <div className="animate-fadeIn max-w-4xl mx-auto space-y-12">
      <div className="flex flex-col md:flex-row gap-10">

        {/* Profile Sidebar */}
        <div className="w-full md:w-1/3">
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-full flex items-center justify-center mx-auto text-3xl font-black mb-4 shadow-lg border-4 border-white">
              {getInitials(userEmail)}
            </div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-1">{userEmail.split('@')[0]}</h2>
            <p className="text-sm text-gray-500 font-medium mb-6">{userEmail}</p>

            <div className="pt-6 border-t border-gray-50 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Total Listings</span>
                <span className="font-bold text-gray-900">{userListings.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Member Since</span>
                <span className="font-bold text-gray-900">2024</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="w-full md:w-2/3 space-y-10">

          {/* Add Service Section */}
          <section className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gray-900 p-8 text-white">
              <h3 className="text-2xl font-bold tracking-tight">Add Your Service Listing</h3>
              <p className="opacity-70 mt-1">Start earning in Rupees (₹) by listing your skills.</p>
            </div>

            {message && (
              <div className={`mx-8 mt-6 p-4 rounded-2xl font-bold text-sm text-center ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                {message.text}
              </div>
            )}

            <form onSubmit={handleAddService} className="p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none text-gray-900 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Service Category</label>
                  <select
                    required
                    value={serviceId}
                    onChange={(e) => setServiceId(e.target.value)}
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none text-gray-900 font-medium appearance-none"
                  >
                    <option value="">Choose a category</option>
                    {SERVICES.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Hourly Fee (₹)</label>
                  <input
                    type="number"
                    required
                    value={fees}
                    onChange={(e) => setFees(e.target.value)}
                    placeholder="e.g. 500"
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none text-gray-900 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Years of Experience</label>
                  <input
                    type="number"
                    required
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    placeholder="e.g. 5"
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none text-gray-900 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Professional Bio</label>
                <textarea
                  required
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tell clients why they should hire you..."
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none resize-none text-gray-900 font-medium"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 rounded-2xl font-extrabold text-white transition-all shadow-xl active:scale-95 ${isSubmitting ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/30'}`}
              >
                {isSubmitting ? 'Creating Listing...' : 'List My Service'}
              </button>
            </form>
          </section>

          {/* User's Current Listings Section */}
          <section className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900 tracking-tight">Your Active Listings</h3>
            {userListings.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {userListings.map((listing) => (
                  <div key={listing.id} className="bg-white p-6 rounded-3xl border border-gray-100 flex items-center justify-between shadow-sm">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-xl">
                        {SERVICES.find(s => s.id === listing.serviceId)?.icon || '🛠️'}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{SERVICES.find(s => s.id === listing.serviceId)?.name}</h4>
                        <p className="text-sm text-gray-500">{listing.fees} • {listing.experience}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteListing(listing.id)}
                      className="text-red-500 hover:bg-red-50 p-2 rounded-xl transition-colors"
                      title="Remove Listing"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                <p className="text-gray-400 font-medium italic">You haven't listed any services yet.</p>
              </div>
            )}
          </section>

        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
