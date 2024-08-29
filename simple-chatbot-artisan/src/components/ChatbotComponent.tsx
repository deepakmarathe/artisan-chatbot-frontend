import React, {useRef, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Maximize2, Settings, Send, Edit, Trash2, Check, Paperclip, Smile, LogOut } from 'lucide-react';
import './ChatbotComponent.css';

type Message = {
    id: number;
    text: string;
    sender: 'bot' | 'user';
    timestamp: Date;
    reactions: { [key: string]: number };
    avatar: string;
};

const ChatbotComponent = () => {
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: "Hi Jane,\nAmazing how Mosey is simplifying state compliance\nfor businesses across the board!", sender: 'bot', timestamp: new Date(), reactions: {}, avatar: 'https://i.pravatar.cc/40?img=1' },
        { id: 2, text: "Hi, thanks for connecting!", sender: 'user', timestamp: new Date(), reactions: {}, avatar: 'https://i.pravatar.cc/40?img=2' },
        { id: 3, text: "Hi Jane,\nAmazing how Mosey is simplifying state compliance\nfor businesses across the board!", sender: 'bot', timestamp: new Date(), reactions: {}, avatar: 'https://i.pravatar.cc/40?img=1' },
    ]);
    const [isEditing, setIsEditing] = useState<number | null>(null);
    const [editText, setEditText] = useState('');
    const [inputText, setInputText] = useState('');
    const [hoveredMessage, setHoveredMessage] = useState<number | null>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isTyping, setIsTyping] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState<number | null>(null);
    const chatbotRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const handleSend = () => {
        if (inputText.trim()) {
            setMessages(prevMessages => [...prevMessages, { id: Date.now(), text: inputText, sender: 'user', timestamp: new Date(), reactions: {}, avatar: 'https://i.pravatar.cc/40?img=2' }]);
            setInputText('');
            simulateBotTyping();
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setMessages(prevMessages => [...prevMessages, { id: Date.now(), text: `File: ${file.name}`, sender: 'user', timestamp: new Date(), reactions: {}, avatar: 'https://i.pravatar.cc/40?img=2' }]);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    const handleUpdate = (id: number) => {
        setMessages(messages.map(msg =>
            msg.id === id ? { ...msg, text: editText, reactions: msg.reactions } : msg
        ));
        setIsEditing(null);
        setEditText('');
    };

    const handleEditKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, id: number) => {
        if (e.key === 'Enter') {
            handleUpdate(id);
        }
    };

    const handleDelete = (id: number) => {
        setMessages(messages.filter(msg => msg.id !== id));
    };

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        const rect = chatbotRef.current!.getBoundingClientRect();
        e.dataTransfer.setData('text/plain', JSON.stringify({
            offsetX: e.clientX - rect.left,
            offsetY: e.clientY - rect.top
        }));
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const offset = JSON.parse(e.dataTransfer.getData('text/plain'));
        const newX = e.clientX - offset.offsetX;
        const newY = e.clientY - offset.offsetY;
        setPosition({ x: newX, y: newY });
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const simulateBotTyping = () => {
        setIsTyping(true);
        setTimeout(() => {
            setMessages(prevMessages => [...prevMessages, { id: Date.now(), text: "This is a bot response.", sender: 'bot', timestamp: new Date(), reactions: {}, avatar: 'https://i.pravatar.cc/40?img=1' }]);
            setIsTyping(false);
        }, 2000); // Simulate a 2-second typing delay
    };

    const handleAddReaction = (messageId: number, emoji: string) => {
        setMessages(messages.map(msg => {
            if (msg.id === messageId) {
                const newReactions = { ...msg.reactions, [emoji]: (msg.reactions[emoji] || 0) + 1 };
                return { ...msg, reactions: newReactions };
            }
            return msg;
        }));
        setShowEmojiPicker(null);
    };

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:8003/logout', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                },
            });

            if (response.ok) {
                localStorage.removeItem('access_token');
                navigate('/'); // Navigate to the login page
            } else {
                alert('Failed to logout. Please try again.');
            }
        } catch (error) {
            console.error('Error during logout:', error);
            alert('Failed to logout. Please try again later.');
        }
    };

    const EmojiPicker = ({ onSelect }: { onSelect: (emoji: string) => void }) => (
        <div className="emoji-picker">
            {['😀', '😂', '😍', '😢', '👍', '👎'].map(emoji => (
                <span key={emoji} onClick={() => onSelect(emoji)}>{emoji}</span>
            ))}
        </div>
    );

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
                    <LogOut className="chatbot-icon" onClick={handleLogout} />
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
                        <img src={msg.avatar} alt={`${msg.sender} avatar`} className="chatbot-avatar" />
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
                                <span className="chatbot-timestamp">{msg.timestamp.toLocaleTimeString()}</span>
                                {hoveredMessage === msg.id && (
                                    <div className="chatbot-message-options">
                                        <Edit className="chatbot-icon" onClick={() => { setIsEditing(msg.id); setEditText(msg.text); }} />
                                        <Trash2 className="chatbot-icon" onClick={() => handleDelete(msg.id)} />
                                        <Smile className="chatbot-icon" onClick={() => setShowEmojiPicker(msg.id)} />
                                    </div>
                                )}
                                {showEmojiPicker === msg.id && (
                                    <EmojiPicker onSelect={(emoji) => handleAddReaction(msg.id, emoji)} />
                                )}
                                <div className="chatbot-reactions">
                                    {Object.entries(msg.reactions).map(([emoji, count]) => (
                                        <span key={emoji} className="chatbot-reaction">{emoji} {count as number}</span>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                ))}
                {isTyping && (
                    <div className="chatbot-typing-indicator">
                        Ava is typing...
                    </div>
                )}
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
                <label htmlFor="file-upload" className="chatbot-file-upload">
                    <Paperclip className="chatbot-icon" />
                </label>
                <input
                    id="file-upload"
                    type="file"
                    style={{ display: 'none' }}
                    onChange={handleFileUpload}
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