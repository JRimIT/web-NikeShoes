const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
dotenv.config();

// Tạo transporter cho việc gửi email
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true cho 465, false cho các cổng khác
  auth: {
    user: process.env.SMTP_MAIL, // Địa chỉ email của bạn
    pass: process.env.SMTP_PASSWORD, // Mật khẩu email của bạn
  },
});

// Hàm tạo mã reset ngẫu nhiên gồm 6 chữ số
const generateResetCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Hàm gửi mã reset qua email
const sendResetCode = async (email) => {
  if (!email) {
    throw new Error("Email is required to send reset code.");
  }
  const resetCode = generateResetCode(); // Tạo mã reset

  const subject = "Password Reset Code";
  const message = `<p>Your password reset code is: <strong>${resetCode}</strong></p>`;

  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject: subject,
    html: message,
  };

  try {
    await transporter.sendMail(mailOptions); // Gửi email
    console.log("Reset code email sent successfully!");
    return resetCode; // Trả về mã đã tạo để sử dụng sau
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send reset code.");
  }
};

module.exports = sendResetCode;
