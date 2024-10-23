import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductList.scss';
import { useNavigate, useLocation } from 'react-router-dom';

const ProductList = ({ category, onTotalProductsChange, sortBy }) => {
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
        let fetchedProducts = response.data.products;

        // Kiểm tra giá trị sortBy và áp dụng sắp xếp hoặc lọc dữ liệu
        if (sortBy === 'featured') {
          // Sắp xếp sản phẩm sao cho những sản phẩm có `pro_message_list` lên trước
          fetchedProducts = fetchedProducts.sort((a, b) => {
            if (a.pro_message_list && !b.pro_message_list) return -1;
            if (!a.pro_message_list && b.pro_message_list) return 1;
            return 0; // Nếu cả hai đều có hoặc đều không có, giữ nguyên thứ tự
          });
        } else if (sortBy === 'price-high-low') {
          fetchedProducts = fetchedProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        } else if (sortBy === 'price-low-high') {
          fetchedProducts = fetchedProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        } else if (sortBy === 'newest') {
          // Sắp xếp theo newest với ưu tiên các sản phẩm có pro_message_list là "Just In"
          fetchedProducts = fetchedProducts.sort((a, b) => {
            if (a.pro_message_list === "Just In" && b.pro_message_list !== "Just In") return -1;
            if (a.pro_message_list !== "Just In" && b.pro_message_list === "Just In") return 1;

            // Nếu không phải "Just In", sắp xếp theo release_date (mới nhất trước)
            
          });
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
  }, [category, location.search, sortBy]); // Gọi lại khi có thay đổi trong category, searchTerm hoặc sortBy

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
