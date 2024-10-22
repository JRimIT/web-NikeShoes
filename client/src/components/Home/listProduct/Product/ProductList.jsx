import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductList.scss';
import { useNavigate, useLocation } from 'react-router-dom';

const ProductList = ({ category, onTotalProductsChange }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation(); // Lấy thông tin URL hiện tại

  // Hàm để lấy giá trị `searchTerm` từ URL
  const getSearchTermFromURL = () => {
    const params = new URLSearchParams(location.search);
    return params.get('term') || ''; // Lấy `term` từ query URL, hoặc chuỗi rỗng nếu không có
  };

  const fetchProducts = () => {
    const searchTerm = getSearchTermFromURL(); // Lấy từ khóa tìm kiếm từ URL
    let url = `http://localhost:5000/products`;

    // Nếu có cả category và searchTerm, truyền cả hai
    if (category && searchTerm) {
      url = `http://localhost:5000/products?category=${category}&term=${searchTerm}`;
    } else if (category) {
      // Chỉ lọc theo category
      url = `http://localhost:5000/products?category=${category}`;
    } else if (searchTerm) {
      // Chỉ tìm kiếm theo searchTerm
      url = `http://localhost:5000/products/search?term=${searchTerm}`;
    }

    axios.get(url)
      .then(response => {
        setProducts(response.data.products);
        onTotalProductsChange(response.data.totalCount);
      })
      .catch(error => {
        console.error('There was an error fetching the products!', error);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, [category, location.search]); // Gọi lại khi category hoặc searchTerm (trong URL) thay đổi

  return (
    <div className="product-container">
      {products.map(product => (
        <div
          className="product-card"
          key={product.product_id}
          onClick={() => navigate(`/products/${product.product_id}`)}
        >
          <img src={product.primary_image} alt={product.name} className="product-image" />
          <h5 className="product-featured">{product.pro_message_list}</h5>
          <h6 className="product-name">{product.name}</h6>
          <h6 className="product-category">{product.category}</h6>
          <h6 className="product-color">{product.color}</h6>
          <p className="product-price">
            {product.price
              ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                  .format(parseFloat(product.price.replace(/,/g, '')))
              : 'Price not available'}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
