import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ProductDetailPage.scss';
import { FaHeart } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../../footer/Footer';
import Review from '../review/Review';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [userId, setUserId] = useState(0); // Initialize userId as null

  //fetch id for product
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/products/${id}`
        );
        setProduct(response.data);
      } catch (err) {
        console.error("Error fetching product details:", err);
        setError("Error fetching product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  //fetch id for user
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user")); // Get user data from localStorage
    if (userData && userData.user_id) {
      setUserId(userData.user_id); // Set userId from userData
      console.log(userData.user_id); // Log user_id from userData
    }
  }, [userId]);

  const handleAddToCart = async () => {
    if (!product) {
      toast.error('Product details not available.');
      return;
    }
    
    if (!selectedSize) {
      toast.error('Please select size.');
      return;
    }
  
    try {
      const { data } = await axios.post('http://localhost:5000/add-to-cart', {
        userId: userId,
        productId: product.product_id,
        size: selectedSize,
        color: (selectedColor || product.primary_image),
        quantity,
      });
      toast.success(data.message);
    } catch (error) {
      console.error('Error adding to cart:', error.response?.data || error);
      toast.error('Failed to add product to cart.');
    }
  };

  const handleToggleFavourite = async () => {
    if (!product) {
      toast.error('Product details not available.');
      return;
    }

    if (!selectedSize) {
      toast.error('Please select size.');
      return;
    }
  
    try {
      const { data } = await axios.post('http://localhost:5000/add-to-wishlist', {
        userId: userId,
        productId: product.product_id,
        size: selectedSize,
        color: (selectedColor || product.primary_image),
        quantity,
      }); 
      toast.success(data.message);
    } catch (error) {
      console.error('Error adding to wishlist:', error.response?.data || error);
      toast.error(`Failed to add product to Wishlist: ${error.response?.data?.message || error.message}`);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Split sizes and colors
  const sizeList = product?.size
    ? product.size.split(";").map((size) => size.trim())
    : [];
  const colorList = product?.list_color
    ? product.list_color.split(";").map((color) => color.trim())
    : [];

  return (
    <>
      <div className="product-detail-container">
        <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} closeOnClick={true} />
        <div className="image-gallery">
          <div className="main-image">
            <img 
              src={selectedColor || product.primary_image || '/default-image.jpg'} 
              alt={product.name || 'Product Image'} 
            />
          </div>
        </div>

        <div className="product-info">
          <h4>{product.pro_message_list}</h4>
          <h2>{product.name}</h2>
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
                style={{ backgroundImage: `url(${color})` }}
                onClick={() => {
                  setSelectedColor(color);
                  setProduct((prev) => ({ ...prev, primary_image: color })); // Update primary image
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

          <button className="add-to-cart" onClick={handleAddToCart}>Add to Cart</button>
          <button className="wishlist" onClick={handleToggleFavourite}>Favourite
            <FaHeart className="icon" />
          </button>

          <p className="product-description">{product.description}</p>
          <p className="product-description-country">{product.product_descriptionCountryOrigin}</p>
        </div>
      </div>
      <Review productId={id} userId={userId}/>
      <Footer />
    </>
  );
};

export default ProductDetailPage;
