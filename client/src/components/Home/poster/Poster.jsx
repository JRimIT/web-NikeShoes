import React from "react";
import { productData } from "./DataForPoster";
import ListPoster from "./ListPoster";

const Poster = () => {
  const poster = productData.map((item) => (
    <ListPoster
      id={item.id}
      title={item.title}
      description={item.description}
      url={item.imageurl}
    />
  ));

  return (
    <div className="poster-container">
      <div className="pt-5">
        <p className="title-feature">News for you</p>
      
      </div>
      <div className="content">
          {poster} 
      </div>
    </div>
  );
};

export default Poster;
