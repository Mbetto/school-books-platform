import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const usePayments = (initialFilters = {}) => {
    const [state, setState] = useState({
        payments: [],
        loading: false,
        error: null,
        filters: initialFilters,
        pagination: {
            page: 1,
            totalPages: 1,
            totalItems: 0
        }
    });

    const fetchPayments = useCallback(async (page = 1, newFilters = null) => {
        setState(prev => ({ ...prev, loading: true, error: null }));
        try {
            const filters = newFilters || state.filters;
            const response = await axios.get('/api/payments', {
                params: { page, ...filters }
            });

            setState(prev => ({
                ...prev,
                payments: response.data.payments,
                loading: false,
                filters,
                pagination: {
                    page: response.data.page,
                    totalPages: response.data.totalPages,
                    totalItems: response.data.totalItems
                }
            }));
        } catch (err) {
            setState(prev => ({
                ...prev,
                loading: false,
                error: err.response?.data?.message || 'Failed to fetch payments'
            }));
            throw err;
        }
    }, [state.filters]);

    const createPayment = useCallback(async (paymentData) => {
        setState(prev => ({ ...prev, loading: true, error: null }));
        try {
            const response = await axios.post('/api/payments', paymentData);
            setState(prev => ({
                ...prev,
                payments: [response.data, ...prev.payments],
                loading: false,
                pagination: {
                    ...prev.pagination,
                    totalItems: prev.pagination.totalItems + 1
                }
            }));
            return response.data;
        } catch (err) {
            setState(prev => ({
                ...prev,
                loading: false,
                error: err.response?.data?.message || 'Failed to create payment'
            }));
            throw err;
        }
    }, []);

    const updatePayment = useCallback(async (paymentId, updateData) => {
        setState(prev => ({ ...prev, loading: true, error: null }));
        try {
            const response = await axios.put(`/api/payments/${paymentId}`, updateData);
            setState(prev => ({
                ...prev,
                payments: prev.payments.map(payment => 
                    payment.id === paymentId ? response.data : payment
                ),
                loading: false
            }));
            return response.data;
        } catch (err) {
            setState(prev => ({
                ...prev,
                loading: false,
                error: err.response?.data?.message || 'Failed to update payment'
            }));
            throw err;
        }
    }, []);

    const deletePayment = useCallback(async (paymentId) => {
        setState(prev => ({ ...prev, loading: true, error: null }));
        try {
            await axios.delete(`/api/payments/${paymentId}`);
            setState(prev => ({
                ...prev,
                payments: prev.payments.filter(payment => payment.id !== paymentId),
                loading: false,
                pagination: {
                    ...prev.pagination,
                    totalItems: prev.pagination.totalItems - 1
                }
            }));
        } catch (err) {
            setState(prev => ({
                ...prev,
                loading: false,
                error: err.response?.data?.message || 'Failed to delete payment'
            }));
            throw err;
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
        fetchPayments();
    }, [fetchPayments]);

    return {
        ...state,
        fetchPayments,
        createPayment,
        updatePayment,
        deletePayment,
        updateFilters
    };
};

export default usePayments;