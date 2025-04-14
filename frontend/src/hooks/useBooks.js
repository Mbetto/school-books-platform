import { useState, useCallback, useEffect } from 'react';
import api from '../utils/api';

const useBooks = (initialFilters = {}) => {
    const [state, setState] = useState({
        books: [],
        filteredBooks: [],
        loading: false,
        error: null,
        filters: initialFilters,
        pagination: {
            page: 1,
            totalPages: 1,
            totalItems: 0,
            itemsPerPage: 10
        }
    });

    const applyFilters = useCallback((books, filters) => {
        return books.filter(book => {
            return Object.entries(filters).every(([key, value]) => {
                if (!value) return true;
                if (key === 'search') {
                    return (
                        book.title.toLowerCase().includes(value.toLowerCase()) ||
                        book.author.toLowerCase().includes(value.toLowerCase())
                    );
                }
                if (key === 'priceRange') {
                    const [min, max] = value;
                    return book.price >= min && book.price <= max;
                }
                return book[key] === value;
            });
        });
    }, []);

    const fetchBooks = useCallback(async (page = 1, newFilters = null) => {
        setState(prev => ({ ...prev, loading: true, error: null }));
        
        try {
            const filters = newFilters || state.filters;
            const response = await api.get('/books', {
                params: { page, ...filters }
            });

            const filteredBooks = applyFilters(response.data.books, filters);

            setState(prev => ({
                ...prev,
                books: response.data.books,
                filteredBooks,
                loading: false,
                filters,
                pagination: {
                    page: response.data.page,
                    totalPages: response.data.totalPages,
                    totalItems: response.data.totalItems,
                    itemsPerPage: response.data.itemsPerPage
                }
            }));
        } catch (err) {
            setState(prev => ({
                ...prev,
                loading: false,
                error: err.response?.data?.message || 'Failed to fetch books'
            }));
            throw err;
        }
    }, [applyFilters, state.filters]);

    const addToCart = useCallback(async (bookId, quantity = 1) => {
        try {
            await api.post('/cart', { bookId, quantity });
            return true;
        } catch (err) {
            throw new Error(err.response?.data?.message || 'Failed to add to cart');
        }
    }, []);

    const updateFilters = useCallback((newFilters) => {
        setState(prev => ({
            ...prev,
            filters: { ...prev.filters, ...newFilters },
            pagination: { ...prev.pagination, page: 1 }
        }));
    }, []);

    useEffect(() => {
        fetchBooks();
    }, []);

    return {
        ...state,
        fetchBooks,
        addToCart,
        updateFilters
    };
};

export default useBooks;