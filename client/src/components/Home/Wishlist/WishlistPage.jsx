import React, { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import axios from "../../../utils/axios.customize";
import { FaShoppingCart, FaTrashAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./WishlistPage.scss";

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [operationLoading, setOperationLoading] = useState(false);
  const [error, setError] = useState(null);
  const [quantity] = useState(1);
  const [userId, setUserId] = useState(null); // Initialize userId as null

  // Fetch the wishlist when userId is available
  useEffect(() => {
    const fetchWishlist = async () => {
      // if (!userId) return;
      try {
        console.log(userId);
        const response = await axios.get(
          `http://localhost:5000/api/wishlist/${userId}`
        );
        setWishlist(response.data || []);
      } catch (err) {
        console.error("Error fetching wishlist:", err.message);
        setError("Error fetching wishlist.");
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [userId]);

  // Get user ID from localStorage
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user")); // Get user data from localStorage
    if (userData && userData.user_id) {
      setUserId(userData.user_id); // Set userId from userData
      console.log(userData.user_id);
    }
  }, []);

  // Move product to cart
  const handleMoveToBag = async (product) => {
    setOperationLoading(true); // Start loading

    try {
      const { data } = await axios.post("http://localhost:5000/move-to-cart", {
        userId: userId,
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
      console.error(
        "Error moving product to cart:",
        error.response?.data || error
      );
      console.log(error);
      toast.error("Failed to add product to cart.");
    } finally {
      setOperationLoading(false); // Stop loading
    }
  };

  // Remove item from wishlist
  const handleRemove = async (wishlistId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/wishlist/${userId}/${wishlistId}`
      );
      setWishlist((prevWishlist) =>
        prevWishlist.filter((item) => item.wishlist_id !== wishlistId)
      );
      toast.info("Product removed from wishlist.");
    } catch (error) {
      console.error("Error removing item:", error.message);
      toast.error("Failed to remove item from wishlist.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="wishlist-container">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick={true}
      />
      <h2>Favourites</h2>

      {wishlist.length === 0 ? (
        <div className="text-center">
          <h4>No products in favourite.</h4>
          <Button variant="primary" href="/products-men/All" className="button">
            Shop Now
          </Button>
        </div>
      ) : (
        <div
          className={`wishlist-grid ${
            wishlist.length === 1
              ? "one-item"
              : wishlist.length === 2
              ? "two-items"
              : ""
          }`}
        >
          {wishlist.map((product) => (
            <div key={product.wishlist_id} className="wishlist-item">
              <img src={product.image} alt={product.name} />
              <h4>{product.name}</h4>
              <h4>{product.category}</h4>
              <p>
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(product.price)}
              </p>

              {product.isSoldOut ? (
                <button className="sold-out">Sold Out</button>
              ) : (
                <div className="button-group">
                  <Button
                    className="icon-button"
                    onClick={() => handleMoveToBag(product)}
                    disabled={operationLoading}
                    variant="outline-success"
                  >
                    {operationLoading ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      <FaShoppingCart size={24} />
                    )}
                  </Button>
                  <Button
                    className="icon-button"
                    onClick={() => handleRemove(product.wishlist_id)}
                    variant="outline-danger"
                  >
                    <FaTrashAlt size={24} />
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
