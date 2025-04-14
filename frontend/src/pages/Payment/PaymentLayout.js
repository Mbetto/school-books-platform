import React from 'react';
import { Box, Container } from '@mui/material';
import PaymentHeader from './PaymentHeader';
import PaymentFooter from './PaymentFooter';
import './PaymentLayout.scss';

const PaymentLayout = ({ children }) => {
  return (
    <Box className="payment-layout">
      <PaymentHeader />
      <Container maxWidth="lg" className="payment-content">
        {children}
      </Container>
      <PaymentFooter />
    </Box>
  );
};

export default PaymentLayout;