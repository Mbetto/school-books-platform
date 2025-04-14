import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useAuth } from '../../context/AuthContext'; // Updated import path
import { useNavigate } from 'react-router-dom';
import './Cart.scss'; // Fixed SCSS import

const Cart = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <Box className="cart-container">
      <Typography variant="h3" gutterBottom>
        Your Shopping Cart
      </Typography>
      {isAuthenticated ? (
        <>
          <Typography variant="body1" paragraph>
            Review your items before checkout.
          </Typography>
          <Button 
            variant="contained" 
            size="large"
            onClick={() => navigate('/checkout')}
          >
            Proceed to Checkout
          </Button>
        </>
      ) : (
        <Box>
          <Typography variant="body1" paragraph>
            Please login to view your cart.
          </Typography>
          <Button 
            variant="contained" 
            size="large"
            onClick={() => navigate('/login')}
            sx={{ mr: 2 }}
          >
            Login
          </Button>
          <Button 
            variant="outlined" 
            size="large"
            onClick={() => navigate('/register')}
          >
            Register
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Cart;