import React, { useEffect, useState } from 'react';
import { Button, Spinner, Form } from 'react-bootstrap';
import axios from 'axios';
import './WishlistPage.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [operationLoading, setOperationLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userId] = useState(3);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/wishlist/${userId}`);
        setWishlist(response.data || []);
      } catch (err) {
        console.error('Error fetching wishlist:', err.message);
        setError('Error fetching wishlist.');
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchWishlist();
  }, [userId]);

  const handleMoveToBag = async (product) => {

    setOperationLoading(true); // Start loading

    try {
      const { data } = await axios.post('http://localhost:5000/move-to-cart', {
        userId,
        productId: product.product_id,
        size: product.size,
        color: product.image,
        quantity,
      });

      toast.success(data.message); // Show success message

      // Remove product from wishlist
      setWishlist((prevWishlist) =>
        prevWishlist.filter((item) => item.wishlist_id !== product.wishlist_id)
      );
    } catch (error) {
      console.error('Error moving product to cart:', error.response?.data || error);
      toast.error('Failed to add product to cart.');
    } finally {
      setOperationLoading(false); // Stop loading
    }
  };

  const handleRemove = async (wishlistId) => {
    try {
      await axios.delete(`http://localhost:5000/api/wishlist/${userId}/${wishlistId}`);
      setWishlist((prevWishlist) => prevWishlist.filter((item) => item.wishlist_id !== wishlistId));
      toast.info('Product removed from wishlist.');
    } catch (error) {
      console.error('Error removing item:', error.message);
      toast.error('Failed to remove item from wishlist.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="wishlist-container">
      <ToastContainer />
      <h1>Favourites</h1>

      {wishlist.length === 0 ? (
        <div className="text-center">
          <p>No products in wishlist.</p>
          <Button variant="primary" href="/products-men/Shoe">Shop Now</Button>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((product) => (
            <div key={product.wishlist_id} className="wishlist-item">
              <img src={product.image} alt={product.name} />
              <h4>{product.name}</h4>
              <h4>{product.category}</h4>
              <p>
                {new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                }).format(product.price)}
              </p>

              {product.isSoldOut ? (
                <button className="sold-out">Sold Out</button>
              ) : (
                <div>
                  <Button
                    className="add-to-bag"
                    onClick={() => handleMoveToBag(product)}
                    disabled={operationLoading}
                  >
                    {operationLoading ? <Spinner animation="border" size="sm" /> : 'Add to Bag'}
                  </Button>
                  <Button
                    className="remove-wishlist"
                    onClick={() => handleRemove(product.wishlist_id)}
                  >
                    Remove
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
