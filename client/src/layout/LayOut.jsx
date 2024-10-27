import { Routes, Route, Router } from "react-router-dom";
import App from "../App";
import HomePage from "../components/Home/HomePage";
import HomePageMen from "../components/Home/HomeMen/HomePageMen";
import HomePageWoman from "../components/Home/HomeWomen/HomePageWoman";
import ProductListPageMen from "../components/Home/listProduct/men/ProductListPageMen";
import ProductListPageWomen from "../components/Home/listProduct/women/ProductListPageWomen";
import ProductDetailPage from "../components/Home/listProduct/Product/ProductDetailPage";
import Orders from "../components/orders/Orders";
import OrderItems from "../components/orders/OrderItems";
import Payment from "../components/payment/Payment";
import ProductFeaturedPage from "../components/Home/listProduct/featured/ProductFeaturedPage";

import ProductSearch from "../components/Home/listProduct/Product/ProductSearch";
import CartPage from "../components/Home/Cart/CartPage";
import WishlistPage from "../components/Home/Wishlist/WishlistPage";
import { CartProvider } from "../context/CartContext";

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
import AdminProfile from "../pages/admin/profile";

import ManagerProduct from "../pages/admin/manageProduct";
import ManagerUser from "../pages/admin/manageUser";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import UserChatbox from "../components/Chatbox/UserChatbox";
import AdminChatbox from "../components/Chatbox/AdminChatbox";
// import Dashboard from "../components/userDashboard/pages/Dashboard";

import Login from "../components/Login";
import Register from "../components/Register";
import ForgotPass from "../components/ForgotPass";
import ProfilePage from "../components/Profile";
import HelpPage from "../components/Home/Help/HelpPage";

import UserDashboard from "../components/UserMenu/UserDashboard";
import UserProfile from "../components/UserMenu/UserProfile";
import NotFound from "../pages/NotFoundPages/NotFound";
import DenyAccess from "../pages/NotFoundPages/DenyAccess";
import ErrorPage from "../pages/NotFoundPages/errorPage";

const LayOut = () => {
  return (
    <>
    <CartProvider>
        <UserChatbox/>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot" element={<ForgotPass />} />
              {/*Route nested: Cha con lồng nhau  */}
              <Route path="/" element={<App />}>
                <Route index element={<HomePage />}></Route>
                <Route path="/men" element={<HomePageMen />}></Route>
                <Route path="/women" element={<HomePageWoman />}></Route>
                <Route path="/products-men" element={<ProductListPageMen />}></Route>
                <Route
                  path="products-men/:category"
                  element={<ProductListPageMen />}
                />
                <Route
                  path="/products-featured"
                  element={<ProductFeaturedPage />}
                ></Route>
                <Route
                  path="/products-men-featured/:featured"
                  element={<ProductFeaturedPage />}
                ></Route>
                <Route
                  path="/products-women"
                  element={<ProductListPageWomen />}
                ></Route>
                <Route
                  path="products-women/:category"
                  element={<ProductListPageWomen />}
                />
                <Route
                  path="/products-women-featured/:featured"
                  element={<ProductFeaturedPage />}
                ></Route>
                <Route path="/products/search" element={<ProductSearch />} />
                <Route path="/products/:id" element={<ProductDetailPage />} />
                <Route path="/orders" element={<Orders/>}></Route>
                <Route path="/order-items/:id" element={<OrderItems/>}></Route>
                <Route path="/payment" element={<Payment></Payment>}></Route>
                <Route path="/profile" element={<ProfilePage />}></Route>
                <Route path="/cart" element={<CartPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/help" element={<HelpPage />} />
              </Route>

              {/* Dynamic route for User with userId */}
              {/* <Route path="/user/:userId" element={<UserChatbox />} /> */}

              {/* Admin route */}
              {/* <Route path="/admin" element={<AdminChatbox userId="admin" />} /> */}

            <Route path="admins" element={<Admin />}>
              <Route index element={<DashBoard />} />
              <Route path="dashBoard" element={<DashBoard />} />
              <Route path="team" element={<Team />} />
              {/* <Route path="contacts" element={<Contacts />} /> */}
              <Route path="manageProduct" element={<ManagerProduct />} />
              <Route path="manageUser" element={<ManagerUser />} />
              <Route path="invoices" element={<Invoices />} />
              <Route path="adminChatbox"
              element={<AdminChatbox userId="admin"/>}
            />
              <Route path="form" element={<Form />} />
              <Route path="bar" element={<Bar />} />
              <Route path="pie" element={<Pie />} />
              <Route path="line" element={<Line />} />
              <Route path="faq" element={<FAQ />} />
              <Route path="calendar" element={<Calendar />} />
              <Route path="adprofile" element={<AdminProfile />} />
              {/* <Route path="/geography" element={<Geography />} /> */}
            </Route>

              {/* Dynamic route for User with userId */}
              

              {/* Admin route */}
              
          {/* User route */}
            <Route path="/dashboard" element={<UserDashboard />}>
              <Route path="profile" element={<UserProfile />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="wishlist" element={<WishlistPage />} />
              {/* <Route path="history" element={<HistoryPage />} />
              <Route path="setting" element={<SettingPage />} /> */}
            </Route>

            <Route path="/DenyAccess" element={<DenyAccess></DenyAccess>}></Route>
            <Route path="/errorPage" element={<ErrorPage></ErrorPage>}></Route>

            <Route path="*" element={<NotFound />}></Route>
          </Routes>
      </CartProvider>

      <ToastContainer
        position="top-right"
        autoClose={3000}
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
