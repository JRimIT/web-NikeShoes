import React from "react";
import { Button } from "react-bootstrap";
import "./HomePage.scss";
import HomePageContent from "./HomePageContent";
import Footer from "./footer/Footer";
import { useState } from "react";
import { useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
const HomePage = () => {
  return (
    <>
      <div className="homepage-container">
        {/* <video
          src="https://res.cloudinary.com/dzbhzlwoe/video/upload/v1730689068/Tainhanh.net_YouTube_Awaken-Your-Madness-I-Nike-Football_Media_2xdXKNQYN2o_001_1080p_sf4trb.mp4"
          autoplay
          muted
          loop
          controls
        >
          Your browser does not support the video tag.
        </video> */}

        {/* <img
          className="video"
          src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2l5aHVrZDEzdGM1cTFxaTVuamh6emR0cWlwbG0zbnkycWRod3A0cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xUA7b83QrFRGCXV6Io/giphy.gif"
          alt="my-gif"
        /> */}

        <video className="video" muted playsInline autoPlay loop>
          <source
            src="https://res.cloudinary.com/dzbhzlwoe/video/upload/v1730689068/Tainhanh.net_YouTube_Awaken-Your-Madness-I-Nike-Football_Media_2xdXKNQYN2o_001_1080p_sf4trb.mp4"
            type="video/mp4"
          ></source>
        </video>
        <div className="homePage-content">
          <div className="title-content">
            <p>Nike Running</p>
            <h1>JUST DO IT!!</h1>
            <p>
              If you don't hate running a little, you don't love running enough.
            </p>

            <Button href="/products-men/Running" className="shop-button">
              Shop
            </Button>
                
              </div>
              <div className="content">
                <HomePageContent></HomePageContent>
              </div>
            </div>
            <Footer></Footer>
          </div>
        </>
      )}
    
  


export default HomePage;
