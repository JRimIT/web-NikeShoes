// import React, { useState, useEffect, useRef } from 'react';
// import { Button, Form } from 'react-bootstrap';
// import { io } from 'socket.io-client';
// import './UserChatbox.scss';

// const socket = io('http://localhost:5000'); // Replace with your backend URL if necessary

// const UserChatbox = ({ userId }) => {
//   const [isOpen, setIsOpen] = useState(false); // To toggle chatbox
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');
//   const messagesEndRef = useRef(null); // For auto-scrolling
//   const [error, setError] = useState(null); // For error handling

//   // Initialize connection and handle incoming messages
//   useEffect(() => {
//     socket.emit('user_login', { userId });

//     socket.on('receive_message', (message) => {
//       setMessages((prevMessages) => [...prevMessages, message]);
//       scrollToBottom(); // Scroll to the latest message
//     });

//     socket.on('connect_error', () => {
//       setError('Connection error. Please try again later.');
//     });

//     return () => {
//       socket.off('receive_message'); // Clean up the listener
//       socket.disconnect(); // Close socket connection when component unmounts
//     };
//   }, [userId]);

//   // Auto-scroll to the bottom of the messages
//   const scrollToBottom = () => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   // Handle message sending
//   const handleSendMessage = () => {
//     if (newMessage.trim()) {
//       const message = { receiverId: 'admin', text: newMessage, senderId: userId };
      
//       // Send the message via socket
//       socket.emit('send_message', message, (ack) => {
//         if (!ack.success) {
//           setError('Failed to send message. Try again.');
//         }
//       });

//       // Update the local messages
//       setMessages((prevMessages) => [...prevMessages, message]);
//       setNewMessage('');
//       setError(null); // Clear error on success
//       scrollToBottom(); // Scroll to the bottom after sending
//     }
//   };

//   // Handle pressing Enter key to send a message
//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       e.preventDefault();
//       handleSendMessage(); // Send the message when pressing Enter
//     }
//   };

//   return (
//     <div className="floating-chatbox">
//       {!isOpen && (
//         <div className="chatbox-bubble" onClick={() => setIsOpen(true)}>
//           <i className="bi bi-chat-dots"></i> {/* Bootstrap icon for chat */}
//         </div>
//       )}

//       {isOpen && (
//         <div className="chatbox-window">
//           <div className="chatbox-header">
//             <span>Chat with Admin</span>
//             <Button variant="link" onClick={() => setIsOpen(false)} className="close-btn">×</Button>
//           </div>

//           <div className="chatbox-messages">
//             {messages.map((msg, index) => (
//               <div key={index} className={`chat-bubble ${msg.senderId === userId ? 'user-message' : 'admin-message'}`}>
//                 {msg.text}
//               </div>
//             ))}
//             {/* The reference element to scroll into view */}
//             <div ref={messagesEndRef} />
//           </div>

//           <div className="chatbox-input">
//             {error && <div className="error-message">{error}</div>}
//             <Form.Control
//               type="text"
//               placeholder="Type a message... (Press Enter to send)"
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//               onKeyDown={handleKeyPress}
//             />
//             <Button
//               onClick={handleSendMessage}
//               disabled={!newMessage.trim()} // Disable button when message is empty
//             >
//               Send
//             </Button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserChatbox;
import React, { useState, useEffect, useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom'; // Import useParams to get userId from URL
import './UserChatbox.scss';

const socket = io('http://localhost:5000'); // Replace with your backend URL if necessary

const UserChatbox = () => {
  const { userId } = useParams(); // Get userId from the URL
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  // Initialize connection and handle incoming messages
  useEffect(() => {
    socket.emit('user_login', { userId });

    socket.on('receive_message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId]);

  // Auto-scroll to the bottom of the messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = { receiverId: 'admin', text: newMessage, senderId: userId };
      socket.emit('send_message', message);
      setMessages((prevMessages) => [...prevMessages, message]);
      setNewMessage('');
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
