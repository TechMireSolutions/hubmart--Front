import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Phone, X, Send, User } from 'lucide-react';
import { useSocket } from '../context/SocketContext';
import { useAuth } from '../context/AuthContext';
import '../styles/SupportWidget.css';

const SupportWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([
        { sender: 'admin', text: 'Hello! How can HubMart assist you today?', timestamp: new Date() }
    ]);
    const { socket, isConnected } = useSocket();
    const { user } = useAuth();
    const chatEndRef = useRef(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatHistory, isOpen]);

    useEffect(() => {
        if (socket && isConnected) {
            const handleMessage = (data) => {
                setChatHistory(prev => [...prev, {
                    sender: 'admin',
                    text: data.message,
                    timestamp: new Date()
                }]);
            };

            socket.on('receive_message', handleMessage);

            return () => {
                socket.off('receive_message', handleMessage);
            };
        }
    }, [socket, isConnected]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        const newMessage = {
            sender: 'user',
            text: message,
            timestamp: new Date()
        };

        setChatHistory(prev => [...prev, newMessage]);

        if (socket && isConnected) {
            socket.emit('client_message', {
                user: user ? user.username : 'Guest',
                message: message,
                clientId: socket.id
            });
        }

        setMessage('');
    };

    return (
        <div className="support-widget">
            {/* Action Buttons */}
            <div className="widget-actions">
                <a href="tel:+44123456789" className="widget-btn call-btn" title="Call Support">
                    <Phone size={24} />
                </a>
                <button 
                    className={`widget-btn chat-toggle ${isOpen ? 'active' : ''}`} 
                    onClick={() => setIsOpen(!isOpen)}
                    title="Live Chat"
                >
                    {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
                    {!isOpen && <span className="online-indicator"></span>}
                </button>
            </div>

            {/* Chat Window */}
            {isOpen && (
                <div className="chat-window glass">
                    <div className="chat-header">
                        <div className="admin-status">
                            <div className="avatar">H</div>
                            <div>
                                <h4>HubMart Support</h4>
                                <small>{isConnected ? 'Online' : 'Connecting...'}</small>
                            </div>
                        </div>
                    </div>

                    <div className="chat-body">
                        {chatHistory.map((msg, idx) => (
                            <div key={idx} className={`message-wrapper ${msg.sender}`}>
                                <div className="message-content">
                                    <p>{msg.text}</p>
                                    <span className="time">
                                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                            </div>
                        ))}
                        <div ref={chatEndRef} />
                    </div>

                    <form className="chat-footer" onSubmit={handleSendMessage}>
                        <input 
                            type="text" 
                            placeholder="Type your message..." 
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <button type="submit" disabled={!message.trim()}>
                            <Send size={18} />
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default SupportWidget;
