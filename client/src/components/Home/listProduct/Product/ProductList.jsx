import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductList.scss';
import { useNavigate } from 'react-router-dom';

const ProductList = ({ category, onTotalProductsChange }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = () => {
    const url = category ? `http://localhost:5000/products?category=${category}` : `http://localhost:5000/products`;
    axios.get(url)
      .then(response => {
        setProducts(response.data.products); // Update to use the products array
        onTotalProductsChange(response.data.totalCount); // Update the total count
      })
      .catch(error => {
        console.error('There was an error fetching the products!', error);
      });
  };
    
  useEffect(() => {
    fetchProducts();
  }, [category]);

  const handleProductClick = (id) => {
    navigate(`/products/${id}`); // Make sure you're using the correct ID here
  };

  return (
    <div className="product-container">
      {products.map(product => (
        <div
        className="product-card"
        key={product.product_id} // Change from product.id to product.product_id
        onClick={() => handleProductClick(product.product_id)} // Use product.product_id for the click handler
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
