import { Routes, Route } from "react-router-dom";
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
// import UserChatbox from '../components/Chatbox/UserChatbox';
// import AdminChatbox from '../components/Chatbox/AdminChatbox';
// import Dashboard from "../components/userDashboard/pages/Dashboard";
import ProductSearch from "../components/Home/listProduct/Product/ProductSearch";
import CartPage from "../components/Home/Cart/CartPage";
import WishlistPage from "../components/Home/Wishlist/WishlistPage";
import { CartProvider } from "../context/CartContext";

const LayOut = () => {
  return (
    <>
    <CartProvider>
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
          <Route path="/orders" element={<Orders/>}></Route>
          <Route path="/order-items/:id" element={<OrderItems/>}></Route>
          <Route path="/payment" element={<Payment></Payment>}></Route>
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
        </Route>

        {/* Dynamic route for User with userId */}
        {/* <Route path="/user/:userId" element={<UserChatbox />} /> */}

        {/* Admin route */}
        {/* <Route path="/admin" element={<AdminChatbox userId="admin" />} /> */}
        
      </Routes>
      </CartProvider>
    </>
  );
};

export default LayOut;
