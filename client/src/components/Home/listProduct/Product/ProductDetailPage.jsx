import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ProductDetailPage.scss';
import { FaHeart } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [isFavourite, setIsFavourite] = useState(false);
  const [quantity, setQuantity] = useState(1);

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

  const handleAddToCart = async () => {
    if (!product) {
      toast.error('Product details not available.');
      return;
    }
    
    if (!selectedSize || !selectedColor) {
      toast.error('Please select both size and color.');
      return;
    }
  
    try {
      const { data } = await axios.post('http://localhost:5000/add-to-cart', {
        userId: 3,
        productId: product.product_id,
        size: selectedSize,
        color: selectedColor,
        quantity,
      });
      toast.success(data.message); // Show success notification
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

    if (!selectedSize || !selectedColor) {
      toast.error('Please select both size and color.');
      return;
    }
  
    try {
      const { data } = await axios.post('http://localhost:5000/add-to-wishlist', {
        userId: 3,
        productId: product.product_id,
        size: selectedSize,
        color: selectedColor,
        quantity,
      });
      toast.success(data.message); // Hiển thị thông báo thành công
      setIsFavourite(!isFavourite); // Cập nhật trạng thái yêu thích
    } catch (error) {
      console.error('Error adding to wishlist:', error.response?.data || error);
      toast.error(`Failed to add product to wishlist: ${error.response?.data?.message || error.message}`);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  if (!product) return <div>Product not found.</div>;

  const sizeList = product.size ? product.size.split(';').map((s) => s.trim()) : [];
  const colorList = product.list_color ? product.list_color.split(';').map((c) => c.trim()) : [];

  return (
    <div className="product-detail-container">
      <ToastContainer /> {/* Add ToastContainer to render notifications */}
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
        <button className="wishlist" onClick={handleToggleFavourite}>
          {isFavourite ? 'Unfavourite' : 'Favourite'} 
          <FaHeart className={`icon ${isFavourite ? 'favourited' : ''}`} /> 
        </button>

        <p className="product-description">{product.description}</p>
        <p className="product-description-country">{product.product_descriptionCountryOrigin}</p>
      </div>
    </div>
  );
};

export default ProductDetailPage;
