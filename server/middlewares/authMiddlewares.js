// server/middlewares/authMiddlewares.js
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// Middleware xác thực JWT
// const authenticateJWT = (req, res, next) => {
//   const white_lists = ["/", "/register", "/login"];

//   const authHeader = req.headers.authorization;
//   const token = authHeader.split(' ')[1]; // Lấy token từ "Bearer <token>"
//   // const isWhitelisted = white_lists.some(route => req.originalUrl.startsWith(route));
//   console.log("Check authHead: ", authHeader);
//   console.log("Check req: ", req.originalUrl);

//   // if (isWhitelisted || req.originalUrl.startsWith('/api/reviews')) {
//   //   return next(); // Allow access to whitelisted routes
//   // }

//   if (white_lists.includes(req.originalUrl)) {
//     return next(); // Allow access to whitelisted routes
//   }

//   // Allow guest access to /api/reviews if no token is provided
//   if (req.originalUrl.startsWith('/api/reviews') && !authHeader) {
//     return next();
//   }
//   console.log("Check req 2 : ", req.originalUrl);


//   if (authHeader) {



//     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//       if (err) {
//         if (err.name === 'TokenExpiredError') {
//           // Token has expired, send a custom message
//           return res.status(401).json({ message: "Token expired. Please login again." });
//         }
//         return res.status(403).json({ message: "Invalid token." });
//       }
//       req.user = user; // Lưu thông tin user sau khi giải mã token
//       console.log("User: ", user);

//       next(); // Tiếp tục đến route tiếp theo
//     });
//   } else {
//     return res.sendStatus(401).json({
//       message: "Not have access token!"
//     }); // Không có token
//   }
// };
const authenticateJWT = (req, res, next) => {
  const white_lists = ["/", "/register", "/login"];
  const authHeader = req.headers.authorization;
  const token = authHeader.split(' ')[1];
  // Allow access to whitelisted routes
  if (white_lists.includes(req.originalUrl)) {
    return next();
  }

  // Allow guest access to /api/reviews if no token is provided
  if (req.originalUrl.startsWith('/api/reviews') && token === "null") {
    return next();
  }

  // Check if authHeader exists and contains a valid token format
  if (authHeader && authHeader.startsWith("Bearer ")) {


    if (token === "null" || !token) {  // Handle "Bearer null" or empty token
      return res.status(401).json({ message: "Invalid access token!" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ message: "Token expired. Please login again." });
        }
        return res.status(403).json({ message: "Invalid token." });
      }

      req.user = user; // Save user info in req.user
      console.log("Authenticated user:", user);

      next(); // Continue to the next route
    });
  } else {
    // No valid token format provided, return unauthorized
    return res.status(401).json({ message: "No access token provided!" });
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

const checkBlacklist = async (req, res, next) => {
  const userId = req.user?.id;
  if (!userId) {
    return next(); //(guest user)
  }

  try {
    const [rows] = await db.promise().query(`
      SELECT * FROM blacklist WHERE user_id = ?
      `, [userId]);

    if (rows.length > 0) {
      return res.status(403).json({ message: "BANED ,You can not access this website!" });
    }
    console.log("Blacklist check: ", userId);

    next(); // User is not banned; proceed

  } catch (error) {
    console.error("Lỗi khi kiểm tra blacklist:", error);
    res.status(500).json({ message: "Lỗi server khi kiểm tra blacklist." });
  }
}

module.exports = { authenticateJWT, checkRole, checkBlacklist, checkBlacklist };
