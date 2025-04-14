import React from 'react';
import PropTypes from 'prop-types';
import './PaymentInstructions.scss';

const PaymentInstructions = ({ method }) => {
  const getInstructions = () => {
    switch (method.toLowerCase()) {
      case 'mpesa':
        return [
          'Enter your M-Pesa registered phone number',
          'Click "Pay with M-Pesa" button',
          'Check your phone for an M-Pesa STK Push',
          'Enter your M-Pesa PIN when prompted',
          'Wait for payment confirmation'
        ];
      case 'card':
        return [
          'Enter your card details securely',
          'Provide any required authentication',
          'Wait for payment processing',
          'Receive instant confirmation'
        ];
      default:
        return [
          'Select your preferred payment method',
          'Follow the on-screen instructions',
          'Complete the payment process'
        ];
    }
  };

  return (
    <div className="payment-instructions">
      <h4>How to Pay:</h4>
      <ol>
        {getInstructions().map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
    </div>
  );
};

PaymentInstructions.propTypes = {
  method: PropTypes.string.isRequired
};

export default PaymentInstructions;