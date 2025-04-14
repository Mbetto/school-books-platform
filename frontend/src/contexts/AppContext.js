// frontend/src/context/AppContext.js
import React from 'react';
import { AuthProvider } from './AuthContext';
import { CartProvider } from './CartContext';
import { ThemeProvider } from './ThemeContext';
import ErrorBoundary from '../components/ErrorBoundary'; // Fixed import path

export const AppProvider = ({ children }) => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <CartProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </CartProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
};