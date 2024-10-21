// server/server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const productRoutes = require('./routes/products'); // Import đúng router
const handleSocket = require('./sockets/chatSocket');
const cartRoutes = require('./routes/cart');
const wishlistRoutes = require('./routes/wishlist');
const reviewRoutes = require('./routes/review');

const app = express();
app.use(cors());
app.use(express.json());

// Khởi tạo HTTP server và Socket.IO server
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

// Gọi hàm xử lý socket
handleSocket(io);

// Sử dụng routes cho sản phẩm (middleware đúng)
app.use('/products', productRoutes);
app.use('/', cartRoutes); 
app.use('/', wishlistRoutes);
app.use('/', reviewRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
