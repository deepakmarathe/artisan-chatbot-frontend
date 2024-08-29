import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import ChatbotComponent from './components/ChatbotComponent';
import AuthComponent from './components/AuthComponent';
import PasswordResetComponent from './components/PasswordResetComponent';
import RegisterComponent from './components/RegisterComponent';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<AuthComponent />} />
                    <Route path="/chat" element={<ChatbotComponent />} />
                    <Route path="/reset-password" element={<PasswordResetComponent />} />
                    <Route path="/register" element={<RegisterComponent />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;