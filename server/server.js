// server/server.js
require("dotenv").config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const bodyParser = require("body-parser");
const multer = require("multer");
const bcrypt = require("bcryptjs");

const productRoutes = require('./routes/products'); // Import đúng router
const handleSocket = require('./sockets/chatSocket');
const { registerUser, loginUser } = require("./controller/authController");
const { getProducts, getProductById } = require("./controller/productController");
const sendResetPassword = require("./controller/sendResetCode");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Nơi lưu file
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Tên file
  },
});
const upload = multer({ storage: storage });

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

// Routes cho sản phẩm và các routes khác
app.use('/products', productRoutes); // Route cho sản phẩm
app.post("/register", registerUser);
app.post("/login", loginUser);
app.get("/products/:id", getProductById);
app.use(sendResetPassword); // Route cho reset password

// Cấu hình cors
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.options("*", cors()); // Cho phép tất cả các OPTIONS

// Lắng nghe server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
