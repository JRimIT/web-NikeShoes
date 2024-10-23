const jwt = require('jsonwebtoken');
const db = require('../config/db');

let onlineUsers = {}; // Lưu thông tin người dùng online (key là userId, value là socketId)
let adminSocketId = null; // Lưu socketId của admin

const handleSocket = (io) => {
  // Middleware xác thực JWT khi kết nối socket
  io.use((socket, next) => {
    const token = socket.handshake.auth.token; // Lấy token từ socket auth

    if (!token) {
      return next(new Error('Authentication error: No token provided'));
    }

    // Xác thực token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return next(new Error('Authentication error: Invalid token'));
      }

      const userId = decoded.id; // Lấy userId từ token đã giải mã

      // Kiểm tra role của user từ database
      db.query('SELECT role_id FROM Users WHERE user_id = ?', [userId], (err, result) => {
        if (err || result.length === 0) {
          return next(new Error('User not found or server error'));
        }

        const userRole = result[0].role_id;

        // Nếu là Admin (role_id = 2)
        if (userRole === 2) {
          socket.userId = userId;
          socket.isAdmin = true; // Đánh dấu là admin
          adminSocketId = socket.id; // Lưu socketId của admin
          next(); // Cho phép kết nối
        } 
        // Nếu là User (role_id = 1)
        else if (userRole === 1) {
          socket.userId = userId;
          socket.isAdmin = false; // Không phải admin
          onlineUsers[userId] = socket.id; // Lưu socketId của user
          next(); // Cho phép kết nối
        } else {
          return next(new Error('Permission denied: Invalid role'));
        }
      });
    });
  });

  // Khi kết nối thành công
  io.on('connection', (socket) => {
    if (socket.isAdmin) {
      console.log(`Admin ${socket.userId} connected to chat`);
      // Gửi danh sách user online cho admin
      io.to(adminSocketId).emit('online_users', Object.keys(onlineUsers));
    } else {
      console.log(`User ${socket.userId} connected to chat`);
    }

    // Xử lý gửi tin nhắn từ client
    socket.on('send_message', (message) => {
      const { receiverId, text } = message;
      const senderId = socket.userId; // Lấy senderId từ socket đã xác thực


      // Nếu tin nhắn gửi tới admin
      if (receiverId === 'admin' && adminSocketId) {
        io.to(adminSocketId).emit('receive_message', { senderId, text });
      } 
      // Nếu tin nhắn từ admin tới user
      else if (socket.isAdmin && onlineUsers[receiverId]) {
        io.to(onlineUsers[receiverId]).emit('receive_message', { senderId: 'admin', text });
      } else {
        console.error('Receiver is not online or does not exist.');
      }
      
    });

    // Khi user hoặc admin disconnect
    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.userId}`);
      if (socket.isAdmin) {
        adminSocketId = null; // Admin ngắt kết nối
      } else {
        delete onlineUsers[socket.userId]; // Xóa user khỏi danh sách online
        // Cập nhật danh sách người dùng online cho admin
        if (adminSocketId) {
          io.to(adminSocketId).emit('online_users', Object.keys(onlineUsers));
        }
      }
    });
  });
};

module.exports = handleSocket;
