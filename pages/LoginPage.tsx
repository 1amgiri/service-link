
import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { API_BASE_URL } from '../constants';

interface LoginPageProps {
  onLogin: (email: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      setIsLoading(true);
      setError('');
      try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          onLogin(email);
        } else {
          setError(data.error || 'Login failed');
        }
      } catch (err) {
        setError('Failed to connect to server');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-2xl border border-gray-100">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 text-white rounded-2xl mb-6 shadow-xl shadow-blue-200">
            <span className="text-4xl">⚡</span>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">ServiceLink</h1>
          <p className="text-gray-500 mt-3 font-medium">Find local experts or manage your business</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white transition-all outline-none placeholder:text-gray-400 text-gray-900 font-medium"
              placeholder="name@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white transition-all outline-none placeholder:text-gray-400 text-gray-900 font-medium"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-4 rounded-2xl transition-all shadow-xl shadow-blue-500/30 active:scale-[0.98] mt-2"
          >
            {isLoading ? 'Signing In...' : 'Sign In to Dashboard'}
          </button>
          {error && <p className="text-red-500 text-center mt-4 font-bold">{error}</p>}
        </form>

        <div className="mt-8 flex flex-col gap-4 items-center">
          <div className="w-full border-t border-gray-100 relative">
            <span className="bg-white px-2 absolute -top-3 left-1/2 -translate-x-1/2 text-sm text-gray-400 font-medium">OR</span>
          </div>

          <div className="mt-4 w-full flex justify-center">
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                setIsLoading(true);
                try {
                  const response = await fetch(`${API_BASE_URL}/auth/google`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ token: credentialResponse.credential }),
                  });
                  const data = await response.json();
                  if (response.ok) {
                    onLogin(data.user.email);
                  } else {
                    setError(data.error || 'Google Login failed');
                  }
                } catch (err) {
                  setError('Failed to connect to server');
                } finally {
                  setIsLoading(false);
                }
              }}
              onError={() => {
                setError('Google Login Failed');
              }}
              useOneTap
              containerProps={{ style: { width: '100%' } }}
              width="100%"
            />
          </div>
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm font-medium text-gray-400 bg-gray-50 inline-block px-4 py-2 rounded-full border border-gray-100">
            Demo Mode: Use any email and password
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
