// frontend/src/services/books.js
import api from '../utils/api';

/**
 * Service for handling book-related operations
 */
const booksService = {
  /**
   * Get all books with optional pagination
   * @param {number} [page=1] - Page number for pagination
   * @param {number} [limit=10] - Number of items per page
   * @returns {Promise<Array>} - Array of books
   * @throws {Error} - Error message from server or default message
   */
  async getAllBooks(page = 1, limit = 10) {
    try {
      const response = await api.get('/books', {
        params: { page, limit }
      });
      return {
        books: response.data.books,
        totalPages: response.data.totalPages,
        currentPage: response.data.currentPage
      };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch books';
      console.error('Fetch books error:', errorMessage);
      throw new Error(errorMessage);
    }
  },

  /**
   * Get book by ID
   * @param {string} id - Book ID
   * @returns {Promise<Object>} - Book details
   * @throws {Error} - Error message from server or default message
   */
  async getBookById(id) {
    try {
      const response = await api.get(`/books/${id}`);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch book';
      console.error('Fetch book error:', errorMessage);
      throw new Error(errorMessage);
    }
  },

  /**
   * Search books by query
   * @param {string} query - Search query
   * @param {string} [field='title'] - Field to search in (title, author, etc.)
   * @returns {Promise<Array>} - Array of matching books
   * @throws {Error} - Error message from server or default message
   */
  async searchBooks(query, field = 'title') {
    try {
      const response = await api.get('/books/search', {
        params: { query, field }
      });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Search failed';
      console.error('Search error:', errorMessage);
      throw new Error(errorMessage);
    }
  },

  /**
   * Get featured books
   * @returns {Promise<Array>} - Array of featured books
   * @throws {Error} - Error message from server or default message
   */
  async getFeaturedBooks() {
    try {
      const response = await api.get('/books/featured');
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch featured books';
      console.error('Fetch featured books error:', errorMessage);
      throw new Error(errorMessage);
    }
  },

  /**
   * Get books by category
   * @param {string} category - Category name
   * @returns {Promise<Array>} - Array of books in the category
   * @throws {Error} - Error message from server or default message
   */
  async getBooksByCategory(category) {
    try {
      const response = await api.get(`/books/category/${category}`);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch books by category';
      console.error('Fetch books by category error:', errorMessage);
      throw new Error(errorMessage);
    }
  }
};

export default booksService;