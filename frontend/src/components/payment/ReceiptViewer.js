import React from 'react';

const ReceiptViewer = ({ receipt }) => {
    if (!receipt) {
        return <p>No receipt available to display.</p>;
    }

    return (
        <div className="receipt-viewer">
            <h2>Receipt Details</h2>
            <p><strong>Transaction ID:</strong> {receipt.transactionId}</p>
            <p><strong>Date:</strong> {new Date(receipt.date).toLocaleDateString()}</p>
            <p><strong>Amount:</strong> ${receipt.amount.toFixed(2)}</p>
            <p><strong>Status:</strong> {receipt.status}</p>
        </div>
    );
};

export default ReceiptViewer;