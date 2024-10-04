import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { productData, responsive } from "./dataListBySport";
import ListItem from "./listItem";


const ShopBySport = () => {
 const product = productData.map((item) => (
    <ListItem
      id = {item.id}
      name={item.name}
      url={item.imageurl}
     
    />
  ));

  return (
    <div className="shop-by-sport">
      <div className="pt-5">
        <p className="title-feature" >Shop by sport</p>
          
      </div>
      <div className="content">
          {product} 
      </div>
       {/* <Carousel showDots={true} responsive={responsive}> */}
        {/* {product} */}
      {/* </Carousel> */}
     
    </div>
  );
};

export default ShopBySport;
