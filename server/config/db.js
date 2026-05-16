// server/config/db.js
const mysql = require("mysql2");

const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "02111109",
  database: process.env.DB_NAME || "Nike",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Kiểm tra kết nối
db.getConnection((err, connection) => {
  if (err) {
    console.error(`Error connecting to MySQL database at ${process.env.DB_HOST || "localhost"}:`, err);
  } else {
    console.log(`Connected to MySQL database at ${process.env.DB_HOST || "localhost"}.`);
    connection.release();
  }
});

module.exports = db;
