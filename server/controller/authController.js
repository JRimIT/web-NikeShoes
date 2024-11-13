const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const upload = require("../middlewares/multer"); // Import cấu hình multer
// Function Register
const registerUser = (req, res) => {
  console.log("Received registration data:", req.body);

  console.log("Received file data:", req.file); // Debugging

  const {
    username,
    email,
    password,
    phone,
    role_id = 1,
    addressLine,
    city,
    state,
    country,
    postalCode,
  } = req.body;
  const user_image = req.file
    ? req.file.path
    : "https://i.pinimg.com/236x/e8/d7/d0/e8d7d05f392d9c2cf0285ce928fb9f4a.jpg";

  // Check Mail exist
  db.query("SELECT * FROM Users WHERE email = ?", [email], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send({ message: "Errors server" });
    }
    if (result.length > 0) {
      return res.status(400).send({ message: "Email has exist" });
    }

    // Password encryption
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error("Error hashing password:", err);
        return res.status(500).send({ message: "Error register" });
      }

      // Add user
      db.query(
        "INSERT INTO Users (user_image, username, email, password, phone, role_id) VALUES (?, ?, ?, ?, ?, ?)",
        [user_image, username, email, hashedPassword, phone, role_id],
        (err, result) => {
          if (err) {
            console.log("Error during registration:", err);
            return res.status(500).send({ message: "Error register" });
          }

          // Get the user_id of the newly added user
          const userId = result.insertId;

          // Add User_Addresses
          db.query(
            "INSERT INTO User_Addresses (user_id, address_line, city, state, country, postal_code) VALUES (?, ?, ?, ?, ?, ?)",
            [userId, addressLine, city, state, country, postalCode],
            (err) => {
              if (err) {
                console.log("Error adding address:", err);
                return res
                  .status(500)
                  .send({ message: "Error adding address" });
              }
              res.status(201).send({ message: "Register successful!" });
            }
          );
        }
      );
    });
  });
};

// Function Login
const loginUser = (req, res) => {
  const { email, password } = req.body;

  console.log("Login attempt with:", { email, password });

  db.query("SELECT * FROM Users WHERE email = ?", [email], (err, result) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).send({ message: "Errors server" });
    }
    if (result.length === 0) {
      return res.status(400).send({ message: "Email doesn't exist!" });
    }

    const user = result[0];

    // Compare password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error("Error comparing passwords:", err);
        return res.status(500).send({ message: "Error logging in" });
      }
      if (!isMatch) {
        console.log(password);
        console.log(user.password);
        return res.status(400).send({ message: "Wrong password!" });
      }

      // Login successful
      const token = jwt.sign({ id: user.user_id }, process.env.JWT_SECRET, {
        // expiresIn: 5,
        expiresIn: "1h",
      });
      console.log("Token nhận từ header:", token);

      res.send({ message: "Login successful!", user, token });
    });
  });
};

module.exports = { registerUser, loginUser };
