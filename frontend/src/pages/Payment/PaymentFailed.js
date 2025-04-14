import React from 'react';
import { 
  Box, Typography, Button, Stack, Alert, 
  List, ListItem, ListItemText, Collapse 
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import ErrorIcon from '@mui/icons-material/Error';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import './PaymentFailed.scss';

const PaymentFailed = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [expanded, setExpanded] = React.useState(false);
  const paymentData = location.state?.paymentData || {};
  const error = location.state?.error || 'Payment processing failed';

  const handleRetry = () => {
    if (paymentData.bookId) {
      navigate('/payment', { 
        state: { 
          bookId: paymentData.bookId, 
          amount: paymentData.amount,
          retry: true
        } 
      });
    } else {
      navigate('/payment');
    }
  };

  return (
    <Box className="payment-failed-container">
      <Box textAlign="center" sx={{ mb: 4 }}>
        <ErrorIcon color="error" sx={{ fontSize: 80, mb: 2 }} />
        <Typography variant="h4" gutterBottom>
          Payment Failed
        </Typography>
        <Typography variant="body1" color="text.secondary">
          We couldn&apos;t process your payment. Please try again.
        </Typography>
      </Box>

      <Alert severity="error" sx={{ mb: 3 }}>
        {error}
      </Alert>

      <Button
        variant="text"
        onClick={() => setExpanded(!expanded)}
        endIcon={expanded ? <ExpandLess /> : <ExpandMore />}
        sx={{ mb: 2 }}
      >
        {expanded ? 'Hide details' : 'Show payment details'}
      </Button>

      <Collapse in={expanded}>
        <Box sx={{ p: 2, mb: 3, border: '1px solid #eee', borderRadius: 1 }}>
          <List dense>
            <ListItem>
              <ListItemText 
                primary="Transaction Reference" 
                secondary={paymentData.transactionId || 'N/A'} 
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Amount" 
                secondary={`KES ${paymentData.amount?.toLocaleString() || '0'}`} 
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Book" 
                secondary={paymentData.bookTitle || 'N/A'} 
              />
            </ListItem>
          </List>
        </Box>
      </Collapse>

      <Stack direction="row" spacing={2} sx={{ justifyContent: 'center' }}>
        <Button
          variant="contained"
          color="error"
          size="large"
          onClick={handleRetry}
          sx={{ px: 4 }}
        >
          Retry Payment
        </Button>
        <Button
          variant="outlined"
          size="large"
          onClick={() => navigate('/books')}
          sx={{ px: 4 }}
        >
          Back to Books
        </Button>
      </Stack>

      <Typography variant="body2" sx={{ mt: 4, textAlign: 'center' }}>
        Still having trouble? Contact our support team at support@schoolbooks.com
      </Typography>
    </Box>
  );
};

export default PaymentFailed;