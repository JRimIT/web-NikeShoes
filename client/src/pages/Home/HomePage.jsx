import React from "react";

import "./HomePage.scss";
import HomePageContent from "./HomePageContent";
import Footer from "./footer/Footer";

const HomePage = () => {
  return (
    <>
      <div className="homepage-container">
        <img
          className="video"
          src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2l5aHVrZDEzdGM1cTFxaTVuamh6emR0cWlwbG0zbnkycWRod3A0cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xUA7b83QrFRGCXV6Io/giphy.gif"
          alt="my-gif"
        />

        {/* <video className="video" muted playsInline autoPlay loop>
          <source src={Nike_traller} type="video/mp4"></source>
        </video> */}
        <div className="homePage-content">
          <div className="title-content">
            <p>Nike Running</p>
            <h1>JUST DO IT!!</h1>
            <p>
              If you don't hate running a little, you don't love running enough.
            </p>

            <button className="btn">Shop</button>
          </div>
          <div className="content">
            <h2 className="title-feature">Feature</h2>
            <HomePageContent></HomePageContent>
          </div>
        </div>
        <Footer></Footer>
      </div>
    </>
  );
};

export default HomePage;
