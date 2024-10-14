import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import HomePage from "../components/Home/HomePage";
import HomePageMen from "../components/Home/HomeMen/HomePageMen";
import HomePageWoman from "../components/Home/HomeWomen/HomePageWoman";
import ProductListPageMen from "../components/Home/listProduct/men/ProductListPageMen";
import ProductListPageWomen from "../components/Home/listProduct/women/ProductListPageWomen";
// import Login from "../components/login/Login";
// import Register from "../components/login/Register";
import ProductDetailPage from "../components/Home/listProduct/Product/ProductDetailPage";
import UserChatbox from '../components/Chatbox/UserChatbox';
import AdminChatbox from '../components/Chatbox/AdminChatbox';
import Dashboard from "../components/userDashboard/pages/Dashboard";

const LayOut = () => {
  return (
    <>
      <Routes>
        {/* Nested Routes */}
        <Route path="/" element={<App />}>
          <Route index element={<HomePage/>}></Route>
          <Route path="/men" element={<HomePageMen/>}></Route>
          <Route path="/women" element={<HomePageWoman/>}></Route>
          <Route path="/products-men" element={<ProductListPageMen/>}></Route>
          <Route path="products-men/:category" element={<ProductListPageMen />} />
          <Route path="/products-women" element={<ProductListPageWomen/>}></Route>
          <Route path="products-women/:category" element={<ProductListPageWomen />} />
          {/* <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register />} /> */}
          <Route path="/products/:id" element={<ProductDetailPage />} />
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
