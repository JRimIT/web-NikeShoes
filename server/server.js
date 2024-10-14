// server/server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const productRoutes = require('./routes/products'); // Import đúng router
const handleSocket = require('./sockets/chatSocket');

const app = express();
app.use(cors());
app.use(express.json());

// Khởi tạo HTTP server và Socket.IO server
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

// Gọi hàm xử lý socket
handleSocket(io);

// Sử dụng routes cho sản phẩm (middleware đúng)
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
