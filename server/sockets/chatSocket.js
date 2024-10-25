const jwt = require('jsonwebtoken');
const db = require('../config/db');

let onlineUsers = {}; // Lưu thông tin người dùng online, với key là userId
let adminSocketId = null; // Lưu socketId của admin

const handleSocket = (io) => {
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;

    if (!token) {
      return next(new Error('Authentication error: No token provided'));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return next(new Error('Authentication error: Invalid token'));
      }

      const userId = decoded.id;

      db.query('SELECT user_id, username, role_id FROM Users WHERE user_id = ?', [userId], (err, result) => {
        if (err || result.length === 0) {
          return next(new Error('User not found or server error'));
        }

        const { user_id, username, role_id } = result[0];
        

        if (role_id === 2) { // Admin
          socket.userId = user_id;
          socket.username = username;
          socket.isAdmin = true;
          adminSocketId = socket.id;
          next();
        } else if (role_id === 1) { // User
          socket.userId = user_id;
          socket.username = username;
          socket.isAdmin = false;
          socket.role = role_id; // Thêm role vào socket
          
          
          // Lưu đầy đủ thông tin user vào onlineUsers
          onlineUsers[user_id] = { userId: user_id, socketId: socket.id, username: username };
          next();
        } else {
          return next(new Error('Permission denied: Invalid role'));
        }
      });
    });
  });

  io.on('connection', (socket) => {
    if (socket.isAdmin) {
      console.log(`Admin ${socket.userId} đã kết nối`);
      io.to(adminSocketId).emit('online_users', onlineUsers); // Gửi danh sách user online cho admin
    } else {
      console.log(`User ${socket.username} đã kết nối`);

      // Cập nhật danh sách online khi user kết nối (với userId đầy đủ)
      onlineUsers[socket.userId] = { userId: socket.userId, socketId: socket.id, username: socket.username };

      if (adminSocketId) {
        io.to(adminSocketId).emit('online_users', onlineUsers);
        console.log("Danh sách user online gửi tới admin:", onlineUsers);
      }
    }

    // Xử lý sự kiện gửi tin nhắn
    socket.on('send_message', (message) => {
      const { receiverId, text } = message;
      const senderId = socket.userId;
      const senderName = socket.username;

      console.log(`Tin nhắn từ ${senderId} tới ${receiverId}: ${text}`);

      if (receiverId === 'admin' && adminSocketId) {
        io.to(adminSocketId).emit('receive_message', { senderId, senderName, text });
        console.log(`Tin nhắn gửi tới admin từ ${senderName}`);
      } 
      else if (socket.isAdmin && onlineUsers[receiverId]) {
        io.to(onlineUsers[receiverId].socketId).emit('receive_message', { senderId: 'admin', senderName: 'Admin', text });
        console.log(`Tin nhắn gửi tới user ${receiverId} từ admin`);
      } else {
        console.error('Receiver is not online or does not exist.');
      }
    });

    socket.on('disconnect', () => {
      console.log(`Client ngắt kết nối: ${socket.username}`);
      if (socket.isAdmin) {
        adminSocketId = null;
      } else {
        delete onlineUsers[socket.userId];
        if (adminSocketId) {
          io.to(adminSocketId).emit('online_users', onlineUsers);
        }
      }
    });
  });
};

module.exports = handleSocket;
