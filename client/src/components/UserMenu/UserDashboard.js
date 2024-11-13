import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import SidebarUser from "../UserMenu/SidebarUser";
import Header from "../header/Header";

function UserDashboard() {
  return (
    <>
      {/*  Header */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "60px",
          zIndex: 10,
          backgroundColor: "#ffffff",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Header />
      </Box>
      {/* Main */}
      <Box sx={{ display: "flex" }}>
        {/* Sidebar*/}
        <Box
          sx={{
            position: "fixed",
            top: "60px",
            left: 0,
            width: "200px",
            height: "calc(100vh - 60px)",
            overflowY: "auto",
            backgroundColor: "#f4f4f4",
            zIndex: 5,
          }}
        >
          <SidebarUser />
        </Box>

        {/* Content */}
        <Box
          sx={{
            marginLeft: "200px",
            padding: "20px",
            paddingTop: "130px",
            flexGrow: 1,
            maxWidth: "calc(100% - 200px)",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </>
  );
}

export default UserDashboard;
