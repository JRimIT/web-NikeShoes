import React from "react";

import "../../Home/HomePage.scss";
import HomePageContent from "../HomePageContent";
import Footer from "../footer/Footer";

import "./HomePageWoman.scss";
import Slider from "react-slick";
import HomePageWomanContent from "./HomePageWomanContent";

function HomePageWoman() {
  const settingsHead = {
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
        <Slider {...settingsHead}>
          <div>
            <h3>New Styles On Sale: Up To 40% Off</h3>
          </div>
          <div>
            <h3>Move, Shop, Customise & Celebrate With Us</h3>
            <p>
              No matter what you feel like doing today, It’s better as a Member.
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
          src="https://i.pinimg.com/originals/3f/43/b2/3f43b24ef8a2d720866a2bbedde1f554.gif"
          alt="my-gif"
        />
        {/* <video className="video" muted playsInline autoPlay loop>
          <source src={NikeGif} type="video/mp4"></source>
        </video> */}
        <div className="homePage-content">
          <div className="title-content">
            <h1>Run the World</h1>
            <p>
              If You Don’t Feel the Hustle in Every Move, You’re Not Giving It
              All.
            </p>

            <div className="list-for-men pt-2">
              <span>Choose your shoes </span>
            </div>
          </div>
          <div className="content">
            <h2 className="title-feature">Feature</h2>
            <HomePageWomanContent></HomePageWomanContent>
          </div>
        </div>
        <Footer></Footer>
      </div>
    </>
  );
}

export default HomePageWoman;
