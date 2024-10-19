// server.js
require("dotenv").config();

const bcrypt = require("bcryptjs");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
// const path = require("path");
const { registerUser, loginUser } = require("./controller/authController");
const {
  getProducts,
  getProductById,
} = require("./controller/productController");
const sendResetPassword = require("./controller/sendResetCode");

const db = require("./db");
const app = express();

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

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.options("*", cors()); // Cho phép tất cả các OPTIONS

app.use(bodyParser.json());

app.post("/register", registerUser);
app.post("/login", loginUser);
app.use(sendResetPassword);
app.get("/products/:id", getProductById);

// START server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server run on ${PORT}`);
});
