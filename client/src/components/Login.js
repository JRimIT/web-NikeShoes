import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail, validatePassword } from "../utils/validation";
import { toast } from "react-toastify";

const Login = () => {

  useEffect(() => {
    // Remember
    const savedEmail = localStorage.getItem("email");
    if (savedEmail) {
      setEmail(savedEmail);
    }
    document.body.classList.add("login-background");

    return () => {
      document.body.classList.remove("login-background");
    };
  }, []);

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(false);


  const handleLogin = async (e) => {
    e.preventDefault();

    // const emailError = validateEmail(email);
    // if (emailError) {
    //   setErrorMessage(emailError);
    //   return;
    // }

    // const passwordError = validatePassword(password);
    // if (passwordError) {
    //   setErrorMessage(passwordError);
    //   return;
    // }

    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      if (response.data.message === "Login successful!") {
        localStorage.setItem("token", response.data.token); // Lưu token vào localStorage
        localStorage.setItem("user", JSON.stringify(response.data.user));

        const rememberExpiration = rememberMe
          ? 1 * 24 * 60 * 60 * 1000
          : 1 * 60 * 1000;
        localStorage.setItem(
          "sessionExpiration",
          new Date().getTime() + 10 * 60 * 1000 + rememberExpiration
        );
        if (rememberMe) {
          localStorage.setItem("email", email);
        } else {
          localStorage.removeItem("email");
        }
        toast.success("Login successful!");
        // setSuccessMessage("Login successful!");
        setErrorMessage("");

        const roleId = response.data.user.role_id;
        if (roleId === 1) {
          navigate("/");
        } else if (roleId === 2) {
          navigate("/admins");
        } else if (roleId === 3) {
          navigate("/ship");
        } else if (roleId === 4) {
          navigate("/distributor");
        }
      } else {
        setErrorMessage(response.data.message);
        setSuccessMessage("");
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      console.error(
        "Login error:",
        error.response ? error.response.data : error.message
      );
      setErrorMessage(
        error.response
          ? error.response.data.message
          : "Something went wrong when logging in."
      );
      setSuccessMessage("");
      setEmail("");
      setPassword("");
    }
  };

  const handleCloseAlert = () => {
    setErrorMessage("");
    setSuccessMessage("");
  };

  return (
    <div className="wrapper">
      <div className="login_box">
        <div className="login-header">
          <span>LOGIN</span>
        </div>
        {(errorMessage || successMessage) && (
          <div
            className={`custom-alert ${errorMessage ? "error-alert" : "success-alert"
              }`}
          >
            {errorMessage || successMessage}
            <span className="alert-close" onClick={handleCloseAlert}>
              &times;
            </span>
          </div>
        )}
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
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                state
              />
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
