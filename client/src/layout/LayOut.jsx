import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import HomePage from "../components/Home/HomePage";
import HomePageMen from "../components/Home/HomeMen/HomePageMen";
import HomePageWoman from "../components/Home/HomeWomen/HomePageWoman";
import UserChatbox from '../components/Chatbox/UserChatbox';
import AdminChatbox from '../components/Chatbox/AdminChatbox';
import Dashboard from "../components/userDashboard/pages/Dashboard";

const LayOut = () => {
  return (
    <>
      <Routes>
        {/* Nested Routes */}
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="/men" element={<HomePageMen />} />
          <Route path="/women" element={<HomePageWoman />} />
          <Route path="userDashboard/*" element={<Dashboard />}></Route>
        </Route>

        {/* Dynamic route for User with userId */}
        <Route path="/user/:userId" element={<UserChatbox />} />

        {/* Admin route */}
        <Route path="/admin" element={<AdminChatbox userId="admin" />} />
        
      </Routes>
    </>
  );
};

export default LayOut;
