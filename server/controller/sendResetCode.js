const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

router.post("/send-reset-code", async (req, res) => {
  const { email } = req.body;

  const resetCode = Math.floor(100000 + Math.random() * 900000).toString();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Reset your password",
    text: `Your reset code is: ${resetCode}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ code: resetCode });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send reset code" });
  }
});

module.exports = router;
