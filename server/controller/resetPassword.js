const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../config/db");
// const sendResetCode = require("./sendResetCode");

// const resetCodes = {}; // Tạm thời lưu trữ mã reset

// router.post("/send-reset-code", async (req, res) => {
//   const { email } = req.body;

//   // Kiểm tra xem email có tồn tại trong database không
//   const userExists = await db.query("SELECT * FROM users WHERE email = ?", [
//     email,
//   ]);

//   if (!userExists.length) {
//     return res.status(404).json({ message: "Email not found." });
//   }

//   try {
//     const resetCode = await sendResetCode(email); // Gửi mã và nhận mã
//     resetCodes[email] = resetCode; // Lưu mã vào bộ nhớ tạm thời
//     return res.status(200).json({ message: "Reset code sent successfully." });
//   } catch (error) {
//     return res.status(500).json({ message: "Error sending reset code." });
//   }
// });

router.post("/reset-password", async (req, res) => {
  const { email, code, newPassword } = req.body;

  if (resetCodes[email] && resetCodes[email] === code) {
    delete resetCodes[email]; // Xóa mã sau khi đã sử dụng
    try {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      db.query(
        "UPDATE users SET password = ? WHERE email = ?",
        [hashedPassword, email],
        (error) => {
          if (error) {
            return res.status(500).json({ error: "Failed to reset password." });
          }
          res.status(200).json({ message: "Password reset successful" });
        }
      );
    } catch (err) {
      console.error("Error resetting password:", err);
      res.status(500).json({ error: "Failed to reset password" });
    }
  } else {
    res.status(400).json({ error: "Invalid or expired reset code." });
  }
});

module.exports = router;
