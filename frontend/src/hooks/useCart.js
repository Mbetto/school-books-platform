import { useState, useEffect, useCallback } from 'react';
import api from '../utils/api';

const useCart = () => {
    const [state, setState] = useState({
        cart: [],
        loading: false,
        error: null,
        lastUpdated: null
    });

    // Initialize cart from server or localStorage
    useEffect(() => {
        const initializeCart = async () => {
            setState(prev => ({ ...prev, loading: true }));
            try {
                // Try to fetch cart from server if authenticated
                const response = await api.get('/cart');
                setState({
                    cart: response.data,
                    loading: false,
                    error: null,
                    lastUpdated: new Date()
                });
            } catch (err) {
                // Fallback to localStorage if not authenticated
                const savedCart = localStorage.getItem('cart');
                if (savedCart) {
                    setState({
                        cart: JSON.parse(savedCart),
                        loading: false,
                        error: null,
                        lastUpdated: new Date()
                    });
                } else {
                    setState(prev => ({ ...prev, loading: false }));
                }
            }
        };

        initializeCart();
    }, []);

    // Sync cart with server or localStorage
    const syncCart = useCallback(async (newCart) => {
        try {
            // Try to sync with server if authenticated
            await api.put('/cart', { items: newCart });
        } catch (err) {
            // Fallback to localStorage if not authenticated
            localStorage.setItem('cart', JSON.stringify(newCart));
        }
    }, []);

    const addToCart = useCallback(async (item) => {
        setState(prev => ({ ...prev, loading: true }));
        try {
            const updatedCart = [...state.cart];
            const existingIndex = updatedCart.findIndex(i => i.id === item.id);

            if (existingIndex >= 0) {
                updatedCart[existingIndex].quantity += item.quantity || 1;
            } else {
                updatedCart.push({ ...item, quantity: item.quantity || 1 });
            }

            await syncCart(updatedCart);
            setState(prev => ({
                ...prev,
                cart: updatedCart,
                loading: false,
                lastUpdated: new Date()
            }));
        } catch (err) {
            setState(prev => ({
                ...prev,
                loading: false,
                error: err.response?.data?.message || 'Failed to add to cart'
            }));
            throw err;
        }
    }, [state.cart, syncCart]);

    const removeFromCart = useCallback(async (itemId) => {
        setState(prev => ({ ...prev, loading: true }));
        try {
            const updatedCart = state.cart.filter(item => item.id !== itemId);
            await syncCart(updatedCart);
            setState(prev => ({
                ...prev,
                cart: updatedCart,
                loading: false,
                lastUpdated: new Date()
            }));
        } catch (err) {
            setState(prev => ({
                ...prev,
                loading: false,
                error: err.response?.data?.message || 'Failed to remove item'
            }));
            throw err;
        }
    }, [state.cart, syncCart]);

    const updateQuantity = useCallback(async (itemId, quantity) => {
        if (quantity < 1) {
            await removeFromCart(itemId);
            return;
        }

        setState(prev => ({ ...prev, loading: true }));
        try {
            const updatedCart = state.cart.map(item => 
                item.id === itemId ? { ...item, quantity } : item
            );
            await syncCart(updatedCart);
            setState(prev => ({
                ...prev,
                cart: updatedCart,
                loading: false,
                lastUpdated: new Date()
            }));
        } catch (err) {
            setState(prev => ({
                ...prev,
                loading: false,
                error: err.response?.data?.message || 'Failed to update quantity'
            }));
            throw err;
        }
    }, [state.cart, syncCart, removeFromCart]);

    const clearCart = useCallback(async () => {
        setState(prev => ({ ...prev, loading: true }));
        try {
            await syncCart([]);
            setState(prev => ({
                ...prev,
                cart: [],
                loading: false,
                lastUpdated: new Date()
            }));
        } catch (err) {
            setState(prev => ({
                ...prev,
                loading: false,
                error: err.response?.data?.message || 'Failed to clear cart'
            }));
            throw err;
        }
    }, [syncCart]);

    const getTotalItems = useCallback(() => {
        return state.cart.reduce((total, item) => total + item.quantity, 0);
    }, [state.cart]);

    const getTotalPrice = useCallback(() => {
        return state.cart.reduce(
            (total, item) => total + (item.quantity * (item.discountedPrice || item.price)),
            0
        );
    }, [state.cart]);

    return {
        ...state,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice
    };
};

export default useCart;