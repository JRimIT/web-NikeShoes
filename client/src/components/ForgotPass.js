import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/ForgotPass.css";
import { validatePassword } from "../utils/validation";
import axios from "axios";

const ForgotPass = () => {
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(window.location.search);
  const initialEmail = searchParams.get("email") || ""; // Lấy email từ URL
  const [email, setEmail] = useState(initialEmail);
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");

  // Set background
  useEffect(() => {
    document.body.classList.add("forgot-background");
    return () => {
      document.body.classList.remove("forgot-background");
    };
  }, []);

  const handleSendCode = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/send-reset-code",
        { email }
      );
      setGeneratedCode(response.data.code);
      setSuccessMessage("Code has been sent to your email!");
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Failed to send the code. Please check your email.");
      setSuccessMessage("");
    }
  };

  // Gọi send code khi email thay đổi
  useEffect(() => {
    if (email) handleSendCode();
  }, [email]);

  const handleSave = async (e) => {
    e.preventDefault();
    if (code !== generatedCode) {
      setErrorMessage("Invalid code. Please try again.");
      return;
    }
    const passwordError = validatePassword(newPassword);
    if (passwordError) {
      setErrorMessage(passwordError);
      return;
    }
    try {
      await axios.post("http://localhost:5000/reset-password", {
        email,
        newPassword,
      });
      alert("Password has been successfully updated!");
      navigate("/login");
    } catch {
      setErrorMessage("Failed to reset password. Please try again.");
    }
  };

  const handleEditEmail = () => setIsEditingEmail(true);
  const handleCancelEditEmail = () => {
    setIsEditingEmail(false);
    setEmail(initialEmail);
  };
  const handleCancel = () => navigate("/login");

  return (
    <div className="wrapper">
      <div className="forgot-pass-box">
        <h2>Reset Password</h2>
        {isEditingEmail ? (
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-field"
            />
            <button onClick={handleSendCode} className="edit-btn">
              Send Code
            </button>
            <button onClick={handleCancelEditEmail} className="cancel-edit-btn">
              Cancel
            </button>
          </div>
        ) : (
          <p>
            We've sent a code to <strong>{email}</strong>
            <button
              type="button"
              className="edit-btn"
              onClick={handleEditEmail}
              style={{ marginLeft: "10px" }}
            >
              Edit Email
            </button>
          </p>
        )}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
        <form onSubmit={handleSave}>
          <div className="input_box">
            <input
              type="text"
              id="code"
              className="input-field"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
            <label htmlFor="code" className="label">
              Code*
            </label>
          </div>
          <div className="input_box">
            <input
              type="password"
              id="newPassword"
              className="input-field"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <label htmlFor="newPassword" className="label">
              New Password *
            </label>
            <small style={{ marginTop: "5px", display: "block" }}>
              Minimum of 8 characters. <br />
              Uppercase, lowercase letters, and one number.
            </small>
          </div>
          <div className="button-group">
            <button type="button" className="cancel-btn" onClick={handleCancel}>
              Cancel
            </button>
            <button type="submit" className="input-submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPass;