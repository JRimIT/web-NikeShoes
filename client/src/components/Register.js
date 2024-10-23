import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/styles/Register.css";
import { Link, useNavigate } from "react-router-dom";
import {
  validateEmail,
  validatePassword,
  validatePhoneNumber,
} from "../utils/validation";

const Register = () => {
  useEffect(() => {
    document.body.classList.add("login-background");

    return () => {
      document.body.classList.remove("login-background");
    };
  }, []);

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [user_image, setUserImage] = useState(null);
  const [role_id] = useState(1); // Default 1
  const [errorMessage, setErrorMessage] = useState("");
  const [previewImage, setPreviewImage] = useState(null); // Thêm state cho preview

  const handlePreviewImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUserImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result); // Lưu trữ ảnh đã preview
      };
      reader.readAsDataURL(file);
    }
  };
  const handleRegister = async (e) => {
    e.preventDefault();

    const emailError = validateEmail(email);
    if (emailError) {
      setErrorMessage(emailError);
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      setErrorMessage(passwordError);
      return;
    }

    const phoneError = validatePhoneNumber(phone);
    if (phoneError) {
      setErrorMessage(phoneError);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("phone", phone);
      formData.append("addressLine", addressLine);
      formData.append("city", city);
      formData.append("state", state);
      formData.append("country", country);
      formData.append("postalCode", postalCode);
      if (user_image) {
        formData.append("user_image", user_image); // Append the image file
      }
      console.log("Form data to be sent:", formData); // Debugging

      const response = await axios.post(
        "http://localhost:5000/register",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert(response.data.message);
      if (response.data.message === "Register successful!") {
        navigate("/login");
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="wrapper">
      <div className="login_box">
        <div className="login-header">
          <span>SIGN UP</span>
        </div>
        {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
        <form onSubmit={handleRegister}>
          <div className="input_box">
            <input
              type="text"
              className="input-field"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label htmlFor="username" className="label">
              Username
            </label>
          </div>
          <div className="input_box">
            <input
              type="email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="email" className="label">
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
            <label htmlFor="password" className="label">
              Password
            </label>
          </div>
          <div className="input_box">
            <input
              type="text"
              className="input-field"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <label htmlFor="phone" className="label">
              Phone
            </label>
          </div>
          {/* Address */}
          <div className="input_box">
            <input
              type="text"
              className="input-field"
              value={addressLine}
              onChange={(e) => setAddressLine(e.target.value)}
            />
            <label htmlFor="address" className="label">
              Address Line
            </label>
          </div>
          <div className="input_box">
            <input
              type="text"
              className="input-field"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <label htmlFor="city" className="label">
              City
            </label>
          </div>
          <div className="input_box">
            <input
              type="text"
              className="input-field"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
            <label htmlFor="state" className="label">
              State
            </label>
          </div>
          <div className="input_box">
            <input
              type="text"
              className="input-field"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
            <label htmlFor="country" className="label">
              Country
            </label>
          </div>

          <div className="input_box">
            <input type="submit" className="input-submit" value="Register" />
          </div>
          <div className="register-container">
            <p>Already have an account?</p>
            <Link to="/login" className="register">
              Login Now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
