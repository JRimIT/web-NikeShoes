import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { IoMdSearch } from 'react-icons/io'; // Icon search
import './SearchBar.scss'; // CSS file
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ onSearchResults }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false); // Trạng thái popup
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate(); // Hook điều hướng của React Router
  const inputRef = useRef(null); // Tham chiếu đến ô nhập liệu
  const wrapperRef = useRef(null); // Tham chiếu đến toàn bộ popup để kiểm tra click ngoài popup

  // Fetch suggestions khi người dùng nhập từ khóa
  useEffect(() => {
    if (searchTerm.length > 2) {
      const fetchSuggestions = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/products/suggestions?term=${searchTerm}`);
          setSuggestions(response.data.suggestions);
        } catch (error) {
          console.error('Error fetching suggestions:', error);
        }
      };
      fetchSuggestions();
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [searchTerm]);

  // Điều hướng khi nhấn Enter hoặc nút tìm kiếm
  const handleSearch = () => {
    navigate(`/products/search?term=${searchTerm}`); // Điều hướng tới URL với searchTerm
    setShowSuggestions(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(); // Khi nhấn Enter, điều hướng URL
    }
  };

  // Chuyển sang trạng thái popup và focus vào input
  const handleFocus = () => {
    setIsExpanded(true);
    setShowSuggestions(true);
    setTimeout(() => {
      inputRef.current?.focus(); // Trỏ chuột vào ô nhập sau khi popup mở
    }, 0);
  };

  // Khi người dùng nhấn vào một gợi ý
  const handleSuggestionClick = (suggestion) => {
    const productId = suggestion.id; // Chắc chắn rằng suggestion chứa id sản phẩm
    navigate(`/products/${productId}`); // Điều hướng đến ProductDetailPage với ID sản phẩm
    setShowSuggestions(false);
  };

  // Đóng popup khi nhấp chuột ngoài popup
  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setIsExpanded(false); // Quay lại compact mode khi click ra ngoài
      setShowSuggestions(false);
    }
  };

  // Thêm sự kiện để lắng nghe nhấp chuột ngoài popup
  useEffect(() => {
    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside); // Cleanup
    };
  }, [isExpanded]);

  // Đóng popup khi nhấn Cancel
  const handleCancel = () => {
    setIsExpanded(false);
    setSearchTerm(''); // Reset lại input
    setShowSuggestions(false);
  };

  return (
    <div ref={wrapperRef}> {/* Tham chiếu đến toàn bộ wrapper */}
      {!isExpanded ? (
        <div className="compact-search-bar">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={handleFocus}
            onKeyPress={handleKeyPress} // Lắng nghe phím Enter
          />
          <button className="search-button" onClick={handleSearch}>
            <IoMdSearch />
          </button>
        </div>
      ) : (
        <div className={`expanded-search-bar ${isExpanded ? 'open' : ''}`}>
          <div className="search-header">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress} // Lắng nghe phím Enter
              ref={inputRef} // Thêm ref vào input để focus
            />
            <button className="search-button" onClick={handleSearch}>
              <IoMdSearch />
            </button>
            <button className="cancel-button" onClick={handleCancel}>Cancel</button>
          </div>

          {showSuggestions && (
            <div className={`suggestions-popup ${showSuggestions ? 'open' : ''}`}>
              <ul className="suggestions-list">
                {suggestions.map((suggestion, index) => (
                  <li key={index} onClick={() => handleSuggestionClick(suggestion)} className="suggestion-item">
                    <img src={suggestion.image} alt={suggestion.name} className="suggestion-image" />
                    <div className="suggestion-info">
                      <p className="suggestion-name">{suggestion.name}</p>
                      <p className="suggestion-price">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                          .format(suggestion.price)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
