import React from 'react'
import { productData, responsive } from './womanFeature/Data';
import ProductWomenFeature from './womanFeature/ProductWomenFeature';
import Carousel from 'react-multi-carousel';
import ShopBySport from '../listBySport/ShopBySport';
import Poster from '../poster/Poster';
import Slider from 'react-slick';

function HomePageWomanContent() {
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
    <div className="slider-container">
      <Slider {...settings}>
        {product}
      </Slider>
    </div>


     {/* <Carousel showDots={true} responsive={responsive}>
        {product}
      </Carousel> */}

    <ShopBySport></ShopBySport>


    <Poster></Poster>
    </>
  )
}

export default HomePageWomanContent