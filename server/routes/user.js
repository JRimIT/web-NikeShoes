const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../config/db");

// Lưu avatar
router.put("/avatar/:userId", async (req, res) => {
  const { userId } = req.params; // Lấy userId từ tham số đường dẫn
  const { user_image } = req.body; // Lấy URL ảnh từ body

  try {
    const query = "UPDATE Users SET user_image = ? WHERE user_id = ?";
    await db.query(query, [user_image, userId]);
    res.status(200).json({ message: "Avatar updated successfully" });
  } catch (error) {
    console.error("Error updating avatar:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Tìm người dùng theo ID
function findUserById(userId) {
  const query = "SELECT * FROM Users WHERE user_id = ?";
  return new Promise((resolve, reject) => {
    db.query(query, [userId], (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve(results[0]);
    });
  });
}

// Tìm địa chỉ theo userId
function findAddressByUserId(userId) {
  const query = "SELECT * FROM User_Addresses WHERE user_id = ?";
  return new Promise((resolve, reject) => {
    db.query(query, [userId], (error, results) => {
      if (error) {
        return reject(error);
      }
      // resolve(results[0]);
      console.log(results); // In kết quả ra console
      resolve(results.length > 0 ? results[0] : null); // Kiểm tra nếu có kết quả
    });
  });
}

// Lấy hồ sơ người dùng không có mật khẩu
router.get("/profile/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const query = `
      SELECT u.user_id, u.username, u.email, u.phone, ua.address_line, ua.city, ua.state, ua.country, ua.postal_code
      FROM Users u
      LEFT JOIN User_Addresses ua ON u.user_id = ua.user_id
      WHERE u.user_id = ?`;

    db.query(query, [userId], (error, results) => {
      if (error) {
        console.error("Error fetching user profile:", error);
        return res
          .status(500)
          .json({ message: "Failed to fetch user profile." });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "User not found." });
      }

      // Trả về thông tin người dùng
      res.status(200).json(results[0]);
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Failed to fetch user profile." });
  }
});
// Lấy địa chỉ của người dùng
router.get("/address/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const address = await findAddressByUserId(userId);

    if (!address) {
      return res.status(404).json({ message: "Address not found." });
    }

    res.status(200).json(address);
  } catch (error) {
    console.error("Error fetching address:", error);
    res.status(500).json({ message: "Failed to fetch address." });
  }
});

// Cập nhật địa chỉ
router.put("/address/update/:userId", async (req, res) => {
  const { addressLine, city, state, country, postalCode } = req.body;

  try {
    const address = await findAddressByUserId(req.params.userId);

    if (!address) {
      return res.status(404).json({ message: "Address not found." });
    }

    const updateQuery = `
      UPDATE User_Addresses SET 
      address_line = ?, city = ?, state = ?, country = ?, postal_code = ?
      WHERE user_id = ?`;

    db.query(
      updateQuery,
      [addressLine, city, state, country, postalCode, req.params.userId],
      (error, results) => {
        if (error) {
          console.error("Error updating address:", error);
          return res.status(500).json({ message: "Failed to update address." });
        }
        res.status(200).json({ message: "Address updated successfully." });
      }
    );
  } catch (error) {
    console.error("Error updating address:", error);
    res.status(500).json({ message: "Failed to update address." });
  }
});

// Update Username
router.put("/username/:userId", async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ message: "Username is required." });
  }

  try {
    const user = await findUserById(req.params.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const updateQuery = "UPDATE Users SET username = ? WHERE user_id = ?";
    db.query(updateQuery, [username, req.params.userId], (error, results) => {
      console.log("Results from DB:", results);

      if (error) {
        console.error("Error updating username:", error);
        return res.status(500).json({ message: "Failed to update username." });
      }

      if (results.affectedRows === 0) {
        return res
          .status(404)
          .json({ message: "User not found or username unchanged." });
      }

      res.status(200).json({ message: "Username updated successfully." });
    });
  } catch (error) {
    console.error("Error updating username:", error);
    res.status(500).json({ message: "Failed to update username." });
  }
});
// Save phone
router.put("/phone/:userId", async (req, res) => {
  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({ message: "Phone number is required." });
  }

  try {
    const user = await findUserById(req.params.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const updateQuery = "UPDATE Users SET phone = ? WHERE user_id = ?";
    db.query(updateQuery, [phone, req.params.userId], (error, results) => {
      if (error) {
        console.error("Error updating phone number:", error);
        return res
          .status(500)
          .json({ message: "Failed to update phone number." });
      }

      if (results.affectedRows === 0) {
        return res
          .status(404)
          .json({ message: "User not found or phone number unchanged." });
      }

      res.status(200).json({ message: "Phone number updated successfully." });
    });
  } catch (error) {
    console.error("Error updating phone number:", error);
    res.status(500).json({ message: "Failed to update phone number." });
  }
});

// Kiểm tra mật khẩu
router.post("/checkPassword/:userId", async (req, res) => {
  const { currentPassword } = req.body;
  const userId = req.params.userId;

  try {
    const user = await findUserById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    console.log("Current Password Entered: ", currentPassword);
    console.log("Stored Hashed Password: ", user.password);
    const match = await bcrypt.compare(currentPassword, user.password);
    console.log("Password Match: ", match);

    if (!match) {
      return res
        .status(400)
        .json({ message: "Current password is incorrect." });
    }

    res.status(200).json({ message: "Password is correct." });
  } catch (error) {
    console.error("Error checking password:", error);
    res.status(500).json({ message: "Failed to check password." });
  }
});

// Cập nhật mật khẩu
router.put("/password/update/:userId", async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await findUserById(req.params.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Verify current password
    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match) {
      return res
        .status(400)
        .json({ message: "Current password is incorrect." });
    }

    // Hash the new password and update
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updateQuery = "UPDATE Users SET password = ? WHERE user_id = ?";
    db.query(
      updateQuery,
      [hashedPassword, req.params.userId],
      (error, results) => {
        if (error) {
          console.error("Error updating password:", error);
          return res
            .status(500)
            .json({ message: "Failed to update password." });
        }
        res.status(200).json({ message: "Password updated successfully." });
      }
    );
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ message: "Failed to update password." });
  }
});

module.exports = router;
