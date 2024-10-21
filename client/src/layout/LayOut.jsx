import { Routes, Route } from "react-router-dom";
import App from "../App";
import HomePage from "../components/Home/HomePage";
import HomePageMen from "../components/Home/HomeMen/HomePageMen";
import HomePageWoman from "../components/Home/HomeWomen/HomePageWoman";
import ProductListPageMen from "../components/Home/listProduct/men/ProductListPageMen";
import ProductListPageWomen from "../components/Home/listProduct/women/ProductListPageWomen";
import ProductDetailPage from "../components/Home/listProduct/Product/ProductDetailPage";
import ProductFeaturedPage from "../components/Home/listProduct/featured/ProductFeaturedPage";
// import UserChatbox from '../components/Chatbox/UserChatbox';
// import AdminChatbox from '../components/Chatbox/AdminChatbox';
// import Dashboard from "../components/userDashboard/pages/Dashboard";
import ProductSearch from "../components/Home/listProduct/Product/ProductSearch";
import CartPage from "../components/Home/Cart/CartPage";
import WishlistPage from "../components/Home/Wishlist/WishlistPage";


import Admin from "../pages/admin/Admin";
import Team from "../pages/admin/team";
import DashBoard from "../pages/admin/dashboard";
import Contacts from "../pages/admin/contacts";
import Invoices from "../pages/admin/invoices";
import Form from "../pages/admin/form";
import Calendar from "../pages/admin/calendar";
import FAQ from "../pages/admin/faq";
import Bar from "../pages/admin/bar";
import Pie from "../pages/admin/pie";
import Line from "../pages/admin/line";
import ManagerProduct from "../pages/admin/manageProduct";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



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
          <Route path="/products-featured" element={<ProductFeaturedPage/>}></Route>
          <Route path="/products-men-featured/:featured" element={<ProductFeaturedPage/>}></Route>
          <Route path="/products-women" element={<ProductListPageWomen/>}></Route>
          <Route path="products-women/:category" element={<ProductListPageWomen />} />
          <Route path="/products-women-featured/:featured" element={<ProductFeaturedPage/>}></Route>
          <Route path="/products/search" element={<ProductSearch />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
        </Route>

        {/* Dynamic route for User with userId */}
        {/* <Route path="/user/:userId" element={<UserChatbox />} /> */}

        {/* Admin route */}
        {/* <Route path="/admin" element={<AdminChatbox userId="admin" />} /> */}
        
          <Route path="admins" element={<Admin />}>
            <Route path="dashBoard" element={<DashBoard />} />
            <Route path="team" element={<Team />} />
            {/* <Route path="contacts" element={<Contacts />} /> */}
            <Route path="manageProduct" element={<ManagerProduct />} />
            <Route path="invoices" element={<Invoices />} />
            <Route path="form" element={<Form />} />
            <Route path="bar" element={<Bar />} />
            <Route path="pie" element={<Pie />} />
            <Route path="line" element={<Line />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="calendar" element={<Calendar />} />
          {/* <Route path="/geography" element={<Geography />} /> */}
          </Route>
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        
        />
    </>
  );
};

export default LayOut;
