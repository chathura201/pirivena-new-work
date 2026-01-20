import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Lock } from 'lucide-react';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // If already logged in, redirect to dashboard immediately
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Attempt login with trimmed values
    if (login(username, password)) {
      navigate('/admin/dashboard', { replace: true });
    } else {
      setError('Invalid credentials. Please use: admin / password');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-950 flex items-center justify-center p-4 transition-colors duration-300">
      <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl w-full max-w-md animate-fade-in-up border border-gray-100 dark:border-slate-800">
        <div className="text-center mb-8">
          <div className="bg-maroon-900 dark:bg-slate-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg ring-4 ring-gray-100 dark:ring-slate-800">
            <Lock className="text-white dark:text-saffron-500" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white font-serif">Admin Login</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Sri Sumana Maha Pirivena</p>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg mb-4 text-sm text-center border border-red-200 dark:border-red-900/30 flex items-center justify-center gap-2">
            <span>⚠️</span> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-maroon-900 outline-none transition-all placeholder-gray-400 dark:placeholder-gray-500"
              placeholder="Enter username"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-maroon-900 outline-none transition-all placeholder-gray-400 dark:placeholder-gray-500"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-maroon-900 text-white py-3 rounded-lg font-semibold hover:bg-maroon-800 transition-colors shadow-md hover:shadow-lg transform active:scale-[0.98] duration-200"
          >
            Login
          </button>
        </form>
        
        <div className="mt-8 text-center pt-6 border-t border-gray-100 dark:border-slate-800">
          <p className="text-xs text-gray-400 dark:text-gray-500">Secure Admin Panel • Restricted Access</p>
        </div>
      </div>
    </div>
  );
};

export default Login;