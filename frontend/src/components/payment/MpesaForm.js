import React, { useState, useEffect } from 'react';
import { usePayment } from '../../hooks/usePayment';
import './MpesaForm.scss';

const MpesaForm = ({ amount, bookId, onSuccess, onError }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [paymentType, setPaymentType] = useState('paybill');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const { initiateMpesaPayment } = usePayment();

    const validatePhoneNumber = (number) => {
        // Kenyan phone number validation (starts with 7 and has 9 digits)
        const regex = /^[0-9]{9}$/;
        return regex.test(number.substring(1)) && number.startsWith('0');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = {};
        
        if (!phoneNumber) {
            validationErrors.phoneNumber = 'Phone number is required';
        } else if (!validatePhoneNumber(phoneNumber)) {
            validationErrors.phoneNumber = 'Please enter a valid Kenyan phone number (e.g., 07XXXXXXXX)';
        }
        
        if (!amount || amount <= 0) {
            validationErrors.amount = 'Amount must be greater than 0';
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsSubmitting(true);
        setErrors({});

        try {
            const formattedPhone = `254${phoneNumber.substring(1)}`;
            const response = await initiateMpesaPayment(formattedPhone, amount, bookId);
            
            if (onSuccess) {
                onSuccess(response);
            }
        } catch (error) {
            console.error('Payment error:', error);
            if (onError) {
                onError(error.message || 'Payment initiation failed. Please try again.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mpesa-form">
            <div className="form-group">
                <label htmlFor="paymentType">Payment Type</label>
                <select
                    id="paymentType"
                    value={paymentType}
                    onChange={(e) => setPaymentType(e.target.value)}
                    className="form-control"
                >
                    <option value="paybill">Paybill</option>
                    <option value="till">Till Number</option>
                    <option value="buygoods">Buy Goods</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number</label>
                <div className="input-group">
                    <span className="input-group-text">+254</span>
                    <input
                        type="tel"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="7XXXXXXXX"
                        className={`form-control ${errors.phoneNumber ? 'is-invalid' : ''}`}
                        maxLength="10"
                    />
                </div>
                {errors.phoneNumber && (
                    <div className="invalid-feedback">{errors.phoneNumber}</div>
                )}
            </div>

            <div className="form-group">
                <label htmlFor="amount">Amount (KES)</label>
                <input
                    type="number"
                    id="amount"
                    value={amount}
                    readOnly
                    className={`form-control ${errors.amount ? 'is-invalid' : ''}`}
                />
                {errors.amount && (
                    <div className="invalid-feedback">{errors.amount}</div>
                )}
            </div>

            <div className="form-note">
                You will receive an M-Pesa push notification to complete the payment.
            </div>

            <button 
                type="submit" 
                className="submit-button"
                disabled={isSubmitting}
            >
                {isSubmitting ? (
                    <>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Processing...
                    </>
                ) : (
                    'Pay with M-Pesa'
                )}
            </button>
        </form>
    );
};

export default MpesaForm;