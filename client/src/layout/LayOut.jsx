import { Routes, Route } from "react-router-dom";
import App from "../App";
import HomePage from "../components/Home/HomePage";
import HomePageMen from "../components/Home/HomeMen/HomePageMen";
import HomePageWoman from "../components/Home/HomeWomen/HomePageWoman";
import ProductListPageMen from "../components/Home/listProduct/men/ProductListPageMen";
import ProductListPageWomen from "../components/Home/listProduct/women/ProductListPageWomen";
import ProductDetailPage from "../components/Home/listProduct/Product/ProductDetailPage";
import ProductFeaturedPage from "../components/Home/listProduct/featured/ProductFeaturedPage";
import Login from "../components/Login";
import Register from "../components/Register";
import ForgotPass from "../components/ForgotPass";
import ProfilePage from "../components/Profile";

const LayOut = () => {
  return (
    <>
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
            path="/products-women"
            element={<ProductListPageWomen />}
          ></Route>
          <Route
            path="products-women/:category"
            element={<ProductListPageWomen />}
          />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/profile" element={<ProfilePage />}></Route>
        </Route>
      </Routes>
    </>
  );
};

export default LayOut;
