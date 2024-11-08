const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const sendResetCode = require("../controller/sendResetCode");
const db = require("../config/db");

router.post("/email/sendResetCode", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const resetCode = await sendResetCode(email);
    return res
      .status(200)
      .json({ resetCode, message: "Reset code sent successfully" });
  } catch (error) {
    console.error("Error sending reset code:", error);
    return res.status(500).json({ message: "Failed to send reset code" });
  }
});

router.post("/reset-password", async (req, res) => {
  const { email, code, newPassword } = req.body;

  if (!code) {
    return res.status(400).json({ error: "Reset code is required." });
  }

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    db.query(
      "UPDATE users SET password = ? WHERE email = ?",
      [hashedPassword, email],
      (error) => {
        if (error) {
          return res.status(500).json({ error: "Failed to update password." });
        }
        return res
          .status(200)
          .json({ message: "Password updated successfully." });
      }
    );
  } catch (error) {
    console.error("Error updating password:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
