import React, { useState } from 'react';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Simulate API call
        try {
            // Replace with actual API call
            console.log('Sending password reset request for:', email);
            setMessage('If this email is registered, a password reset link has been sent.');
        } catch (error) {
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
            <h2>Forgot Password</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="email">Email Address:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </div>
                <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>
                    Submit
                </button>
            </form>
            {message && <p style={{ marginTop: '20px', color: 'green' }}>{message}</p>}
        </div>
    );
};

export default ForgotPassword;