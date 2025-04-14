import React from 'react';
import PropTypes from 'prop-types';
import './PaymentSummary.scss';

const PaymentSummary = ({ amount, method }) => {
  return (
    <div className="payment-summary">
      <h3>Payment Summary</h3>
      <div className="summary-item">
        <span>Amount:</span>
        <strong>KES {amount.toLocaleString()}</strong>
      </div>
      <div className="summary-item">
        <span>Payment Method:</span>
        <div className="method-badge">
          <img 
            src={`/assets/payment-methods/${method.toLowerCase()}.png`} 
            alt={method} 
          />
          <span>{method}</span>
        </div>
      </div>
    </div>
  );
};

PaymentSummary.propTypes = {
  amount: PropTypes.number.isRequired,
  method: PropTypes.string.isRequired
};

export default PaymentSummary;