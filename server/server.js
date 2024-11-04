// server/server.js
require("dotenv").config();
const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const bcrypt = require("bcryptjs");
const { registerUser, loginUser } = require("./controller/authController");
const sendResetPassword = require("./controller/sendResetCode");
const resetPassword = require("./controller/resetPassword");
const authRoutes = require("./routes/auth"); // Import route auth.js

const db = require("./config/db");
const productRoutes = require("./routes/products"); // Import đúng router
const handleSocket = require("./sockets/chatSocket");
const cartRoutes = require("./routes/cart");
const wishlistRoutes = require("./routes/wishlist");
const reviewRoutes = require("./routes/review");
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");
const {
  authenticateJWT,
  checkRole,
  checkBlacklist,
} = require("./middlewares/authMiddlewares");
const cron = require("node-cron");
const axios = require("axios");
const routerAPI = express.Router();

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// routerAPI.all("*", authenticateJWT);

// Gọi hàm xử lý socket
handleSocket(io);

// Routes cho sản phẩm và các routes khác
app.get("/", (req, res) => {
  res.json("Hello This is Backend");
});
app.use("/products", productRoutes);
app.post("/register", upload.single("user_image"), registerUser);
app.post("/login", loginUser);

// app.get("/products/:id", getProductById);
// app.use(sendResetPassword); // Route cho reset password
// Sử dụng routes cho sản phẩm (middleware đúng)
// app.use("/', cartRoutes);
// // app.use('/", cartRoutes);
// app.use('/', wishlistRoutes);
// app.use("/", reviewRoutes);
app.use("/api", sendResetPassword); // Route gửi mã reset password
app.use("/api", resetPassword); // Route đặt lại mật khẩu
app.use("/auth", authRoutes);

// app.use('/', adminRoutes);
app.use("/", authenticateJWT, checkBlacklist);
app.use("/", authenticateJWT, cartRoutes); // Cart routes require authentication
app.use("/", authenticateJWT, wishlistRoutes); // Wishlist routes require authentication
app.use("/", authenticateJWT, reviewRoutes); // Review routes require authentication
app.use("/api/user", authenticateJWT, userRoutes); // Review routes require authentication
app.use("/", authenticateJWT, checkRole("2"), adminRoutes); // Admin routes require authentication

// app.use("/api/user", userRoutes);

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
