import React from 'react';
import PropTypes from 'prop-types';
import './PaymentTimeline.css'; // Optional: Add styles for the timeline

const PaymentTimeline = ({ payments }) => {
    return (
        <div className="payment-timeline">
            <h2>Payment Timeline</h2>
            <ul>
                {payments.map((payment, index) => (
                    <li key={index} className="payment-item">
                        <div className="payment-date">{payment.date}</div>
                        <div className="payment-details">
                            <p>Amount: ${payment.amount}</p>
                            <p>Status: {payment.status}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

PaymentTimeline.propTypes = {
    payments: PropTypes.arrayOf(
        PropTypes.shape({
            date: PropTypes.string.isRequired,
            amount: PropTypes.number.isRequired,
            status: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default PaymentTimeline;