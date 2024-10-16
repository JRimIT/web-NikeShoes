import React from 'react';  
import { useNavigate } from 'react-router-dom';  
import '../Product/Sidebar.scss';

const SidebarMen = ({ onCategoryChange }) => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    onCategoryChange(category);  // Call the function passed from the parent
    navigate(`/products-men?category=${category}`); // Navigate to the products page with category
  };

  return (  
    <div className="sidebar">  
      <ul className="category-list">  
        <li onClick={() => handleCategoryClick('Football')}>Football</li> 
        <li onClick={() => handleCategoryClick('Basketball')}>Basketball</li>
        <li onClick={() => handleCategoryClick('Custom')}>Custom Men's Shoes</li>
        <li onClick={() => handleCategoryClick('Men\'s Road Running Shoes')}>Road Running</li> 
        <li onClick={() => handleCategoryClick('Golf')}>Golf</li>  
        <li onClick={() => handleCategoryClick('Skate')}>Skate Shoes</li> 
        <li onClick={() => handleCategoryClick('Athletics')}>Athletics</li> 
        <li onClick={() => handleCategoryClick('Men\'s Hard Court Tennis Shoes')}>Tennis</li>  
        <li onClick={() => handleCategoryClick('Men\'s Slides')}>Slides</li> 
        <li onClick={() => handleCategoryClick('Men\'s Road Racing Shoes')}>Racing</li>
        <li onClick={() => handleCategoryClick('Men\'s Workout Shoes')}>Workout</li> 
        <li onClick={() => handleCategoryClick('Men\'s Trail-Running Shoes')}>Trail-Running</li>
        <li onClick={() => handleCategoryClick('Men\'s Flip-Flops')}>Flip-Flops</li> 
        <li onClick={() => handleCategoryClick('Men\'s Sandals')}>Sandals</li> 
      </ul>  
    </div>
  );  
};  

export default SidebarMen;