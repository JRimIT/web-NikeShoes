import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSliders, faSort } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; // Import navigate từ react-router-dom
import './CategoryBar.scss';

const CategoryBar = ({ category, totalProducts, onSortChange, onToggleFilters, filtersVisible }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate(); // Hook điều hướng

  const handleSortChange = (value) => {
     {
      // Gọi hàm onSortChange khi có giá trị khác (ví dụ: price-high-low, price-low-high)
      if (onSortChange) {
        onSortChange(value); 
      }
    }
    setDropdownVisible(false); // Ẩn dropdown sau khi lựa chọn
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false); // Đóng dropdown nếu nhấp ra ngoài
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="category-navbar">
      <h1>{category ? `${category} (${totalProducts})` : `All Shoes (${totalProducts})`}</h1>
      <div className="category-controls">
        <button className="toggle-filters-btn" onClick={onToggleFilters}>
          <FontAwesomeIcon icon={faSliders} /> {filtersVisible ? 'Hide Filters' : 'Show Filters'}
        </button>
        <div className="sort-by" ref={dropdownRef}>
          <button className="sort-button" onClick={() => setDropdownVisible(!dropdownVisible)}>
            <FontAwesomeIcon icon={faSort} /> Sort By
            <span className="arrow">{dropdownVisible ? '▲' : '▼'}</span>
          </button>
          {dropdownVisible && (
            <div className="dropdown-options">
              <div onClick={() => handleSortChange('featured')}>Featured</div>
              <div onClick={() => handleSortChange('newest')}>Newest</div>
              <div onClick={() => handleSortChange('price-high-low')}>Price: High-Low</div>
              <div onClick={() => handleSortChange('price-low-high')}>Price: Low-High</div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default CategoryBar;
