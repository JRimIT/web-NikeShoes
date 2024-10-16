import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ProductDetailPage.scss';
import { FaHeart } from "react-icons/fa";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        console.error('Error fetching product details:', err);
        setError('Error fetching product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Split sizes and colors
  const sizeList = product?.size ? product.size.split(';').map((size) => size.trim()) : [];
  const colorList = product?.list_color ? product.list_color.split(';').map((color) => color.trim()) : [];

  return (
    <div className="product-detail-container">
      <div className="image-gallery">
        <div className="main-image">
          <img src={selectedColor || product.primary_image} alt={product.name} />
        </div>  
      </div>

      <div className="product-info">
        <h4>{product.pro_message_list}</h4>
        <h5>{product.name}</h5>
        <h5>{product.category}</h5>
        <p className="price">
          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
        </p>

        <h3>Select Color</h3>
        <div className="color-selection">
          {colorList.map((color, index) => (
            <div
              key={index}
              className={`color-swatch ${selectedColor === color ? 'selected' : ''}`}
              style={{ backgroundImage: `url(${color})` }} // Use color as background image
              onClick={() => {
                setSelectedColor(color);
                setProduct((prev) => ({ ...prev, primary_image: color })); // Change primary image to selected color image
              }}
            />
          ))}
        </div>

        <h3>Select Size</h3>
        <div className="size-selection">
          {sizeList.map((size, index) => (
            <div
              key={index}
              className={`size-box ${selectedSize === size ? 'selected' : ''}`}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </div>
          ))}
        </div>
        
        <button className="add-to-cart">Add to Cart</button>
        <button className="wishlist">
        Favourite
        <FaHeart className="icon" icon={ FaHeart} /> 
        </button>

        <p className="product-description">{product.description}</p>

        <p className="product-description-country">{product.product_descriptionCountryOrigin}</p>

        
      </div>
    </div>
  );
};

export default ProductDetailPage;
