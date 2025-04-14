import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PaymentPage from './PaymentPage';
import PaymentHistory from './PaymentHistory';
import PaymentSuccess from './PaymentSuccess';
import PaymentFailed from './PaymentFailed';
import PaymentLayout from './PaymentLayout';

const PaymentRoutes = () => {
  return (
    <PaymentLayout>
      <Routes>
        <Route path="/" element={<PaymentPage />} />
        <Route path="history" element={<PaymentHistory />} />
        <Route path="success" element={<PaymentSuccess />} />
        <Route path="failed" element={<PaymentFailed />} />
      </Routes>
    </PaymentLayout>
  );
};

export default PaymentRoutes;