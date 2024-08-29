import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthComponent.css';

const AuthComponent = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        // Add authentication logic here
        if (username === 'user' && password === 'password') {
            navigate('/chat');
        } else {
            alert('Invalid credentials');
        }
    };

    const handlePasswordReset = () => {
        navigate('/reset-password');
    };

    return (
        <div className="auth-container">
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="auth-input"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="auth-input"
            />
            <button onClick={handleLogin} className="auth-button">Login</button>
            <button onClick={handlePasswordReset} className="auth-button">Forgot Password?</button>
        </div>
    );
};

export default AuthComponent;