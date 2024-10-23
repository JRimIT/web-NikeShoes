import React, { useState, useEffect, useRef } from 'react';
import { ListGroup, Form, Button } from 'react-bootstrap';
import { io } from 'socket.io-client';
import './AdminChatbox.scss';

const AdminChatbox = () => {
  const [onlineUsers, setOnlineUsers] = useState([]); // Danh sách user online
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState({});
  const [newMessage, setNewMessage] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Trạng thái xác thực admin
  const chatEndRef = useRef(null);
  const socket = useRef(null); // Sử dụng useRef để lưu socket

  useEffect(() => {
    const token = localStorage.getItem('token'); // Lấy JWT token từ localStorage

    if (token) {
      // Kết nối socket với token để xác thực admin
      socket.current = io('http://localhost:5000', {
        auth: { token }, // Gửi token qua socket auth
      });

      // Khi kết nối thành công
      socket.current.on('connect', () => {
        console.log('Admin socket connected!');
        setIsAuthenticated(true); // Xác thực thành công
        socket.current.emit('user_login', { userId: 'admin' }); // Phát sự kiện đăng nhập admin
      });

      // Lắng nghe sự kiện khi có user online
      socket.current.on('online_users', (users) => {
        setOnlineUsers(users); // Cập nhật danh sách người dùng online
      });

      // Lắng nghe sự kiện nhận tin nhắn
      socket.current.on('receive_message', (message) => {
        const { senderId, text } = message;
        console.log('Received message from user:', message);
        console.log('SenderId:', senderId); // Kiểm tra giá trị senderId
      
        if (!senderId) {
          console.error('Error: senderId is undefined');
          return; // Ngăn chặn nếu senderId bị undefined
        }
      
        setMessages((prev) => {
          const updatedMessages = {
            ...prev,
            [senderId]: [...(prev[senderId] || []), { senderId, text }],
          };
          console.log('Updated messages:', updatedMessages);
          return updatedMessages;
        });
      });
      
      return () => {
        socket.current.disconnect(); // Ngắt kết nối khi unmount
      };
    } else {
      setIsAuthenticated(false); // Nếu không có token
    }
  }, []);

  // Auto-scroll xuống cuối mỗi khi tin nhắn mới được thêm vào
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages[selectedUser]]);

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedUser) {
      const message = { receiverId: selectedUser, text: newMessage, senderId: 'admin' };
      if (socket.current) {
        socket.current.emit('send_message', message); // Gửi tin nhắn qua socket
        setMessages((prev) => ({
          ...prev,
          [selectedUser]: [...(prev[selectedUser] || []), message],
        }));
        setNewMessage(''); // Xóa tin nhắn sau khi gửi
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage(); // Gửi tin nhắn khi nhấn Enter
    }
  };

  if (!isAuthenticated) {
    return <p>Please log in as Admin to access the chat.</p>; // Yêu cầu đăng nhập nếu chưa xác thực
  }

  return (
    <div className="admin-chatbox">
      <div className="user-list">
        <h5>Online Users ({onlineUsers.length})</h5> {/* Hiển thị tổng số user */}
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
              onKeyDown={handleKeyPress} // Thêm sự kiện keypress cho Enter
            />
            <Button onClick={handleSendMessage}>Send</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminChatbox;
