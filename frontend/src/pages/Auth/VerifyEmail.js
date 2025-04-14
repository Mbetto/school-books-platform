import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
    const [email, setEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const navigate = useNavigate();

    const handleEmailSubmit = (e) => {
        e.preventDefault();
        // Simulate sending verification code to email
        console.log(`Verification code sent to ${email}`);
    };

    const handleCodeSubmit = (e) => {
        e.preventDefault();
        // Simulate verifying the code
        if (verificationCode === '123456') {
            setIsVerified(true);
            console.log('Email verified successfully');
            navigate('/dashboard'); // Redirect to dashboard or another page
        } else {
            console.log('Invalid verification code');
        }
    };

    return (
        <div className="verify-email">
            <h1>Verify Your Email</h1>
            {!isVerified ? (
                <>
                    <form onSubmit={handleEmailSubmit}>
                        <label>
                            Email:
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </label>
                        <button type="submit">Send Verification Code</button>
                    </form>
                    <form onSubmit={handleCodeSubmit}>
                        <label>
                            Verification Code:
                            <input
                                type="text"
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                                required
                            />
                        </label>
                        <button type="submit">Verify</button>
                    </form>
                </>
            ) : (
                <p>Your email has been verified!</p>
            )}
        </div>
    );
};

export default VerifyEmail;