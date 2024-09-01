import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthComponent.css';

const AuthComponent = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{ username?: string; password?: string; apiError?: string }>({});
    const navigate = useNavigate();
    // const serverUrl = process.env.REACT_APP_SERVER_URL_PROD
    // const serverUrl = process.env.REACT_APP_SERVER_URL_DEV
    // const serverUrl = 'http://52.71.98.179:8000'
    const serverUrl = 'http://localhost:8000'
    // process.env.NODE_ENV === 'production'
    //     ? process.env.REACT_APP_SERVER_URL_PROD
    //     : process.env.REACT_APP_SERVER_URL_DEV;

    const validate = () => {
        const newErrors: { username?: string; password?: string } = {};
        if (!username) newErrors.username = 'Username is required';
        if (!password) newErrors.password = 'Password is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Update the handleLogin function in AuthComponent to store the username
    const handleLogin = async () => {
        if (!validate()) return;
        try {
            const formData = new URLSearchParams();
            formData.append('username', username);
            formData.append('password', password);

            const response = await fetch(`${serverUrl}/token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData.toString(),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('username', data.username); // Store the username
                localStorage.setItem('access_token', data.access_token); // Store the token
                navigate('/chat'); // Navigate to the chat page
            } else {
                const errorData = await response.json();
                setErrors({ ...errors, apiError: errorData.detail });
            }
        } catch (error) {
            console.error('Error during login:', error);
            setErrors({ ...errors, apiError: 'Failed to login. Please try again later.' });
        }
    };

    const handlePasswordReset = () => {
        navigate('/reset-password');
    };

    const handleRegister = async () => {
        if (!validate()) return;
        try {
            const formData = new URLSearchParams();
            formData.append('username', username);
            formData.append('password', password);

            const response = await fetch(`${serverUrl}/register-form`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData.toString(),
            });

            if (response.ok) {
                navigate('/'); // Navigate to the login page
            } else {
                const errorData = await response.json();
                setErrors({ ...errors, apiError: errorData.detail });
            }
        } catch (error) {
            console.error('Error during registration:', error);
            setErrors({ ...errors, apiError: 'Failed to register. Please try again later.' });
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    };

    return (
        <div className="auth-container">
            <h2>Login</h2>
            <input
                id="username"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={handleKeyPress}
                className="auth-input"
            />
            {errors.username && <div className="error">{errors.username}</div>}
            <input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                className="auth-input"
            />
            {errors.password && <div className="error">{errors.password}</div>}
            {errors.apiError && <div className="error">{errors.apiError}</div>}
            <button onClick={handleLogin} className="auth-button">Login</button>
            <button onClick={handleRegister} className="auth-button">Register</button>
        </div>
    );
};

export default AuthComponent;