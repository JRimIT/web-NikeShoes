import React from 'react'
import ProductMenFeature from './MenFeature/ProductMenFeature';
import { productData, responsive } from './MenFeature/Data';
import Carousel from "react-multi-carousel";
import ShopBySport from '../listBySport/ShopBySport';
import Poster from '../poster/Poster';

function HomePageMenContent() {
 const product = productData.map((item) => (
    <ProductMenFeature
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
}

export default HomePageMenContent