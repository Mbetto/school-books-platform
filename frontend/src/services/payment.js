// frontend/src/services/payment.js
import api from '../utils/api';

/**
 * Service for handling payment operations
 */
const paymentService = {
  /**
   * Initiate M-Pesa payment
   * @param {string} phoneNumber - Customer phone number
   * @param {number} amount - Payment amount
   * @param {string} bookId - ID of the book being purchased
   * @returns {Promise<Object>} - Payment initiation response
   * @throws {Error} - Payment initiation error with detailed message
   */
  async initiateMpesaPayment(phoneNumber, amount, bookId) {
    try {
      const response = await api.post('/payments/mpesa', {
        phoneNumber,
        amount,
        bookId
      });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Payment initiation failed';
      console.error('Payment initiation error:', errorMessage);
      throw new Error(errorMessage);
    }
  },

  /**
   * Check payment status
   * @param {string} transactionId - Transaction ID to check
   * @returns {Promise<Object>} - Payment status response
   * @throws {Error} - Status check error with detailed message
   */
  async checkPaymentStatus(transactionId) {
    try {
      const response = await api.get(`/payments/status/${transactionId}`);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to check payment status';
      console.error('Payment status check error:', errorMessage);
      throw new Error(errorMessage);
    }
  },

  /**
   * Get payment history for current user
   * @param {number} [page=1] - Page number for pagination
   * @param {number} [limit=10] - Items per page
   * @returns {Promise<Object>} - Payment history with pagination info
   * @throws {Error} - History fetch error with detailed message
   */
  async getPaymentHistory(page = 1, limit = 10) {
    try {
      const response = await api.get('/payments/history', {
        params: { page, limit }
      });
      return {
        payments: response.data.payments,
        totalPages: response.data.totalPages,
        currentPage: response.data.currentPage
      };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch payment history';
      console.error('Payment history error:', errorMessage);
      throw new Error(errorMessage);
    }
  },

  /**
   * Verify payment for an order
   * @param {string} orderId - Order ID to verify payment for
   * @returns {Promise<Object>} - Verification response
   * @throws {Error} - Verification error with detailed message
   */
  async verifyPayment(orderId) {
    try {
      const response = await api.get(`/payments/verify/${orderId}`);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Payment verification failed';
      console.error('Payment verification error:', errorMessage);
      throw new Error(errorMessage);
    }
  },

  /**
   * Get payment methods available
   * @returns {Promise<Array>} - Available payment methods
   * @throws {Error} - Fetch error with detailed message
   */
  async getPaymentMethods() {
    try {
      const response = await api.get('/payments/methods');
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch payment methods';
      console.error('Payment methods error:', errorMessage);
      throw new Error(errorMessage);
    }
  }
};

export default paymentService;