import React from 'react'
import { productData, responsive } from './womanFeature/Data';
import ProductWomenFeature from './womanFeature/ProductWomenFeature';
import Carousel from 'react-multi-carousel';
import ShopBySport from '../listBySport/ShopBySport';
import Poster from '../poster/Poster';
import Slider from 'react-slick';
import FeaturedCard from '../listFeature/FeaturedCard';
import { useState, useEffect } from 'react';
import axios from "../../../utils/axios.customize";


function HomePageWomanContent() {
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
    <ProductWomenFeature
      id = {item.id}
      name={item.name}
      url={item.imageurl}
     
    />
  ));
 const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 3000,
    cssEase: "linear"
  };
 
  return (
    <>
    {/* <div className="slider-container">
      <Slider {...settings}>
        {product}
      </Slider>
    </div> */}


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
  )
}

export default HomePageWomanContent