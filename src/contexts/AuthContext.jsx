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
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const { data } = await API.get('/users/current/me');
      setUser(data);
    } catch (error) {
      // Token invalid
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = (data) => {
    // Expecting data to contain { user, token }
    localStorage.setItem('token', data.token);
    setUser(data.user);
  };

  const logout = async () => {
    try {
      await API.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
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
