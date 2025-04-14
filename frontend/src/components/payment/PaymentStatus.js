import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { usePayment } from '../../hooks/usePayment';
import Button from '../ui/Button';
import Icon from '../ui/Icon';
import './PaymentStatus.scss';

const PaymentStatus = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { verifyPayment, downloadReceipt } = usePayment();
  const queryParams = new URLSearchParams(location.search);
  
  const [status, setStatus] = useState(queryParams.get('status') || 'unknown');
  const [transactionId, setTransactionId] = useState(queryParams.get('transactionId') || '');
  const [amount, setAmount] = useState(queryParams.get('amount') || '');
  const [paymentMethod, setPaymentMethod] = useState(queryParams.get('method') || 'M-Pesa');
  const [isLoading, setIsLoading] = useState(false);
  const [receiptUrl, setReceiptUrl] = useState('');

  useEffect(() => {
    const verifyTransaction = async () => {
      if (transactionId && status === 'pending') {
        setIsLoading(true);
        try {
          const verification = await verifyPayment(transactionId);
          if (verification.status === 'success') {
            setStatus('success');
            setReceiptUrl(verification.receiptUrl);
          } else if (verification.status === 'failed') {
            setStatus('failed');
          }
        } catch (error) {
          console.error('Verification error:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    verifyTransaction();
  }, [transactionId, status, verifyPayment]);

  const handleDownloadReceipt = async () => {
    if (!receiptUrl && transactionId) {
      try {
        const receipt = await downloadReceipt(transactionId);
        setReceiptUrl(receipt.url);
        window.open(receipt.url, '_blank');
      } catch (error) {
        console.error('Error downloading receipt:', error);
      }
    } else if (receiptUrl) {
      window.open(receiptUrl, '_blank');
    }
  };

  const getStatusDetails = () => {
    switch (status) {
      case 'success':
        return {
          icon: 'check_circle',
          title: 'Payment Successful',
          message: 'Your payment has been processed successfully. The document is now available for download.',
          color: 'success',
          iconComponent: <Icon name="check_circle" size="large" color="success" />
        };
      case 'failed':
        return {
          icon: 'error',
          title: 'Payment Failed',
          message: 'The payment could not be processed. Please check your balance and try again.',
          color: 'error',
          iconComponent: <Icon name="error" size="large" color="error" />
        };
      case 'pending':
        return {
          icon: 'pending',
          title: 'Payment Pending',
          message: 'Your payment is being processed. This may take a few minutes.',
          color: 'warning',
          iconComponent: <Icon name="pending" size="large" color="warning" />
        };
      default:
        return {
          icon: 'help',
          title: 'Payment Status Unknown',
          message: 'We couldn\'t determine the status of your payment. Please check your transaction history.',
          color: 'info',
          iconComponent: <Icon name="help" size="large" color="info" />
        };
    }
  };

  const statusDetails = getStatusDetails();

  return (
    <div className={`payment-status ${statusDetails.color}`}>
      <div className="payment-status__icon">
        {statusDetails.iconComponent}
      </div>
      
      <h1 className="payment-status__title">{statusDetails.title}</h1>
      <p className="payment-status__message">{statusDetails.message}</p>
      
      <div className="payment-status__details">
        {transactionId && (
          <div className="detail-row">
            <span className="detail-label">Transaction ID:</span>
            <span className="detail-value">{transactionId}</span>
          </div>
        )}
        {amount && (
          <div className="detail-row">
            <span className="detail-label">Amount:</span>
            <span className="detail-value">KES {parseFloat(amount).toLocaleString()}</span>
          </div>
        )}
        {paymentMethod && (
          <div className="detail-row">
            <span className="detail-label">Payment Method:</span>
            <span className="detail-value">{paymentMethod}</span>
          </div>
        )}
      </div>

      <div className="payment-status__actions">
        {status === 'success' && receiptUrl && (
          <Button
            variant="outline"
            onClick={handleDownloadReceipt}
            icon="receipt"
          >
            Download Receipt
          </Button>
        )}
        
        {status === 'success' ? (
          <Button
            variant="primary"
            onClick={() => navigate('/books')}
            icon="book"
          >
            Browse More Books
          </Button>
        ) : status === 'failed' ? (
          <Button
            variant="primary"
            onClick={() => navigate(-1)}
            icon="refresh"
          >
            Try Again
          </Button>
        ) : (
          <Button
            variant="primary"
            onClick={() => navigate('/dashboard')}
            icon="home"
          >
            Go to Dashboard
          </Button>
        )}
      </div>

      {isLoading && (
        <div className="payment-status__loading">
          <div className="spinner"></div>
          <span>Verifying payment status...</span>
        </div>
      )}
    </div>
  );
};

export default PaymentStatus;