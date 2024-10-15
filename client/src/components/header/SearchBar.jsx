import React, { useState, useEffect } from 'react';
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

  // Gọi API để thực hiện tìm kiếm khi nhấn Enter hoặc nhấn nút tìm kiếm
  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/products/search?term=${searchTerm}`);
      onSearchResults(response.data.products);
      setShowSuggestions(false);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Chuyển sang trạng thái popup
  const handleFocus = () => {
    setIsExpanded(true);
    setShowSuggestions(true);
  };

 
  // Khi người dùng nhấn vào một gợi ý
  const handleSuggestionClick = (suggestion) => {
    const productId = suggestion.id; // Chắc chắn rằng suggestion chứa id sản phẩm
    navigate(`/products/${productId}`); // Điều hướng đến ProductDetailPage với ID sản phẩm
    setShowSuggestions(false);
  };

  // Đóng popup khi nhấn Cancel
  const handleCancel = () => {
    setIsExpanded(false);
    setSearchTerm(''); // Reset lại input
    setShowSuggestions(false);
  };

  return (
    <div>
      {!isExpanded ? (
        <div className="compact-search-bar">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={handleFocus}
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
              onKeyPress={handleKeyPress}
            />
            <button className="search-button" onClick={handleSearch}>
              <IoMdSearch />
            </button>
            <button className="cancel-button" onClick={handleCancel}>Cancel</button>
          </div>

          {showSuggestions && (
            <div className={`suggestions-popup ${showSuggestions ? 'open' : ''}`}>
              <ul>
                {suggestions.map((suggestion, index) => (
                  <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                    {suggestion.name}
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
