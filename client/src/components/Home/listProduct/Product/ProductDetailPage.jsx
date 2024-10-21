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

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/products/${id}`);
        if (response.data) {
          setProduct(response.data);
        } else {
          throw new Error('Product not found');
        }
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
      toast.error('Please select size.');
      return;
    }

    if(!selectedColor){
      toast.error('Please select color.');
    }

    try {
      const { data } = await axios.post('http://localhost:5000/add-to-cart', {
        userId: 3,
        productId: product.product_id,
        size: selectedSize,
        color: selectedColor,
        quantity,
      });
      toast.success(data.message);
    } catch (error) {
      console.error('Error adding to cart:', error.response?.data || error);
      toast.error('Failed to add product to cart.');
    }
  };

  const handleAddToWishlist = async () => {
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
      toast.success(data.message);
    } catch (error) {
      console.error('Error adding to wishlist:', error.response?.data || error);
      toast.error(`Failed to add product to wishlist: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size);
    toast.dismiss(); // Dismiss any previous error notifications
  };

  const handleColorClick = (color) => {
    setSelectedColor(color);
    toast.dismiss(); // Dismiss any previous error notifications
    // Update product image without causing undefined errors
    if (product) {
      setProduct((prevProduct) => ({
        ...prevProduct,
        primary_image: color
      }));
    }
  };

  // Safety checks for rendering
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>Product not found.</div>;

  const sizeList = product.size ? product.size.split(';').map((s) => s.trim()) : [];
  const colorList = product.list_color ? product.list_color.split(';').map((c) => c.trim()) : [];

  return (
    <>
      <div className="product-detail-container">
        <ToastContainer />
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
          <h5 className="category">{product.category}</h5>
          <p className="price">
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
          </p>
  
          <h3>Select Color</h3>
          <div className="color-selection">
            {colorList.map((color, index) => (
              <div
                key={index}
                className={`color-swatch ${selectedColor === color ? 'selected' : product.primary_image}`}
                style={{ backgroundImage: `url(${color})` }}
                onClick={() => handleColorClick(color)}
              />
            ))}
          </div>
  
          <h3>Select Size</h3>
          <div className="size-selection">
            {sizeList.map((size, index) => (
              <div
                key={index}
                className={`size-box ${selectedSize === size ? 'selected' : ''}`}
                onClick={() => handleSizeClick(size)}
              >
                {size}
              </div>
            ))}
          </div>
  
          <button className="add-to-cart" onClick={handleAddToCart}>Add to Cart</button>
          <button className="wishlist" onClick={handleAddToWishlist}>
            Favourite <FaHeart className="icon" />
          </button>
  
          <p className="product-description">{product.description}</p>
          <p className="product-description-country">{product.product_descriptionCountryOrigin}</p>
        </div>
      </div>
      <Review productId={id} />
      <Footer />
    </>
  );
};

export default ProductDetailPage;
