// server/sockets/chatSocket.js
const onlineUsers = {}; // Biến lưu người dùng online
let adminSocketId = null; // Lưu socket ID của admin

const handleSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('New client connected: ' + socket.id);

    // Xử lý user login
    socket.on('user_login', (data) => {
      const { userId } = data;

      if (userId === 'admin') {
        adminSocketId = socket.id;
      } else {
        onlineUsers[userId] = socket.id;
      }

      io.emit('online_users', Object.keys(onlineUsers));
    });

    // Xử lý gửi tin nhắn
    socket.on('send_message', (message) => {
      const { receiverId, text, senderId } = message;

      if (receiverId === 'admin' && adminSocketId) {
        io.to(adminSocketId).emit('receive_message', { senderId, text });
      } else if (onlineUsers[receiverId]) {
        io.to(onlineUsers[receiverId]).emit('receive_message', { senderId, text });
      }
    });

    // Xử lý khi user disconnect
    socket.on('disconnect', () => {
      console.log('Client disconnected: ' + socket.id);

      if (socket.id === adminSocketId) {
        adminSocketId = null;
      } else {
        for (const userId in onlineUsers) {
          if (onlineUsers[userId] === socket.id) {
            delete onlineUsers[userId];
            break;
          }
        }
      }

      io.emit('online_users', Object.keys(onlineUsers));
    });
  });
};

module.exports = handleSocket;
