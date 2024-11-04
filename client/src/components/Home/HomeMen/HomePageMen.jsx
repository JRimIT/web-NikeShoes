import React from "react";
import "../../Home/HomePage.scss";
import HomePageContent from "../HomePageContent";
import Footer from "../footer/Footer";
import HomePageMenContent from "./HomePageMenContent";
import "./HomePageMen.scss";
import Slider from "react-slick";
import { Button } from "react-bootstrap";

function HomePageMen() {
  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 8000,
    autoplaySpeed: 1000,
    cssEase: "linear",
  };
  return (
    <>
      <div className="slider-container">
        <Slider {...settings}>
          <div>
            <h3>New Styles On Sale: Up To 40% Off</h3>
          </div>
          <div>
            <h3>Move, Shop, Customise & Celebrate With Us</h3>
            <p>
              No matter what you feel like doing today, It's better as a Member.
            </p>
          </div>
          <div>
            <h3>Free Standard Delivery & 30-Day Free Returns</h3>
          </div>
        </Slider>
      </div>

      <div className="homepage-container">
        <img
          className="video"
          src="https://i.pinimg.com/originals/a2/c1/66/a2c166a3bfa7cc9a1bfa2b7d25d77952.gif"
          alt="my-gif"
        />
        {/* <video className="video" muted playsInline autoPlay loop>
          <source src={NikeGif} type="video/mp4"></source>
        </video> */}
        <div className="homePage-content">
          <div className="title-content">
            <p>Nike Football</p>
            <h1>GEAR UP FOR SOCCER</h1>
            <p>
              If you don't feel the grind in every kick, you're not chasing the
              game hard enough.
            </p>

            <div className="list-for-men pt-2">
              <Button href="/products-men/Football" className="button">
              Choose your shoes
              </Button>
            </div>
          </div>
          <div className="content">
            <h2 className="title-feature">Feature</h2>
            <HomePageMenContent></HomePageMenContent>
          </div>
        </div>
        <Footer></Footer>
      </div>
    </>
  );
}


export default HomePageMen;
