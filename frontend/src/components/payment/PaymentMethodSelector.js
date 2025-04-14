import React from 'react';
import PropTypes from 'prop-types';
import './PaymentMethodSelector.scss';

const PaymentMethodSelector = ({ methods, selectedMethod, onSelect }) => {
  return (
    <div className="payment-method-selector">
      <h3>Select Payment Method</h3>
      <div className="method-grid">
        {methods.map((method) => (
          <div 
            key={method.id}
            className={`method-card ${selectedMethod === method.id ? 'selected' : ''}`}
            onClick={() => onSelect(method.id)}
          >
            <div className="method-icon">
              <img src={`/assets/payment-methods/${method.icon}`} alt={method.name} />
            </div>
            <div className="method-name">{method.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

PaymentMethodSelector.propTypes = {
  methods: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired
    })
  ).isRequired,
  selectedMethod: PropTypes.string,
  onSelect: PropTypes.func.isRequired
};

PaymentMethodSelector.defaultProps = {
  methods: [
    {
      id: 'mpesa',
      name: 'M-Pesa',
      icon: 'mpesa.png'
    },
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: 'card.png'
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      icon: 'bank.png'
    }
  ]
};

export default PaymentMethodSelector;