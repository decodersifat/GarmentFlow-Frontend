import React, { createContext, useState, useEffect } from 'react';
import API from '../config/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Verify authentication on mount using cookies
  useEffect(() => {
    verifyAuth();
  }, []);

  const verifyAuth = async () => {
    try {
      const { data } = await API.get('/users/current/me');
      setUser(data);
    } catch (error) {
      // No valid cookie/token, user is not authenticated
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = (userData) => {
    setUser(userData);
    // Token is stored in httpOnly cookie by backend, no need to store in frontend
  };

  const logout = async () => {
    try {
      await API.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
    }
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, updateUser, verifyAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
