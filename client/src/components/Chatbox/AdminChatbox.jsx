import React, { useState, useEffect, useRef } from 'react';
import { ListGroup, Form, Button } from 'react-bootstrap';
import { io } from 'socket.io-client';
import './AdminChatbox.scss'; 

const socket = io('http://localhost:5000');

const AdminChatbox = () => {
  const [onlineUsers, setOnlineUsers] = useState([]); 
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState({});
  const [newMessage, setNewMessage] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    socket.emit('user_login', { userId: 'admin' }); // Admin login

    socket.on('online_users', (users) => {
      setOnlineUsers(users);
    });

    socket.on('receive_message', (message) => {
        console.log('Message received from user:', message);
      const { senderId, text } = message;
      setMessages((prev) => ({
        ...prev,
        [senderId]: [...(prev[senderId] || []), { senderId, text }],
      }));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedUser) {
      const message = { receiverId: selectedUser, text: newMessage, senderId: 'admin' };
      socket.emit('send_message', message);
      setMessages((prev) => ({
        ...prev,
        [selectedUser]: [...(prev[selectedUser] || []), message]
      }));
      setNewMessage('');
    }
  };

  // Auto-scroll to the bottom when new messages come in
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages[selectedUser]]);

  return (
    <div className="admin-chatbox">
      <div className="user-list">
        <h5>Online Users</h5>
        <ListGroup variant="flush">
          {onlineUsers.map((user) => (
            <ListGroup.Item
              key={user}
              active={selectedUser === user}
              onClick={() => setSelectedUser(user)}
            >
              {user}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>

      {selectedUser && (
        <div className="chat-section">
          <div className="chat-messages">
            {(messages[selectedUser] || []).map((msg, index) => (
              <div
                key={index}
                className={`chat-bubble ${msg.senderId === 'admin' ? 'admin-message' : 'user-message'}`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <div className="chat-input">
            <Form.Control
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <Button onClick={handleSendMessage}>Send</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminChatbox;
