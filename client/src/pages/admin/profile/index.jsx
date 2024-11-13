import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  IconButton,
  Box,
  Typography,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { FaCamera } from "react-icons/fa";
import {
  validatePassword,
  validatePhoneNumber,
  validateUsername,
} from "../../../utils/validation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../../../utils/axios.customize";

function AdminProfile() {
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState("");
  const [isEditingImage, setIsEditingImage] = useState(false);
  const [address, setAddress] = useState({
    addressLine: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
  });

  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState({
    phone: "",
    password: "",
  });

  // Fetch info from localStorage and address from db
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUser(userData);
      setProfileImage(userData.user_image || "");
      setUserInfo({
        username: userData.username || "",
        email: userData.email || "",
        phone: userData.phone || "",
        password: "",
      });
      const fetchAddress = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/user/address/${userData.user_id}`
          );
          setAddress({
            addressLine: response.data.address_line,
            city: response.data.city,
            state: response.data.state,
            country: response.data.country,
            postalCode: response.data.postal_code,
          });
        } catch (error) {
          console.error("Error fetching address:", error);
        }
      };

      fetchAddress();
    } else {
      console.error("No user data found in localStorage");
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
      setSelectedFile(file);
    }
  };

  const handleUploadAvatarImage = async () => {
    const CLOUD_NAME = "dzbhzlwoe";
    const PRESET_NAME = "maeqzsyj";
    const FOLDER_NAME = "Avatar_image";

    const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

    const formData = new FormData();
    formData.append("upload_preset", PRESET_NAME);
    formData.append("folder", FOLDER_NAME);
    formData.append("file", selectedFile);

    try {
      const res = await axios.post(api, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const imageUrl = res.data.url;

      setProfileImage(res.data.url);
      setIsEditingImage(false);
      toast.success("Avatar uploaded successfully!");
      const updatedUser = { ...user, user_image: res.data.url };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      const userId = user?.user_id;
      await axios.put(`http://localhost:5000/api/user/avatar/${userId}`, {
        user_image: imageUrl,
      });
    } catch (err) {
      // toast.error("Please choose picture to upload avatar.");
    }
  };

  const handleUserInfoChange = (e) => {
    const { name, value } = e.target;
    if (name in address) {
      setAddress((prevState) => ({ ...prevState, [name]: value }));
    } else {
      setUserInfo((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    if (name === "newPassword") setNewPassword(value);
    if (name === "currentPassword") setCurrentPassword(value);
    if (name === "confirmPassword") setConfirmPassword(value);
  };
  // Save address
  const saveChanges = async () => {
    const userId = user?.user_id;
    if (!userId) {
      console.error("User ID is not defined.");
      return;
    }

    try {
      await axios.put(
        `http://localhost:5000/api/user/address/update/${userId}`,
        address
      );
      toast.success("Delivery address updated successfully!");
    } catch (error) {
      console.error("Error saving delivery address:", error);
      toast.error("Failed to update delivery address.");
    }
  };

  // Save Username
  const saveUsername = async () => {
    const errors = validateUsername(userInfo.username);
    if (errors) {
      setValidationErrors((prev) => ({ ...prev, username: errors }));
      toast.error(errors);
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/api/user/username/${user?.user_id}`,
        { username: userInfo.username }
      );

      if (response.status === 200) {
        toast.success("Username updated successfully!");

        // Reup new info
        setUser((prev) => ({
          ...prev,
          username: userInfo.username,
        }));
        const updatedUser = { ...user, username: userInfo.username };
        localStorage.setItem("user", JSON.stringify(updatedUser));
      } else {
        toast.error("Failed to update username.");
      }
    } catch (error) {
      console.error("Error updating username:", error);
      toast.error("Failed to update username. Please try again.");

      // Check Error
      if (error.response) {
        if (error.response.status === 404) {
          toast.error("User not found. Please check the user ID.");
        } else if (error.response.status === 500) {
          toast.error("Server error. Please try again later.");
        } else {
          toast.error("An unexpected error occurred.");
        }
      }
    }
  };
  // Save phone
  const savePhone = async () => {
    // Check validate
    const errors = validatePhoneNumber(userInfo.phone);
    if (errors) {
      setValidationErrors((prev) => ({ ...prev, phone: errors }));
      toast.error(errors);
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/api/user/phone/${user?.user_id}`,
        { phone: userInfo.phone }
      );

      if (response.status === 200) {
        toast.success("Phone number updated successfully!");

        // Reup info
        setUser((prev) => ({
          ...prev,
          phone: userInfo.phone,
        }));
        const updatedUser = { ...user, phone: userInfo.phone };
        localStorage.setItem("user", JSON.stringify(updatedUser));
      } else {
        toast.error("Failed to update phone number.");
      }
    } catch (error) {
      console.error("Error updating phone:", error);
      toast.error("Failed to update phone number. Please try again.");

      // Check Error
      if (error.response) {
        if (error.response.status === 404) {
          toast.error("User not found. Please check the user ID.");
        } else if (error.response.status === 500) {
          toast.error("Server error. Please try again later.");
        } else {
          toast.error("An unexpected error occurred.");
        }
      }
    }
  };

  // Save password
  const savePassword = async () => {
    const passwordError = validatePassword(newPassword);
    if (passwordError) {
      setValidationErrors((prev) => ({ ...prev, password: passwordError }));
      toast.error(passwordError);
      return;
    }

    if (newPassword !== confirmPassword) {
      setValidationErrors((prev) => ({
        ...prev,
        password: "Passwords do not match.",
      }));
      toast.error("Passwords do not match.");
      return;
    }

    // Ensure currentPassword is not empty
    if (!currentPassword) {
      setValidationErrors((prev) => ({
        ...prev,
        currentPassword: "Current password is required.",
      }));
      toast.error("Current password is required.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/api/user/checkPassword/${user?.user_id}`,
        { currentPassword }
      );

      if (response.data.message !== "Password is correct.") {
        setValidationErrors((prev) => ({
          ...prev,
          currentPassword: "Current password is incorrect.",
        }));
        toast.error("Current password is incorrect.");
        return;
      }

      // If current password verification is successful
      await axios.put(
        `http://localhost:5000/api/user/password/update/${user?.user_id}`,
        { currentPassword, newPassword } // Send both current and new passwords
      );
      toast.success("Password updated successfully!");
      setIsPasswordDialogOpen(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error("Failed to update password.");

      if (error.response) {
        if (error.response.status === 404) {
          toast.error("User not found. Please check the user ID.");
        } else if (error.response.status === 500) {
          toast.error("Server error. Please try again later.");
        }
      }
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <ToastContainer />
      <Box display="flex" alignItems="center">
        <Box position="relative" display="inline-block">
          <Avatar
            src={profileImage}
            alt="User profile"
            sx={{ width: 200, height: 200, borderRadius: "50%" }}
          />
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
            sx={{ position: "absolute", bottom: 0, right: 0, color: "black" }}
            onClick={() => setIsEditingImage(true)}
          >
            <FaCamera />
          </IconButton>
        </Box>
        {isEditingImage && (
          <Box display="flex" flexDirection="column" ml={2}>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              hidden
              id="upload-button"
            />
            <label htmlFor="upload-button">
              <Button
                component="span"
                sx={{
                  backgroundColor: "white",
                  color: "black",
                  "&:hover": {
                    backgroundColor: "black",
                    color: "white",
                  },
                }}
              >
                Choose Image
              </Button>
            </label>
            {selectedFile && (
              <Box mt={1}>
                <span>Selected: {selectedFile.name}</span>
              </Box>
            )}
            <Button
              onClick={handleUploadAvatarImage}
              disabled={!selectedFile} // Disable if no file is selected
              sx={{
                backgroundColor: "white",
                color: "black",
                "&:hover": {
                  backgroundColor: "black",
                  color: "white",
                },
              }}
            >
              Save
            </Button>
            <Button
              onClick={() => setIsEditingImage(false)}
              sx={{
                backgroundColor: "white",
                color: "black",
                "&:hover": {
                  backgroundColor: "black",
                  color: "white",
                },
              }}
            >
              Cancel
            </Button>
          </Box>
        )}
      </Box>

      <Box mt={4} width="100%" maxWidth={600}>
        <Typography variant="h6">User Information</Typography>
        <TextField
          label="Email"
          name="email"
          value={userInfo.email}
          disabled
          fullWidth
          margin="normal"
        />

        <Box display="flex" alignItems="center" mt={2}>
          <TextField
            label="Username"
            name="username"
            value={userInfo.username}
            onChange={handleUserInfoChange}
            fullWidth
            margin="normal"
            disabled={!isEditingUsername}
            error={!!validationErrors.username}
            helperText={validationErrors.username?.message || ""}
          />
          {!isEditingUsername ? (
            <Button
              variant="outlined"
              size="small"
              onClick={() => setIsEditingUsername(true)}
              sx={{
                ml: 4,
                borderColor: "black",
                color: "black",
                "&:hover": {
                  backgroundColor: "black",
                  color: "white",
                },
              }}
            >
              Edit
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => {
                saveUsername();
                setIsEditingUsername(false);
              }}
              sx={{
                ml: 4,
                backgroundColor: "black",
                color: "white",
                borderColor: "black",
                "&:hover": {
                  backgroundColor: "darkgray",
                  color: "white",
                },
              }}
            >
              Save
            </Button>
          )}
        </Box>

        <Box display="flex" alignItems="center" mt={2}>
          <TextField
            label="Phone Number"
            name="phone"
            value={userInfo.phone}
            onChange={handleUserInfoChange}
            fullWidth
            margin="normal"
            disabled={!isEditingPhone}
            // error={validationErrors.phone}
            helperText={validationErrors.phone}
          />
          {!isEditingPhone ? (
            <Button
              variant="outlined"
              size="small"
              onClick={() => setIsEditingPhone(true)}
              sx={{
                ml: 4,
                borderColor: "black",
                color: "black",
                "&:hover": {
                  backgroundColor: "black",
                  color: "white",
                },
              }}
            >
              Edit
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => {
                savePhone();
                setIsEditingPhone(false);
              }}
              sx={{
                ml: 4,
                backgroundColor: "black",
                color: "white",
                borderColor: "black",
                "&:hover": {
                  backgroundColor: "darkgray",
                  color: "white",
                },
              }}
            >
              Save
            </Button>
          )}
        </Box>
        <Box display="flex" alignItems="center">
          <TextField
            label="Password"
            type="password"
            value="**************"
            fullWidth
            margin="normal"
            disabled
            InputProps={{
              disableUnderline: true,
              style: { border: "none" },
            }}
            variant="standard"
            sx={{ ml: 2 }}
          />
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setIsPasswordDialogOpen(true)}
            sx={{
              ml: 2,
              borderColor: "black",
              color: "black",
              "&:hover": {
                backgroundColor: "black",
                color: "white",
              },
            }}
          >
            Change
          </Button>
        </Box>

        <Box mt={4}>
          <Typography variant="h6">Delivery Address</Typography>
          <TextField
            label="Address Line"
            name="addressLine"
            value={address.addressLine}
            onChange={handleUserInfoChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="City"
            name="city"
            value={address.city}
            onChange={handleUserInfoChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="State"
            name="state"
            value={address.state}
            onChange={handleUserInfoChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Country"
            name="country"
            value={address.country}
            onChange={handleUserInfoChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Postal Code"
            name="postalCode"
            value={address.postalCode}
            onChange={handleUserInfoChange}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={saveChanges}
            sx={{
              mt: 2,
              backgroundColor: "white",
              color: "black",
              borderRadius: "16px",
              border: "2px",
              "&:hover": {
                backgroundColor: "black",
                color: "white",
              },
            }}
          >
            Save Address
          </Button>
        </Box>
      </Box>

      {/* Dialog for Changing Password */}
      <Dialog
        open={isPasswordDialogOpen}
        onClose={() => setIsPasswordDialogOpen(false)}
      >
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              savePassword();
            }}
          >
            <TextField
              label="Current Password"
              name="currentPassword"
              type="password"
              onChange={handlePasswordChange}
              fullWidth
              margin="normal"
              error={!!validationErrors.password}
              helperText={validationErrors.password}
              autoComplete="current-password"
            />
            <TextField
              label="New Password"
              name="newPassword"
              type="password"
              onChange={handlePasswordChange}
              fullWidth
              margin="normal"
              error={!!validationErrors.password}
              helperText={validationErrors.password}
              autoComplete="new-password"
            />
            <TextField
              label="Confirm New Password"
              name="confirmPassword"
              type="password"
              onChange={handlePasswordChange}
              fullWidth
              margin="normal"
              autoComplete="new-password"
            />
            <DialogActions>
              <Button
                onClick={() => setIsPasswordDialogOpen(false)}
                color="black"
              >
                Cancel
              </Button>
              <Button type="submit" color="black">
                Save
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
      <ToastContainer />
    </Box>
  );
}

export default AdminProfile;
