import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ProductDetailPage.scss'; // Ensure to import the CSS

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
        {/* <div className="thumbnail-images">
          {colorList.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Color ${index + 1}`}
              className={`thumbnail ${selectedColor === url ? 'selected' : ''}`}
              onClick={() => {
                setSelectedColor(url);
                setProduct((prev) => ({ ...prev, primary_image: url })); // Change primary image to selected color image
              }}
            />
          ))}
        </div> */}
        <div className="main-image">
          <img src={selectedColor || product.primary_image} alt={product.name} />
        </div>  
      </div>

      <div className="product-info">
        <h4>{product.pro_message_list}</h4>
        <h4>{product.name}</h4>
        <h4>{product.category}</h4>
        <p className="price">
          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
        </p>

        <p className="product-description">{product.description}</p>

        <p className="product-description-country">{product.product_descriptionCountryOrigin}</p>

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
        <button className="add-to-cart">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductDetailPage;
