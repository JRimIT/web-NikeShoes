const express = require("express");
const router = express.Router();
const sendResetCode = require("../controller/sendResetCode");

// Route gửi mã reset qua email
router.post("/email/sendResetCode", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const resetCode = await sendResetCode(email); // Gọi hàm trực tiếp
    return res
      .status(200)
      .json({ resetCode, message: "Reset code sent successfully" });
  } catch (error) {
    console.error("Error sending reset code:", error);
    return res.status(500).json({ message: "Failed to send reset code" });
  }
});

module.exports = router;
