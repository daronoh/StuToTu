import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const ChatRoom = () => {
    const { otherUser } = useParams();
    const {getToken, getUser} = useAuth();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            console.log(`from: ${getUser()}, to: ${otherUser}`);
            const response = await axios.get(`/api/messages`, { 
                headers: { 'Authorization': `Bearer ${getToken()}` },
                params: { from: getUser(), to: otherUser }
            });
            setMessages(response.data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const sendMessage = async () => {
        try {
            const message = JSON.stringify({ from: getUser(), to: otherUser, content: newMessage });
            await axios.post('/api/messages', message, {headers: { 'Authorization': `Bearer ${getToken()}`,
            'Content-Type': 'application/json' }}
            );
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
            <h2>Chat with {otherUser}</h2>
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