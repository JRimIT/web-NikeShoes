import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../UserMenu/SidebarUser.css";
import { FiUser } from "react-icons/fi";
import { IoBagCheckOutline } from "react-icons/io5";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineChatAlt2 } from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { BsCartCheck } from "react-icons/bs";
const SidebarUser = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // localStorage.removeItem("user");
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="sidebarUser">
      <h2>User Menu</h2>
      <ul>
        <li onClick={() => navigate("/dashboard/profile")}>
          <FiUser />
          <span>Profile</span>
        </li>
        <li onClick={() => navigate("/dashboard/order")}>
          <IoBagCheckOutline />
          <span>Orders</span>
        </li>
        {/* <li onClick={() => navigate("/dashboard/history")}>
          <IoBagCheckOutline />
          <span>Transaction history</span>
        </li> */}
        <li onClick={() => navigate("/dashboard/cart")}>
          <BsCartCheck /> <span>Shopping cart</span>
        </li>
        <li onClick={() => navigate("/dashboard/wishlist")}>
          <IoBagHandleOutline />
          <span>Favourites</span>
        </li>
        {/* <li onClick={() => navigate("/dashboard/inbox")}>
          <HiOutlineChatAlt2 />
          <span>Inbox</span>
        </li>
        <li onClick={() => navigate("/dashboard/settings")}>
          <IoSettingsOutline />
          <span>Settings</span>
        </li> */}
        <li onClick={handleLogout}>
          <FiLogOut />
          <span>Log out</span>
        </li>
      </ul>
    </div>
  );
};

export default SidebarUser;
