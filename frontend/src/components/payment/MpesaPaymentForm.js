import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { validatePhoneNumber } from '../../utils/validators';
import Input from '../ui/Input';
import Button from '../ui/Button';
import PaymentInstructions from './PaymentInstructions';
import PaymentSummary from './PaymentSummary';
import './MpesaPaymentForm.scss';

const MpesaPaymentForm = ({ amount, onPaymentInitiated }) => {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    setPhone(value);
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validatePhoneNumber(phone)) {
      setError('Please enter a valid M-Pesa phone number (e.g., 254712345678)');
      return;
    }

    setIsProcessing(true);
    try {
      await onPaymentInitiated({
        phone: phone.startsWith('0') ? `254${phone.substring(1)}` : phone,
        amount
      });
    } catch (err) {
      setError(err.message || 'Payment initiation failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="mpesa-payment-form">
      <PaymentSummary amount={amount} method="M-Pesa" />
      
      <form onSubmit={handleSubmit} noValidate>
        <Input
          label="M-Pesa Phone Number"
          type="tel"
          name="phone"
          value={phone}
          onChange={handlePhoneChange}
          placeholder="e.g. 254712345678"
          error={error}
          maxLength={12}
          required
        />
        
        <Button 
          type="submit"
          variant="primary"
          size="large"
          disabled={isProcessing || !phone}
          fullWidth
          loading={isProcessing}
        >
          {isProcessing ? 'Processing Payment...' : 'Pay with M-Pesa'}
        </Button>
      </form>
      
      <PaymentInstructions method="mpesa" />
    </div>
  );
};

MpesaPaymentForm.propTypes = {
  amount: PropTypes.number.isRequired,
  onPaymentInitiated: PropTypes.func.isRequired
};

export default MpesaPaymentForm;