import React, { useState, useEffect } from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, Typography, CircularProgress, Alert, Chip, Box, 
  TextField, MenuItem, Button, Stack, IconButton 
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { Download, FilterAlt, Clear } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import paymentService from '../../services/payment';
import { format } from 'date-fns';
import './PaymentHistory.scss';

const PaymentHistory = () => {
  const { user } = useAuth();
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter states
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState({ start: null, end: null });
  const [amountFilter, setAmountFilter] = useState({ min: '', max: '' });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        const response = await paymentService.getPaymentHistory(user.id);
        setPayments(response.data);
        setFilteredPayments(response.data);
      } catch (err) {
        setError(err.message || 'Failed to load payment history');
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentHistory();
  }, [user.id]);

  useEffect(() => {
    applyFilters();
  }, [payments, statusFilter, dateFilter, amountFilter, searchQuery]);

  const applyFilters = () => {
    let result = [...payments];

    if (statusFilter !== 'all') {
      result = result.filter(payment => payment.status === statusFilter);
    }

    if (dateFilter.start) {
      result = result.filter(payment => 
        new Date(payment.createdAt) >= dateFilter.start
      );
    }

    if (dateFilter.end) {
      result = result.filter(payment => 
        new Date(payment.createdAt) <= dateFilter.end
      );
    }

    if (amountFilter.min) {
      result = result.filter(payment => 
        payment.amount >= Number(amountFilter.min)
      );
    }

    if (amountFilter.max) {
      result = result.filter(payment => 
        payment.amount <= Number(amountFilter.max)
      );
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(payment => 
        payment.bookTitle?.toLowerCase().includes(query) ||
        payment.transactionId.toLowerCase().includes(query)
      );
    }

    setFilteredPayments(result);
  };

  const handleExportCSV = () => {
    const headers = ['Date', 'Transaction ID', 'Book', 'Amount', 'Status', 'Method'];
    const csvContent = [
      headers.join(','),
      ...filteredPayments.map(payment => 
        [
          format(new Date(payment.createdAt), 'yyyy-MM-dd'),
          `"${payment.transactionId}"`,
          `"${payment.bookTitle || 'N/A'}"`,
          payment.amount,
          payment.status,
          payment.method || 'M-Pesa'
        ].join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `payment_history_${format(new Date(), 'yyyyMMdd')}.csv`;
    link.click();
  };

  const resetFilters = () => {
    setStatusFilter('all');
    setDateFilter({ start: null, end: null });
    setAmountFilter({ min: '', max: '' });
    setSearchQuery('');
  };

  const getStatusChip = (status) => {
    switch (status) {
      case 'completed':
        return <Chip label="Completed" color="success" />;
      case 'failed':
        return <Chip label="Failed" color="error" />;
      case 'pending':
        return <Chip label="Pending" color="warning" />;
      default:
        return <Chip label={status} />;
    }
  };

  if (loading) {
    return <CircularProgress sx={{ display: 'block', mx: 'auto', my: 4 }} />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box className="payment-history-container">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Payment History
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<Download />}
          onClick={handleExportCSV}
          disabled={filteredPayments.length === 0}
        >
          Export CSV
        </Button>
      </Box>

      <Paper sx={{ p: 3, mb: 3 }} className="filters-container">
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
          <FilterAlt sx={{ mr: 1 }} /> Filters
        </Typography>
        
        <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
          <TextField
            select
            label="Status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            sx={{ minWidth: 150 }}
          >
            <MenuItem value="all">All Statuses</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="failed">Failed</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
          </TextField>

          <DatePicker
            label="From Date"
            value={dateFilter.start}
            onChange={(date) => setDateFilter({...dateFilter, start: date})}
            renderInput={(params) => <TextField {...params} sx={{ minWidth: 180 }} />}
          />

          <DatePicker
            label="To Date"
            value={dateFilter.end}
            onChange={(date) => setDateFilter({...dateFilter, end: date})}
            renderInput={(params) => <TextField {...params} sx={{ minWidth: 180 }} />}
          />

          <TextField
            label="Min Amount"
            type="number"
            value={amountFilter.min}
            onChange={(e) => setAmountFilter({...amountFilter, min: e.target.value})}
            sx={{ minWidth: 120 }}
          />

          <TextField
            label="Max Amount"
            type="number"
            value={amountFilter.max}
            onChange={(e) => setAmountFilter({...amountFilter, max: e.target.value})}
            sx={{ minWidth: 120 }}
          />

          <IconButton onClick={resetFilters} title="Reset filters">
            <Clear />
          </IconButton>
        </Stack>

        <TextField
          fullWidth
          label="Search by Book or Transaction ID"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ mb: 2 }}
        />
      </Paper>

      {filteredPayments.length === 0 ? (
        <Typography variant="body1" sx={{ my: 2 }}>
          No payments found matching your criteria
        </Typography>
      ) : (
        <TableContainer component={Paper} className="payment-table">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Transaction ID</TableCell>
                <TableCell>Book</TableCell>
                <TableCell>Amount (KES)</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Method</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment.transactionId} hover>
                  <TableCell>
                    {format(new Date(payment.createdAt), 'PP')}
                  </TableCell>
                  <TableCell>{payment.transactionId}</TableCell>
                  <TableCell>{payment.bookTitle || 'N/A'}</TableCell>
                  <TableCell>{payment.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    {getStatusChip(payment.status)}
                  </TableCell>
                  <TableCell>
                    {payment.method || 'M-Pesa'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default PaymentHistory;