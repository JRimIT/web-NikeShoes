const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../config/db");

router.post("/reset-password", async (req, res) => {
  const { email, code, newPassword } = req.body;

  if (resetCodes[email] && resetCodes[email] === code) {
    delete resetCodes[email]; // Delete code when had used
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
