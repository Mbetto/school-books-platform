import React, { useEffect, useState } from 'react';
import { 
  Box, Typography, Button, Stack, Divider, 
  List, ListItem, ListItemText, Chip, Alert,
  Paper 
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { format } from 'date-fns';
import './PaymentSuccess.scss';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [paymentData, setPaymentData] = useState(location.state?.paymentData || {});

  useEffect(() => {
    if (!paymentData.transactionId && localStorage.getItem('lastSuccessfulPayment')) {
      setPaymentData(JSON.parse(localStorage.getItem('lastSuccessfulPayment')));
    } else if (paymentData.transactionId) {
      localStorage.setItem('lastSuccessfulPayment', JSON.stringify(paymentData));
    }
  }, [paymentData]);

  // Removed unused handleRetryPayment function

  return (
    <Box className="payment-success-container">
      <Box textAlign="center" sx={{ mb: 4 }}>
        <CheckCircleIcon color="success" sx={{ fontSize: 80, mb: 2 }} />
        <Typography variant="h4" gutterBottom>
          Payment Successful!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Thank you for your purchase. Your transaction has been completed.
        </Typography>
      </Box>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }} className="payment-details">
        <Typography variant="h6" gutterBottom>
          Payment Details
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <List>
          <ListItem>
            <ListItemText 
              primary="Transaction ID" 
              secondary={paymentData.transactionId || 'N/A'} 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Date & Time" 
              secondary={paymentData.createdAt ? 
                format(new Date(paymentData.createdAt), 'PPpp') : 'N/A'} 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Amount Paid" 
              secondary={`KES ${paymentData.amount?.toLocaleString() || '0'}`} 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Book Purchased" 
              secondary={paymentData.bookTitle || 'N/A'} 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Payment Method" 
              secondary={paymentData.method || 'M-Pesa'} 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Status" 
              secondary={
                <Chip label="Completed" color="success" size="small" />
              } 
            />
          </ListItem>
        </List>

        {paymentData.receiptUrl && (
          <Alert severity="info" sx={{ mt: 2 }}>
            A receipt has been sent to your email. You can also 
            <Button 
              href={paymentData.receiptUrl} 
              target="_blank"
              size="small"
              sx={{ ml: 1 }}
            >
              download it here
            </Button>
          </Alert>
        )}
      </Paper>

      <Stack direction="row" spacing={2} sx={{ justifyContent: 'center' }}>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/books')}
          sx={{ px: 4 }}
        >
          Browse More Books
        </Button>
        <Button
          variant="outlined"
          size="large"
          onClick={() => navigate('/payment/history')}
          sx={{ px: 4 }}
        >
          View Payment History
        </Button>
      </Stack>
    </Box>
  );
};

export default PaymentSuccess;