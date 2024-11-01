import React, { useState, useEffect } from "react";
// import axios from "axios";
import axios from "../../../../utils/axios.customize";
import "./Review.scss";

const Review = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null); // State to hold the timeout ID
  const [error, setError] = useState({ comment: false, rating: false }); // State to track errors

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/reviews/${productId}`
      );
      setReviews(response.data);
    } catch {
      showNotification("Failed to fetch reviews.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleAddReview = async () => {
    // Reset errors
    setError({ comment: false, rating: false });

    // Cảnh báo nếu không chọn sao hoặc không nhập bình luận
    let hasError = false;
    if (!comment.trim()) {
      setError((prev) => ({ ...prev, comment: true }));
      hasError = true;
    }
    if (rating === 0) {
      setError((prev) => ({ ...prev, rating: true }));
      hasError = true;
    }

    if (hasError) {
      return; // Dừng nếu có lỗi
    }

    try {
      const { data } = await axios.post("http://localhost:5000/add-review", {
        userId: 3, // Demo user ID
        productId,
        rating,
        comment,
      });
      showNotification(data.message, "success");
      setComment("");
      setRating(0);
      fetchReviews();
    } catch {
      showNotification("Failed to add review.", "error");
    }
  };

  // Function to display notifications
  const showNotification = (message, type) => {
    // Clear previous timeout if it exists
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    setNotification({ message, type });

    // Set a new timeout to clear the notification after 2 seconds
    const newTimeoutId = setTimeout(() => setNotification(null), 2000);
    setTimeoutId(newTimeoutId);
  };

  return (
    <div className="review-container">
      <h3>Customer Reviews</h3>

      {loading ? (
        <p>Loading reviews...</p>
      ) : reviews?.length === 0 ? (
        <p>No reviews yet. Be the first to leave a review!</p>
      ) : (
        reviews?.map((review) => (
          <div key={review.review_id} className="review">
            <p>
              <strong>{review.username}</strong> -
              <span className="stars">{"★".repeat(review.rating)}</span>
            </p>
            <p>{review.comment}</p>
            <p className="review-date">
              {new Date(review.review_date).toLocaleString()}
            </p>
          </div>
        ))
      )}

      <div className="add-review">
        <h4>Add Your Review</h4>

        <div
          className="star-rating"
          style={{ color: error.rating ? "red" : "inherit" }}
        >
          {[1, 2, 3, 4, 5]?.map((star) => (
            <span
              key={star}
              className={`star ${star <= (hover || rating) ? "filled" : ""}`}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
            >
              ★
            </span>
          ))}
        </div>
        {error.rating && (
          <p style={{ color: "red" }}>Please provide a rating.</p>
        )}

        <textarea
          placeholder="Write your comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          style={{ borderColor: error.comment ? "red" : "inherit" }}
        />
        {error.comment && (
          <p style={{ color: "red" }}>Please enter a comment.</p>
        )}

        <button onClick={handleAddReview}>Submit Review</button>

        {notification && (
          <div
            className={`notification ${notification.type}`}
            style={{ marginTop: "10px" }}
          >
            {notification.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default Review;
