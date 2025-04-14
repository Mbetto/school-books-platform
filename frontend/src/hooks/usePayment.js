import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';

const usePayment = (initialState = {}) => {
    const [state, setState] = useState({
        paymentData: initialState,
        isLoading: false,
        error: null,
        status: 'idle', // 'idle' | 'processing' | 'succeeded' | 'failed'
        paymentMethods: [],
        selectedMethod: null
    });

    const fetchPaymentMethods = useCallback(async () => {
        setState(prev => ({ ...prev, isLoading: true }));
        try {
            const response = await axios.get('/api/payment/methods');
            setState(prev => ({
                ...prev,
                paymentMethods: response.data,
                isLoading: false
            }));
        } catch (err) {
            setState(prev => ({
                ...prev,
                isLoading: false,
                error: err.response?.data?.message || 'Failed to fetch payment methods'
            }));
        }
    }, []);

    const selectPaymentMethod = useCallback((methodId) => {
        setState(prev => ({
            ...prev,
            selectedMethod: prev.paymentMethods.find(m => m.id === methodId) || null
        }));
    }, []);

    const processPayment = useCallback(async (paymentDetails) => {
        setState(prev => ({
            ...prev,
            isLoading: true,
            error: null,
            status: 'processing'
        }));

        try {
            const response = await axios.post('/api/payment/process', {
                ...paymentDetails,
                method: state.selectedMethod?.id
            });

            setState(prev => ({
                ...prev,
                paymentData: response.data,
                isLoading: false,
                status: 'succeeded'
            }));

            return response.data;
        } catch (err) {
            const error = err.response?.data?.message || 'Payment processing failed';
            setState(prev => ({
                ...prev,
                isLoading: false,
                error,
                status: 'failed'
            }));
            throw new Error(error);
        }
    }, [state.selectedMethod]);

    const verifyPayment = useCallback(async (paymentId) => {
        setState(prev => ({ ...prev, isLoading: true }));
        try {
            const response = await axios.get(`/api/payment/verify/${paymentId}`);
            setState(prev => ({
                ...prev,
                paymentData: response.data,
                isLoading: false,
                status: response.data.status
            }));
            return response.data;
        } catch (err) {
            setState(prev => ({
                ...prev,
                isLoading: false,
                error: err.response?.data?.message || 'Payment verification failed'
            }));
            throw err;
        }
    }, []);

    const resetPayment = useCallback(() => {
        setState(prev => ({
            ...prev,
            paymentData: initialState,
            error: null,
            status: 'idle'
        }));
    }, [initialState]);

    useEffect(() => {
        fetchPaymentMethods();
    }, [fetchPaymentMethods]);

    return {
        ...state,
        processPayment,
        verifyPayment,
        selectPaymentMethod,
        resetPayment,
        fetchPaymentMethods
    };
};

export default usePayment;