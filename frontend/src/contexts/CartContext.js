// frontend/src/context/CartContext.js
import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('school_books_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('school_books_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (book, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === book.id);
      if (existing) {
        return prev.map(item =>
          item.id === book.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...book, quantity }];
    });
  };

  const removeFromCart = (bookId) => {
    setCart(prev => prev.filter(item => item.id !== bookId));
  };

  const updateQuantity = (bookId, quantity) => {
    setCart(prev =>
      quantity <= 0
        ? prev.filter(item => item.id !== bookId)
        : prev.map(item =>
            item.id === bookId ? { ...item, quantity } : item
          )
    );
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce(
    (sum, item) => sum + (item.price * item.quantity),
    0
  );

  const cartCount = cart.reduce(
    (count, item) => count + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        cartTotal,
        cartCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};