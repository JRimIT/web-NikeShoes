const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

// Setup server
const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', 
    methods: ['GET', 'POST'],
  },
});

let onlineUsers = {};
let adminSocketId = null; // To store admin's socket id

// Handle Socket.io connections
io.on('connection', (socket) => {
  console.log('New client connected: ' + socket.id);

  // User login handling
  socket.on('user_login', (data) => {
    const { userId } = data;

    if (userId === 'admin') {
      adminSocketId = socket.id; // Save the admin's socket ID separately
    } else {
      onlineUsers[userId] = socket.id;
    }

    io.emit('online_users', Object.keys(onlineUsers)); // Send list of online users
  });

  // Message sending
  socket.on('send_message', (message) => {
    const { receiverId, text, senderId } = message;

    // If the message is for admin
    if (receiverId === 'admin' && adminSocketId) {
      io.to(adminSocketId).emit('receive_message', { senderId, text });
    } else {
      // Message to a specific user
      const receiverSocketId = onlineUsers[receiverId];

      if (receiverSocketId) {
        io.to(receiverSocketId).emit('receive_message', { senderId, text });
      }
    }
  });

  // Handle user disconnect
  socket.on('disconnect', () => {
    console.log('Client disconnected: ' + socket.id);
    
    if (socket.id === adminSocketId) {
      adminSocketId = null; // Reset admin socket ID on disconnect
    } else {
      // Remove the disconnected user from the online list
      for (const userId in onlineUsers) {
        if (onlineUsers[userId] === socket.id) {
          delete onlineUsers[userId];
          break;
        }
      }
    }

    io.emit('online_users', Object.keys(onlineUsers)); // Update online users list
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
