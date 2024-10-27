// server/middlewares/authMiddlewares.js
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// Middleware xác thực JWT
const authenticateJWT = (req, res, next) => {
  const white_lists = ["/", "/register", "/login", "/api/reviews"];

  const authHeader = req.headers.authorization;
  // const isWhitelisted = white_lists.some(route => req.originalUrl.startsWith(route));
  console.log("Check authHead: ", authHeader);
  console.log("Check req: ", req.originalUrl);

  // if (isWhitelisted || req.originalUrl.startsWith('/api/reviews')) {
  //   return next(); // Allow access to whitelisted routes
  // }

  if (white_lists.includes(req.originalUrl) || req.originalUrl.startsWith('/api/reviews')) {
    return next(); // Allow access to whitelisted routes
  }
  console.log("Check req 2 : ", req.originalUrl);


  if (white_lists.includes(req.originalUrl)) {
    return next(); // Allow access to whitelisted routes
  }
  console.log("Check req: ", req.originalUrl);
  console.log("Check authHead: ", authHeader);


  if (authHeader) {
    const token = authHeader.split(' ')[1]; // Lấy token từ "Bearer <token>"

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
<<<<<<< HEAD
        return res.sendStatus(401).json({
          message: "Token is expired"
        });
        ; // Token không hợp lệ
=======
        if (err.name === 'TokenExpiredError') {
          // Token has expired, send a custom message
          return res.status(401).json({ message: "Token expired. Please login again." });
        }
        return res.status(403).json({ message: "Invalid token." });
>>>>>>> 5394466e2f357ff7d74e7a8ee2bd13000e5ac89b
      }
      req.user = user; // Lưu thông tin user sau khi giải mã token
      console.log("User: ", user);

      next(); // Tiếp tục đến route tiếp theo
    });
  } else {
    return res.sendStatus(401).json({
      message: "Not have access token!"
    }); // Không có token
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
    console.log("User role: ", userRole);

    if (roles.includes(userRole)) {
      next(); // Nếu role hợp lệ, tiếp tục xử lý
    } else {
      return res.status(403).json({ message: "Permission Denied" }); // Role không hợp lệ
    }
  });
};

module.exports = { authenticateJWT, checkRole };
