import React, { useState } from 'react';
import { X, Maximize2, Settings, Send } from 'lucide-react';

const ChatbotComponent = () => {
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi Jane,\nAmazing how Mosey is simplifying state compliance\nfor businesses across the board!", sender: 'bot' },
        { id: 2, text: "Hi, thanks for connecting!", sender: 'user' },
        { id: 3, text: "Hi Jane,\nAmazing how Mosey is simplifying state compliance\nfor businesses across the board!", sender: 'bot' },
    ]);

    const handleSend = () => {
        // Implement send functionality
    };

    const handleDelete = (id) => {
        setMessages(messages.filter(msg => msg.id !== id));
    };

    const handleUpdate = (id, newText) => {
        setMessages(messages.map(msg =>
            msg.id === id ? { ...msg, text: newText } : msg
        ));
    };

    return (
        <div className="w-80 bg-white rounded-lg shadow-lg">
        <div className="flex justify-between items-center p-4 border-b">
        <div className="flex items-center space-x-2">
        <img src="/api/placeholder/40/40" alt="Ava" className="w-10 h-10 rounded-full" />
    <span className="font-semibold">Hey👋, I'm Ava</span>
    </div>
    <div className="flex space-x-2">
    <Maximize2 className="w-5 h-5 text-gray-500 cursor-pointer" />
    <X className="w-5 h-5 text-gray-500 cursor-pointer" />
        </div>
        </div>

        <div className="h-80 overflow-y-auto p-4 space-y-4">
    {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
    <div className={`max-w-3/4 p-2 rounded-lg ${msg.sender === 'user' ? 'bg-purple-500 text-white' : 'bg-gray-200'}`}>
    {msg.text}
    </div>
    </div>
))}
    </div>

    <div className="p-4 border-t">
    <div className="flex items-center space-x-2">
    <input type="text" placeholder="Type a message..." className="flex-grow p-2 border rounded-lg" />
    <Send className="w-6 h-6 text-purple-500 cursor-pointer" onClick={handleSend} />
    </div>
    </div>

    <div className="flex justify-between items-center p-4 border-t">
    <span className="text-sm text-gray-500">Context: Onboarding</span>
    <Settings className="w-5 h-5 text-gray-500 cursor-pointer" />
        </div>
        </div>
);
};

export default ChatbotComponent;