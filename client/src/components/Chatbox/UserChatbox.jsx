import React, { useState, useEffect, useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';
import './UserChatbox.scss';

const UserChatbox = () => {
  const { userId } = useParams(); // Lấy userId từ URL
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Trạng thái xác thực
  const messagesEndRef = useRef(null);
  const socket = useRef(null); // Sử dụng useRef để lưu socket
  
  useEffect(() => {
    const token = localStorage.getItem('token'); // Lấy JWT từ localStorage
    if (token) {
      // Kết nối socket với token để xác thực
      socket.current = io('http://localhost:5000', {
        auth: { token } // Gửi token qua socket auth
      });

      // Lắng nghe sự kiện kết nối thành công
      socket.current.on('connect', () => {
        console.log('Socket connected!');
        setIsAuthenticated(true); // Đã kết nối thành công
        socket.current.emit('user_login', { userId }); // Phát sự kiện login
      });

      // Nhận tin nhắn
      socket.current.on('receive_message', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      return () => {
        socket.current.disconnect(); // Ngắt kết nối khi component unmount
      };
    } else {
      setIsAuthenticated(false); // Không có token
    }
  }, [userId]);

  // Auto-scroll khi tin nhắn mới được thêm
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = { receiverId: 'admin', text: newMessage, senderId: userId };
      if (socket.current) {
        socket.current.emit('send_message', message); // Gửi tin nhắn qua socket
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

  return (
    <div className="floating-chatbox">
      {!isOpen && (
        <div className="chatbox-bubble" onClick={() => setIsOpen(true)}>
          <i className="bi bi-chat-dots"></i>
        </div>
      )}

      {isOpen && (
        <div className="chatbox-window">
          <div className="chatbox-header">
            <span>Chat with Admin</span>
            <Button variant="link" onClick={() => setIsOpen(false)} className="close-btn">×</Button>
          </div>

          <div className="chatbox-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-bubble ${msg.senderId === userId ? 'user-message' : 'admin-message'}`}>
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
