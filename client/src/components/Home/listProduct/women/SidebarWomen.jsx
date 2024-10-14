import React from 'react';  
import { useNavigate } from 'react-router-dom';  
import '../Product/Sidebar.scss';

const SidebarWomen = ({ onCategoryChange }) => {  // Receive the onCategoryChange prop
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    onCategoryChange(category);  // Call the function passed from the parent
    navigate(`/products-women?category=${category}`); // Navigate to the products page with category
  };

  return (  
    <>
    <div className="sidebar">  
      <ul className="category-list">
        <li onClick={() => handleCategoryClick('Football')}>Football</li>   
        <li onClick={() => handleCategoryClick('Basketball')}>Basketball</li> 
        <li onClick={() => handleCategoryClick('Women\'s Road Running Shoes')}>Road Running</li>
        <li onClick={() => handleCategoryClick('Golf')}>Golf</li>
        <li onClick={() => handleCategoryClick('Skate')}>Skate Shoes</li> 
        <li onClick={() => handleCategoryClick('Women\'s Sandals')}>Sandals</li> 
        <li onClick={() => handleCategoryClick('Women\'s Hard Court Tennis Shoes')}>Tennis</li>
        <li onClick={() => handleCategoryClick('Athletics')}>Athletics</li> 
        <li onClick={() => handleCategoryClick('Women\'s Workout Shoes')}>Women's Workout Shoes</li>
        <li onClick={() => handleCategoryClick('Women\'s Trail-Running Shoes')}>Trail-Running</li>
        <li onClick={() => handleCategoryClick('Women\'s Road Racing Shoes')}>Racing</li>
        <li onClick={() => handleCategoryClick('Women\'s Slides')}>Women's Slides</li>
        <li onClick={() => handleCategoryClick('Women\'s Mules')}>Women's Mules</li>
      </ul>  
    </div>
    </>
  );  
};  

export default SidebarWomen;
