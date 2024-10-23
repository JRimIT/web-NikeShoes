import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Product/ProductList.scss';
import { useNavigate } from 'react-router-dom';

const ProductFeaturedList = ({ featured, onTotalProductsChange, sortBy }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Hàm fetch sản phẩm từ API
  const fetchProducts = () => {
    const url = featured
      ? `http://localhost:5000/products?pro_message_list=${featured}`
      : `http://localhost:5000/products`;
  
    axios.get(url)
      .then(response => {
        let fetchedProducts = response.data.products;

        // Kiểm tra giá trị `sortBy` và sắp xếp dữ liệu theo giá
        if (sortBy === 'price-high-low') {
          fetchedProducts = fetchedProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        } else if (sortBy === 'price-low-high') {
          fetchedProducts = fetchedProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        }

        setProducts(fetchedProducts);
        onTotalProductsChange(response.data.totalCount);
      })
      .catch(error => {
        console.error('There was an error fetching the products!', error);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, [featured, sortBy]); // Gọi lại khi `featured` hoặc `sortBy` thay đổi

  const handleProductClick = (id) => {
    navigate(`/products/${id}`); 
  };

  return (
    <div className="product-container">
      {products.map(product => (
        <div
          className="product-card"
          key={product.product_id}
          onClick={() => handleProductClick(product.product_id)}
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

export default ProductFeaturedList;
