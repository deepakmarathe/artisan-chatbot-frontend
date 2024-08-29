// src/components/ChatbotComponent.tsx
import React, { useState, useRef } from 'react';
import { X, Maximize2, Settings, Send, Edit, Trash2, Check } from 'lucide-react';
import './ChatbotComponent.css';

const ChatbotComponent = () => {
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi Jane,\nAmazing how Mosey is simplifying state compliance\nfor businesses across the board!", sender: 'bot' },
        { id: 2, text: "Hi, thanks for connecting!", sender: 'user' },
        { id: 3, text: "Hi Jane,\nAmazing how Mosey is simplifying state compliance\nfor businesses across the board!", sender: 'bot' },
    ]);
    const [isEditing, setIsEditing] = useState(null);
    const [editText, setEditText] = useState('');
    const [inputText, setInputText] = useState('');
    const [hoveredMessage, setHoveredMessage] = useState(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const chatbotRef = useRef(null);

    const handleSend = () => {
        if (inputText.trim()) {
            setMessages([...messages, { id: Date.now(), text: inputText, sender: 'user' }]);
            setInputText('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    const handleUpdate = (id) => {
        setMessages(messages.map(msg =>
            msg.id === id ? { ...msg, text: editText } : msg
        ));
        setIsEditing(null);
        setEditText('');
    };

    const handleEditKeyPress = (e, id) => {
        if (e.key === 'Enter') {
            handleUpdate(id);
        }
    };

    const handleDelete = (id) => {
        setMessages(messages.filter(msg => msg.id !== id));
    };

    const handleDragStart = (e) => {
        const rect = chatbotRef.current.getBoundingClientRect();
        e.dataTransfer.setData('text/plain', JSON.stringify({
            offsetX: e.clientX - rect.left,
            offsetY: e.clientY - rect.top
        }));
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const offset = JSON.parse(e.dataTransfer.getData('text/plain'));
        const newX = e.clientX - offset.offsetX;
        const newY = e.clientY - offset.offsetY;
        setPosition({ x: newX, y: newY });
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    return (
        <div
            ref={chatbotRef}
            className="chatbot-container"
            draggable
            onDragStart={handleDragStart}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            style={{ left: `${position.x}px`, top: `${position.y}px` }}
        >
            <div className="chatbot-header">
                <div className="chatbot-header-left">
                    <img src="/api/placeholder/40/40" alt="Ava" className="chatbot-avatar" />
                    <span className="chatbot-title">Hey👋, I'm Ava</span>
                </div>
                <div className="chatbot-header-right">
                    <Maximize2 className="chatbot-icon" />
                    <X className="chatbot-icon" />
                </div>
            </div>

            <div className="chatbot-messages">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`chatbot-message ${msg.sender === 'user' ? 'chatbot-message-user' : 'chatbot-message-bot'}`}
                        onMouseEnter={() => setHoveredMessage(msg.id)}
                        onMouseLeave={() => setHoveredMessage(null)}
                    >
                        {isEditing === msg.id ? (
                            <div className="chatbot-edit-container">
                                <input
                                    type="text"
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                    className="chatbot-edit-input"
                                    onKeyPress={(e) => handleEditKeyPress(e, msg.id)}
                                />
                                <Check className="chatbot-icon" onClick={() => handleUpdate(msg.id)} />
                            </div>
                        ) : (
                            <>
                                <span>{msg.text}</span>
                                {hoveredMessage === msg.id && (
                                    <div className="chatbot-message-options">
                                        <Edit className="chatbot-icon" onClick={() => { setIsEditing(msg.id); setEditText(msg.text); }} />
                                        <Trash2 className="chatbot-icon" onClick={() => handleDelete(msg.id)} />
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                ))}
            </div>

            <div className="chatbot-input-container">
                <input
                    type="text"
                    placeholder="Type a message..."
                    className="chatbot-input"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <Send className="chatbot-icon" onClick={handleSend} />
            </div>

            <div className="chatbot-footer">
                <span className="chatbot-footer-text">Context: Onboarding</span>
                <Settings className="chatbot-icon" />
            </div>
        </div>
    );
};

export default ChatbotComponent;