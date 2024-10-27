import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import SidebarUser from "../UserMenu/SidebarUser";
import Header from "../header/Header";

function UserDashboard() {
  return (
    <>
      {/* Phần Header */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "60px", // Chiều cao cố định của Header
          zIndex: 10,
          backgroundColor: "#ffffff", // Màu nền cho Header
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Đổ bóng nhẹ cho Header
        }}
      >
        <Header />
      </Box>

      {/* Phần bố cục chính */}
      <Box sx={{ display: "flex" }}>
        {/* Sidebar bên trái */}
        <Box
          sx={{
            position: "fixed",
            top: "60px", // Bên dưới Header
            left: 0,
            width: "200px", // Chiều rộng Sidebar
            height: "calc(100vh - 60px)", // Chiều cao trừ phần Header
            overflowY: "auto",
            backgroundColor: "#f4f4f4",
            zIndex: 5,
          }}
        >
          <SidebarUser />
        </Box>

        {/* Phần nội dung chính bên phải */}
        <Box
          sx={{
            marginLeft: "200px", // Để phần nội dung bên cạnh Sidebar
            padding: "20px",
            paddingTop: "130px", // Tạo khoảng cách cho Header
            flexGrow: 1,
            maxWidth: "calc(100% - 200px)", // Chiếm hết phần trống còn lại
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </>
  );
}

export default UserDashboard;
