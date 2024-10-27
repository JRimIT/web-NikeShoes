import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import './ListItem.scss'; // Import SCSS cho phần hover

export default function ListItem(props) {
  const navigate = useNavigate(); // Sử dụng hook navigate

  // Điều hướng đến Men URL
  const handleNavigateMen = (e) => {
    e.stopPropagation(); // Ngăn chặn event bubbling để không trigger click vào card
    navigate(props.men); // Điều hướng đến linkMen
  };

  // Điều hướng đến Women URL
  const handleNavigateWomen = (e) => {
    e.stopPropagation(); // Ngăn chặn event bubbling để không trigger click vào card
    navigate(props.women); // Điều hướng đến linkWomen
  };

  // Điều hướng đến URL nếu chỉ có 1 link duy nhất
  const handleNavigateSingle = () => {
    navigate(props.url); // Điều hướng đến URL duy nhất
  };

  return (
    <div className="card" onClick={handleNavigateSingle}>
      <img className="product--image" src={props.image} alt="product image" />
      <div className="product-info">
        <h3>{props.name}</h3>

        {/* Nếu có cả linkMen và linkWomen, hiển thị 2 nút khi hover */}
        {props.men && props.women ? (
          <div className="button-group">
            <button className="btn-men" onClick={handleNavigateMen}>
              Men
            </button>
            <button className="btn-women" onClick={handleNavigateWomen}>
              Women
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
