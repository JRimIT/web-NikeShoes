import React, { useState } from "react";

import "./HomePageContent.scss";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { productData, responsive } from "./listFeature/data";
import Product from "./listFeature/Product";
import ShopBySport from "./listBySport/ShopBySport";
import Poster from "./poster/Poster";
import './poster/poster.scss'

const HomePageContent = () => {
  const product = productData.map((item) => (
    <Product
      id = {item.id}
      name={item.name}
      url={item.imageurl}
     
    />
  ));

  return (
    <>

      <Carousel showDots={true} responsive={responsive}>
        {product}
      </Carousel>

      <ShopBySport></ShopBySport>

      <Poster></Poster>
    </>
  );
};

export default HomePageContent;
