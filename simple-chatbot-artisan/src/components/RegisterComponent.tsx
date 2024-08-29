import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthComponent.css';

const RegisterComponent = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleRegister = () => {
        // Add registration logic here
        alert('Registration successful for ' + username);
        navigate('/');
    };

    return (
        <div className="auth-container">
            <h2>Register</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="auth-input"
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="auth-input"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="auth-input"
            />
            <button onClick={handleRegister} className="auth-button">Register</button>
        </div>
    );
};

export default RegisterComponent;