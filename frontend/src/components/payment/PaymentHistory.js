import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { formatDate, formatCurrency } from '../../utils/formatters';
import { fetchPaymentHistory } from '../../services/paymentService';
import Spinner from '../ui/Spinner';
import EmptyState from '../ui/EmptyState';
import PaymentStatusBadge from './PaymentStatusBadge';
import './PaymentHistory.scss';

const PaymentHistory = () => {
  const { currentUser } = useAuth();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadPayments = async () => {
      try {
        if (currentUser) {
          const paymentData = await fetchPaymentHistory(currentUser.id);
          setPayments(paymentData);
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch payment history');
      } finally {
        setLoading(false);
      }
    };

    loadPayments();
  }, [currentUser]);

  const filteredPayments = payments.filter(payment => {
    const matchesFilter = filter === 'all' || payment.status === filter;
    const matchesSearch = payment.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         payment.reference.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (loading) return <Spinner centered />;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="payment-history">
      <div className="history-header">
        <h2>Payment History</h2>
        
        <div className="controls">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search payments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Payments</option>
            <option value="completed">Completed</option>
            <option value="failed">Failed</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {filteredPayments.length === 0 ? (
        <EmptyState 
          icon="receipt"
          title="No payments found"
          description={searchTerm ? 'No payments match your search' : 'You haven\'t made any payments yet'}
          actionText="Browse Books"
          actionLink="/books"
        />
      ) : (
        <div className="payment-table-container">
          <table className="payment-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Book</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Reference</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment) => (
                <tr key={payment.id}>
                  <td>{formatDate(payment.date)}</td>
                  <td>{payment.bookTitle}</td>
                  <td>KES {formatCurrency(payment.amount)}</td>
                  <td>
                    <PaymentStatusBadge status={payment.status} />
                  </td>
                  <td>{payment.reference}</td>
                  <td>
                    <button className="view-receipt-btn">View Receipt</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;