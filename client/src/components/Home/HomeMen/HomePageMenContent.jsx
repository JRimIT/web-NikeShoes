import React from 'react'
import ProductMenFeature from './MenFeature/ProductMenFeature';
import { productData, responsive } from './MenFeature/Data';
import Carousel from "react-multi-carousel";
import ShopBySport from '../listBySport/ShopBySport';
import Poster from '../poster/Poster';
import FeaturedCard from '../listFeature/FeaturedCard';
import { useState, useEffect } from 'react';
import axios from "../../../utils/axios.customize";

function HomePageMenContent() {
  const [bestSellers, setBestSellers] = useState([]);
  useEffect(() => {
    axios
      .get("products/best-sellers")
      .then((response) => {
        setBestSellers(response.data.products);
      })
      .catch((error) => {
        console.error("Error fetching best sellers:", error);
      });
  }, []);

  const handleProductClick = (id) => {
    // Điều hướng đến trang chi tiết sản phẩm
    window.location.href = `/products/${id}`;
  };
 const product = productData.map((item) => (
    <ProductMenFeature
      id = {item.id}
      name={item.name}
      url={item.imageurl}
     
    />
  ));

  return (
    <>

<Carousel
          responsive={responsive}
          showDots={true} // Hiển thị dấu chấm dưới carousel
          infinite={true} // Vòng lặp vô hạn
          autoPlay={true} // Tự động chạy
          autoPlaySpeed={3000} // Tốc độ chạy
          keyBoardControl={true}
          customTransition="all 0.5s"
          transitionDuration={500}
          containerClass="carousel-container"
        >
          {bestSellers.map((product) => (
            <FeaturedCard
              key={product.id}
              id={product.id}
              name={product.name}
              image={product.image}
              price={product.price}
              onProductClick={handleProductClick}
            />
          ))}
        </Carousel>

      <ShopBySport></ShopBySport>

      <Poster></Poster>
    </>
  );
}

export default HomePageMenContent