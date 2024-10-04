import React from "react";

export default function ListItem(props) {
  return (
    <div className="card" key={props.id}>
      <img className="product--image" src={props.url} alt="product image" />
       <button>{props.name}</button>  
    </div>
  );
}