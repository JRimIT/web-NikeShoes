import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail, validatePassword } from "../utils/validation";
import { toast } from "react-toastify"; // Import Toastify

const Login = () => {
  useEffect(() => {
    document.body.classList.add("login-background");

    return () => {
      document.body.classList.remove("login-background");
    };
  }, []);

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const emailError = validateEmail(email);
    if (emailError) {
      toast.error(emailError); // Hiển thị thông báo lỗi
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      toast.error(passwordError); // Hiển thị thông báo lỗi
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      if (response.data.message === "Login successful!") {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem(
          "sessionExpiration",
          new Date().getTime() + 10 * 60 * 1000
        );
        toast.success("Login successful!"); // Hiển thị thông báo thành công

        const roleId = response.data.user.role_id;
        if (roleId === 1) {
          navigate("/");
        } else if (roleId === 2) {
          navigate("/admin");
        }
      } else {
        toast.error(response.data.message); // Hiển thị thông báo lỗi
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      console.error(
        "Login error:",
        error.response ? error.response.data : error.message
      );
      toast.error(
        error.response
          ? error.response.data.message
          : "Something went wrong when logging in."
      ); // Hiển thị thông báo lỗi
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="wrapper">
      <div className="login_box">
        <div className="login-header">
          <span>LOGIN</span>
        </div>
        <form onSubmit={handleLogin}>
          <div className="input_box">
            <input
              type="email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="user" className="label">
              Email
            </label>
          </div>
          <div className="input_box">
            <input
              type="password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="pass" className="label">
              Password
            </label>
          </div>
          <div className="remember-forgot">
            <div className="remember-me">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember Me</label>
            </div>
            <Link to={`/forgot?email=${email}`} className="forgot-password">
              Forgot Password?
            </Link>
          </div>
          <div className="input_box">
            <input type="submit" className="input-submit" value="Login" />
          </div>
          <div className="register-container">
            <p>Don't have an account?</p>
            <Link to="/register" className="register">
              Register Now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
