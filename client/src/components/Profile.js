import React, { useEffect, useState } from "react";

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user")); // Lấy thông tin người dùng từ localStorage
    setUser(userData); // Cập nhật state với thông tin người dùng
  }, []);

  return (
    <div>
      {user && (
        <div>
          <h1>{user.username}</h1>
          <h2>{user.email}</h2>
          <h2>{user.phone}</h2>
          <h2>{user.addressLine}</h2>
          <h2>{user.city}</h2>
          <h2>{user.state}</h2>
          <h2>{user.country}</h2>
          <h2>{user.postalCode}</h2>
          <img
            src={user.user_image}
            alt="User Avatar"
            style={{ width: "150px", height: "150px" }}
          />
          {/* Hiển thị các thông tin khác của người dùng */}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
