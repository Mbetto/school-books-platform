import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import paymentService from '../../services/payment';
import MpesaPaymentForm from '../../components/payment/MpesaPaymentForm';
import PaymentStatus from '../../components/payment/PaymentStatus';
import PropTypes from 'prop-types';
import './PaymentPage.scss';

const PaymentPage = () => {
    const { user } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [phoneNumber, setPhoneNumber] = useState(user?.phone || '');
    const [amount] = useState(location.state?.amount || 0); // Removed setAmount since it's unused
    const [bookId] = useState(location.state?.bookId || ''); // Removed setBookId since it's unused
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [transactionId, setTransactionId] = useState(null);
    const [error, setError] = useState(null);
    const [pollingTimeout, setPollingTimeout] = useState(null);

    useEffect(() => {
        return () => {
            // Clean up any ongoing polling when component unmounts
            if (pollingTimeout) {
                clearTimeout(pollingTimeout);
            }
        };
    }, [pollingTimeout]);

    const handlePaymentSubmit = async (e) => {
        e.preventDefault();
        
        if (!phoneNumber || !amount || !bookId) {
            setError('Please fill all required fields');
            return;
        }

        setIsProcessing(true);
        setError(null);
        
        try {
            const response = await paymentService.initiateMpesaPayment(
                phoneNumber,
                amount,
                bookId
            );
            
            setTransactionId(response.transactionId);
            setPaymentStatus('pending');
            pollPaymentStatus(response.transactionId);
        } catch (err) {
            setError(err.message || 'Payment initiation failed');
            setIsProcessing(false);
        }
    };

    const pollPaymentStatus = async (transactionId) => {
        const maxAttempts = 10;
        let attempts = 0;
        
        const checkStatus = async () => {
            attempts++;
            try {
                const status = await paymentService.checkPaymentStatus(transactionId);
                
                if (status === 'completed') {
                    setPaymentStatus('completed');
                    setIsProcessing(false);
                    return;
                } 
                
                if (status === 'failed') {
                    setPaymentStatus('failed');
                    setIsProcessing(false);
                    return;
                }
                
                if (attempts < maxAttempts) {
                    const timeoutId = setTimeout(checkStatus, 3000);
                    setPollingTimeout(timeoutId);
                } else {
                    setPaymentStatus('timeout');
                    setIsProcessing(false);
                }
            } catch (err) {
                console.error('Error checking payment status:', err);
                if (attempts < maxAttempts) {
                    const timeoutId = setTimeout(checkStatus, 3000);
                    setPollingTimeout(timeoutId);
                } else {
                    setPaymentStatus('error');
                    setIsProcessing(false);
                }
            }
        };
        
        checkStatus();
    };

    if (!amount || !bookId) {
        navigate('/books');
        return null;
    }

    return (
        <div className="payment-page">
            <div className="payment-container">
                <h2>Complete Your Purchase</h2>
                <p className="book-info">Book ID: {bookId}</p>
                
                {paymentStatus ? (
                    <PaymentStatus 
                        status={paymentStatus}
                        transactionId={transactionId}
                        amount={amount}
                        onRetry={() => {
                            setPaymentStatus(null);
                            setError(null);
                        }}
                    />
                ) : (
                    <>
                        {error && <div className="error-message">{error}</div>}
                        <MpesaPaymentForm
                            phoneNumber={phoneNumber}
                            amount={amount}
                            isProcessing={isProcessing}
                            error={error}
                            onPhoneChange={(e) => setPhoneNumber(e.target.value)}
                            onSubmit={handlePaymentSubmit}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

PaymentPage.propTypes = {
    user: PropTypes.shape({
        phone: PropTypes.string
    }),
    location: PropTypes.object.isRequired,
    navigate: PropTypes.func.isRequired
};

export default PaymentPage;