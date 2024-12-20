import React, { useState, useEffect, useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';
import './UserChatbox.scss';

const UserChatbox = () => {
  const { userId, userImage, senderImage } = useParams(); 
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const [newMessageCount, setNewMessageCount] = useState(0); 
  const [roleId, setRoleId] = useState(null); // Thêm state để lưu role_id
  const messagesEndRef = useRef(null);
  const socket = useRef(null);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      socket.current = io('http://localhost:5000', {
        auth: { token }
      });

      socket.current.on('connect', () => {
        console.log('Socket connected!');
        setIsAuthenticated(true); 
        socket.current.emit('user_login', { userId });
      });

      // Nhận role_id từ server
      socket.current.on('user_role', ({ role_id }) => {
        setRoleId(role_id); // Lưu role_id vào state
      });

      socket.current.on('receive_message', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
        if (!isOpen) {
          setNewMessageCount((prevCount) => prevCount + 1);
        }
      });

      return () => {
        socket.current.disconnect();
      };
    } else {
      setIsAuthenticated(false); 
    }
  }, [userId, isOpen]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = { receiverId: 'admin', text: newMessage, senderId: userId, senderImage };
      if (socket.current) {
        socket.current.emit('send_message', message);
        setMessages((prevMessages) => [...prevMessages, message]);
        setNewMessage('');
      }
    }
  };  

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleChatboxToggle = () => {
    setIsOpen((prevIsOpen) => {
      if (!prevIsOpen) setNewMessageCount(0);
      return !prevIsOpen;
    });
  };

  if (roleId !== 1) return null; // Ẩn chatbox nếu role_id khác 1

  return (
    <div className="floating-chatbox">
      {!isOpen && (
        <div className="chatbox-bubble" onClick={handleChatboxToggle}>
          <i className="bi bi-chat-dots"></i>
          {newMessageCount > 0 && <span className="new-message-count">{newMessageCount}</span>}
        </div>
      )}

      {isOpen && (
        <div className="chatbox-window">
          <div className="chatbox-header">
            <span>Chat with Admin</span>
            <Button variant="link" onClick={handleChatboxToggle} className="close-btn">×</Button>
          </div>

          <div className="chatbox-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`chat-bubble ${msg.senderId === userId ? 'user-message' : 'admin-message'}`}>
              {msg.senderId == 'admin' && (
          <img src={msg.senderImage || '/default-avatar.png'} alt="avatar" className="message-avatar" />
        )}
              {msg.text}
            </div>
          ))}

            <div ref={messagesEndRef} />
          </div>

          <div className="chatbox-input">
            <Form.Control
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <Button onClick={handleSendMessage}>Send</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserChatbox;
