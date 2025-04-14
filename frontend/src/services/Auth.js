// frontend/src/services/auth.js
import api from '../utils/api';

/**
 * Authentication service for handling user registration, login, logout, and session management.
 */
const authService = {
  /**
   * Register a new user
   * @param {Object} userData - User registration data (username, email, password, etc.)
   * @returns {Promise<Object>} - Registered user data
   * @throws {Error} - Registration error with detailed message
   */
  async register(userData) {
    try {
      const response = await api.post('/auth/register', userData);
      // Store token in localStorage if present
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
      }
      return response.data.user;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      console.error('Registration error:', errorMessage);
      throw new Error(errorMessage);
    }
  },

  /**
   * Login existing user
   * @param {Object} credentials - Login credentials (email/username and password)
   * @returns {Promise<Object>} - Logged in user data
   * @throws {Error} - Login error with detailed message
   */
  async login(credentials) {
    try {
      const response = await api.post('/auth/login', credentials);
      // Store token in localStorage
      localStorage.setItem('authToken', response.data.token);
      return response.data.user;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      console.error('Login error:', errorMessage);
      throw new Error(errorMessage);
    }
  },

  /**
   * Get current authenticated user
   * @returns {Promise<Object|null>} - Current user data or null if not authenticated
   */
  async getCurrentUser() {
    try {
      const response = await api.get('/auth/me');
      return response.data.user;
    } catch (error) {
      // Clear token if request fails (likely invalid/expired token)
      if (error.response?.status === 401) {
        localStorage.removeItem('authToken');
      }
      return null;
    }
  },

  /**
   * Logout current user
   * @returns {Promise<void>}
   * @throws {Error} - Logout error with detailed message
   */
  async logout() {
    try {
      await api.post('/auth/logout');
      // Clear authentication token
      localStorage.removeItem('authToken');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Logout failed';
      console.error('Logout error:', errorMessage);
      throw new Error(errorMessage);
    }
  },

  /**
   * Check if user is authenticated
   * @returns {boolean} - True if authenticated, false otherwise
   */
  isAuthenticated() {
    return !!localStorage.getItem('authToken');
  },

  /**
   * Get authentication token
   * @returns {string|null} - Authentication token or null if not available
   */
  getAuthToken() {
    return localStorage.getItem('authToken');
  }
};

export default authService;