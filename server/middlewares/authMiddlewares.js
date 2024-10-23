// server/middlewares/authMiddlewares.js
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// Middleware xác thực JWT
const authenticateJWT = (req, res, next) => {
    

  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1]; // Lấy token từ "Bearer <token>"
    
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Token không hợp lệ
      }
      req.user = user; // Lưu thông tin user sau khi giải mã token
      next(); // Tiếp tục đến route tiếp theo
    });
  } else {
    res.sendStatus(401); // Không có token
  }
};

// Middleware kiểm tra vai trò của user
const checkRole = (roles) => (req, res, next) => {
  const userId = req.user.id; // userId từ token đã giải mã

  // Lấy role từ DB
  db.query('SELECT role_id FROM Users WHERE user_id = ?', [userId], (err, result) => {
    if (err) {
      return res.status(500).send('Server Error');
    }

    if (result.length === 0) {
      return res.status(404).send('User not found');
    }

    const userRole = result[0].role_id;

    if (roles.includes(userRole)) {
      next(); // Nếu role hợp lệ, tiếp tục xử lý
    } else {
      return res.status(403).send('Permission Denied'); // Role không hợp lệ
    }
  });
};

module.exports = { authenticateJWT, checkRole };
