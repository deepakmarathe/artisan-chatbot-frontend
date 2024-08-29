import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthComponent.css';

const PasswordResetComponent = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleReset = () => {
        // Add password reset logic here
        alert('Password reset link sent to ' + email);
        navigate('/');
    };

    return (
        <div className="auth-container">
            <h2>Reset Password</h2>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="auth-input"
            />
            <button onClick={handleReset} className="auth-button">Reset Password</button>
        </div>
    );
};

export default PasswordResetComponent;