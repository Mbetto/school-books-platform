// frontend/src/context/AuthContext.js
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const checkAuth = useCallback(async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setIsLoading(false);
        return;
      }

      const { data } = await axios.get('/api/auth/validate', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (data.valid) {
        const userRes = await axios.get('/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(userRes.data);
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('authToken');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (credentials) => {
    try {
      setIsLoading(true);
      const { data } = await axios.post('/api/auth/login', credentials);
      localStorage.setItem('authToken', data.token);
      setUser(data.user);
      setIsAuthenticated(true);
      navigate('/');
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      return { success: false, error: err.response?.data?.message || err.message };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = useCallback(() => {
    localStorage.removeItem('authToken');
    setUser(null);
    setIsAuthenticated(false);
    navigate('/login');
  }, [navigate]);

  const value = {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    checkAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};