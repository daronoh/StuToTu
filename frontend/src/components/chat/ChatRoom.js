import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';

const ChatRoom = () => {
    const location = useLocation();
    const { otherProfile } = location.state || {};

    const { getToken, getUser } = useAuth();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        if (otherProfile) {
            console.log(otherProfile);
            fetchMessages();
        }
    }, [otherProfile]);

    const fetchMessages = async () => {
        try {
            if (!otherProfile) return;
            console.log(`from: ${getUser()}, to: ${otherProfile.username}`);
            const response = await axios.get(`/api/messages`, { 
                headers: { 'Authorization': `Bearer ${getToken()}` },
                params: { from: getUser(), to: otherProfile.username }
            });
            setMessages(response.data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const sendMessage = async () => {
        try {
            if (!otherProfile) return;
            const message = JSON.stringify({ from: getUser(), to: otherProfile.username, content: newMessage });
            await axios.post('/api/messages', message, {
                headers: { 
                    'Authorization': `Bearer ${getToken()}`,
                    'Content-Type': 'application/json'
                }
            });
            setNewMessage('');
            fetchMessages(); // Refresh messages after sending
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const handleChange = (event) => {
        setNewMessage(event.target.value);
    };

    return (
        <div>
            <h2>Chat with {otherProfile?.username}</h2>
            <div style={{ height: '400px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px'}}>
                {messages.map((message, index) => (
                    <div key={index}>
                        <strong>{message.from}:</strong> {message.content}
                    </div>
                ))}
            </div>
            <div>
                <input 
                    className='textbox'
                    type="text" 
                    autoComplete='off'
                    onChange={handleChange}
                    value={newMessage}
                    required
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default ChatRoom;