import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize user from localStorage to persist session across refreshes
  const [user, setUser] = useState<User | null>(() => {
    try {
      const savedUser = localStorage.getItem('pirivena_admin_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error('Failed to parse user from local storage', error);
      return null;
    }
  });

  const login = (u: string, p: string): boolean => {
    // Mock authentication - In a real app, this would be an API call
    if (u.trim() === 'mudduwa2026' && p.trim() === 'mudduwa2026') {
      const newUser = { username: 'admin', role: 'admin' as const };
      setUser(newUser);
      localStorage.setItem('pirivena_admin_user', JSON.stringify(newUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('pirivena_admin_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
