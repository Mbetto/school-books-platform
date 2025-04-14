import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const useAuth = () => {
    const [authState, setAuthState] = useState({
        isAuthenticated: false,
        user: null,
        loading: true,
        error: null
    });
    const navigate = useNavigate();

    const validateToken = useCallback(async (token) => {
        try {
            const response = await axios.get('/api/auth/validate', {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data.user;
        } catch (error) {
            throw new Error('Invalid or expired token');
        }
    }, []);

    const checkAuth = useCallback(async () => {
        setAuthState(prev => ({ ...prev, loading: true }));
        try {
            const token = localStorage.getItem('authToken');
            const refreshToken = localStorage.getItem('refreshToken');
            
            if (token) {
                const user = await validateToken(token);
                setAuthState({
                    isAuthenticated: true,
                    user,
                    loading: false,
                    error: null
                });
                return true;
            } else if (refreshToken) {
                // Attempt token refresh
                const response = await axios.post('/api/auth/refresh', { refreshToken });
                localStorage.setItem('authToken', response.data.token);
                setAuthState({
                    isAuthenticated: true,
                    user: response.data.user,
                    loading: false,
                    error: null
                });
                return true;
            } else {
                setAuthState({
                    isAuthenticated: false,
                    user: null,
                    loading: false,
                    error: null
                });
                return false;
            }
        } catch (error) {
            localStorage.removeItem('authToken');
            localStorage.removeItem('refreshToken');
            setAuthState({
                isAuthenticated: false,
                user: null,
                loading: false,
                error: error.message
            });
            return false;
        }
    }, [validateToken]);

    const login = useCallback(async (credentials) => {
        setAuthState(prev => ({ ...prev, loading: true }));
        try {
            const response = await axios.post('/api/auth/login', credentials);
            localStorage.setItem('authToken', response.data.token);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            
            await checkAuth();
            navigate(response.data.redirectTo || '/dashboard');
            return response.data.user;
        } catch (error) {
            setAuthState(prev => ({
                ...prev,
                loading: false,
                error: error.response?.data?.message || 'Login failed'
            }));
            throw error;
        }
    }, [checkAuth, navigate]);

    const logout = useCallback(() => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        setAuthState({
            isAuthenticated: false,
            user: null,
            loading: false,
            error: null
        });
        navigate('/login');
    }, [navigate]);

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    return {
        ...authState,
        login,
        logout,
        checkAuth
    };
};

export default useAuth;