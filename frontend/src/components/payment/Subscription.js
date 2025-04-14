import React from 'react';

const Subscription = () => {
    const handleSubscribe = () => {
        // Add subscription logic here
        console.log('Subscription successful!');
    };

    return (
        <div className="subscription-container">
            <h2>Subscribe to Our Service</h2>
            <p>Get access to premium features by subscribing to our platform.</p>
            <button onClick={handleSubscribe} className="subscribe-button">
                Subscribe Now
            </button>
        </div>
    );
};

export default Subscription;