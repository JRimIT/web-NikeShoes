import React from 'react';  
import { useNavigate } from 'react-router-dom';  
import '../Product/Sidebar.scss';

const SidebarFeaturedWomen = ({ onFeaturedChange }) => {
  const navigate = useNavigate();

  const handleFeaturedClick = (featured) => {
    onFeaturedChange(featured);
    navigate(`/products-women-featured?pro_message_list=${featured}`);
  };

  return (  
    <div className="sidebar">  
      <ul className="featured-list">  
        <li onClick={() => handleFeaturedClick('Bestseller')}>Bestseller</li> 
        <li onClick={() => handleFeaturedClick('Sustainable Materials')}>Sustainable Materials</li> 
        <li onClick={() => handleFeaturedClick('Just In')}>Just In</li>
        <li onClick={() => handleFeaturedClick('Promo Exclusion')}>Promo Exclusion</li>
      </ul>  
    </div>
  );  
};  

export default SidebarFeaturedWomen;