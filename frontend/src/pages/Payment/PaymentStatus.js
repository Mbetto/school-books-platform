import React from 'react';
import { useLocation } from 'react-router-dom';
import './PaymentStatus.scss';

const PaymentStatus = ({ status, transactionId, amount, onRetry }) => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const getStatusMessage = () => {
        switch (status) {
            case 'completed':
                return 'Payment completed successfully!';
            case 'failed':
                return 'Payment failed. Please try again.';
            case 'pending':
                return 'Payment is being processed...';
            case 'timeout':
                return 'Payment timed out. Please check your mobile money and try again.';
            default:
                return 'Payment status unknown.';
        }
    };

    return (
        <div className="payment-status">
            <h3>{getStatusMessage()}</h3>
            {transactionId && <p>Transaction ID: {transactionId}</p>}
            {amount && <p>Amount: KES {amount.toLocaleString()}</p>}
            
            {(status === 'failed' || status === 'timeout') && (
                <button onClick={onRetry} className="retry-button">
                    Retry Payment
                </button>
            )}
            
            {status === 'completed' && (
                <button onClick={() => window.location.href = '/books'} className="back-button">
                    Back to Books
                </button>
            )}
        </div>
    );
};

export default PaymentStatus;