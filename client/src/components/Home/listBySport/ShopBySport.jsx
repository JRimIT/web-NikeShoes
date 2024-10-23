import React from "react";
import { productData } from "./dataListBySport"; // Không cần responsive từ đây
import ListItem from "./listItem";
import './ShopBySport.scss'; // Import SCSS cho giao diện responsive

const ShopBySport = () => {
  const productList = productData.map((item) => (
    <ListItem
      key={item.id}
      id={item.id}
      name={item.name}
      image={item.imageurl}
      url={item.link}
      men={item.linkMen}
      women={item.linkWomen}
    />
  ));

  return (
    <div className="shop-by-sport">
      <div className="pt-5">
        <p className="title-feature">Shop by sport</p>
      </div>
      <div className="product-grid"> {/* Sử dụng CSS Flexbox/Grid cho responsive */}
        {productList} {/* Hiển thị danh sách sản phẩm */}
      </div>
    </div>
  );
};

export default ShopBySport;
