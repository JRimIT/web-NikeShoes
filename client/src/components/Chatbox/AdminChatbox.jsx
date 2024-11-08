import React, { useState, useEffect, useRef } from 'react';
import { ListGroup, Form, Button } from 'react-bootstrap';
import { io } from 'socket.io-client';
import './AdminChatbox.scss';
import { useParams } from 'react-router-dom';

const AdminChatbox = () => {
  const {userImage} = useParams();
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState({});
  const [newMessage, setNewMessage] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const chatEndRef = useRef(null);
  const socket = useRef(null);
 

  useEffect(() => {
    const token = localStorage.getItem('token'); 
  
    if (token) {
      socket.current = io('http://localhost:5000', { auth: { token } });
      
      socket.current.on('connect', () => {
        console.log('Admin socket connected!');
        setIsAuthenticated(true);
      });
      socket.current.on('online_users', (users) => {
        console.log("Danh sách người dùng online nhận từ server:", users);
        setOnlineUsers(Object.values(users));
      });
  
      socket.current.on('receive_message', (message) => {
        const { senderId, senderName, text, senderImage } = message;
        setMessages((prev) => ({
          ...prev,
          [senderId]: [...(prev[senderId] || []), { senderId, senderName, text, senderImage }],
        }));
      });
  
      return () => {
        socket.current.disconnect();
      };
    } else {
      setIsAuthenticated(false); 
    }
  }, []);
  
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages[selectedUser?.userId]]);

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedUser) {
      const message = { receiverId: selectedUser.userId, text: newMessage, senderId: 'admin', senderImage: userImage };
      if (socket.current) {
        socket.current.emit('send_message', message);
        setMessages((prev) => ({
          ...prev,
          [selectedUser.userId]: [...(prev[selectedUser.userId] || []), message],
        }));
        setNewMessage('');
      }
    }
  };
 
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSendMessage();
  };

  if (!isAuthenticated) return <p>Please log in as Admin to access the chat.</p>;

  return (
    <div className="admin-chatbox">
      <div className="user-list">
        <h5>Online Users ({onlineUsers.length})</h5>
        <ListGroup variant="flush">
          {onlineUsers.map((user) => (
            <ListGroup.Item
            key={user.userId}
            active={selectedUser?.userId === user.userId}
            onClick={() => {
              console.log("User được chọn:", user);
              setSelectedUser(user);
            }}
          >
            <img src={user.userImage || '/default-avatar.png'} alt="avatar" className="user-avatar" /> {/* Hiển thị link ảnh từ user_image */}
            {user.username}
          </ListGroup.Item>
          
          ))}
        </ListGroup>
      </div>

      {selectedUser && (
        <div className="chat-section">
          <div className="chat-messages">
    {(messages[selectedUser.userId] || []).map((msg, index) => (
      <div
        key={index}
        className={`chat-bubble ${msg.senderId === 'admin' ? 'admin-message' : 'user-message'}`}
      >
        {msg.senderId !== 'admin' && (
          <img src={msg.senderImage || '/default-avatar.png'} alt="avatar" className="message-avatar" />
        )}
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
              onKeyDown={handleKeyPress}
            />
            <Button onClick={handleSendMessage}>Send</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminChatbox;
