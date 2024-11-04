export const validateEmail = (email) => {
  const emailRegex = /^[\w-\.]+@gmail\.com$/;
  if (!emailRegex.test(email)) {
    return "Email must be a valid @gmail.com address.";
  }
  return null; // Không có lỗi
};

export const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

  if (!passwordRegex.test(password)) {
    return "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number.";
  }
  return null; // Không có lỗi
};

export const validatePhoneNumber = (phoneNumber) => {
  const phoneRegex = /^\d{10,12}$/;
  if (!phoneRegex.test(phoneNumber)) {
    return "Invalid phone number."; // Thông báo nếu không hợp lệ
  }
  return null; // Không có lỗi
};

export const validateUsername = (username) => {
  // Kiểm tra độ dài
  if (username.length > 20) {
    return {
      isValid: false,
      message: "Username cannot be longer than 20 characters.",
    };
  }

  // Đếm số ký tự đặc biệt
  const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/g;
  const specialChars = username.match(specialCharPattern);
  const specialCharCount = specialChars ? specialChars.length : 0;

  // Kiểm tra số ký tự đặc biệt
  if (specialCharCount > 5) {
    return {
      isValid: false,
      message: "Username cannot contain more than 5 special characters.",
    };
  }

  return null;
};
