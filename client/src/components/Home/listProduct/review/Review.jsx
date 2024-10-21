// frontend/src/components/review/Review.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Review.scss';

const Review = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/reviews/${productId}`);
      setReviews(response.data);
    } catch (error) {
      toast.error('Failed to fetch reviews.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddReview = async () => {
    if (!comment || rating === 0) {
      toast.error('Please provide a rating and a comment.');
      return;
    }

    try {
      const { data } = await axios.post('http://localhost:5000/add-review', {
        userId: 3, // Demo user ID
        productId,
        rating,
        comment,
      });
      toast.success(data.message);
      setComment('');
      setRating(0);
      fetchReviews();
    } catch {
      toast.error('Failed to add review.');
    }
  };

  return (
    <div className="review-container">
      <ToastContainer />
      <h3>Customer Reviews</h3>

      {loading ? (
        <p>Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p>No reviews yet. Be the first to leave a review!</p>
      ) : (
        reviews.map((review) => (
          <div key={review.review_id} className="review">
            <p>
              <strong>{review.username}</strong> - 
              <span className="stars">{'★'.repeat(review.rating)}</span>
            </p>
            <p>{review.comment}</p>
            <p className="review-date">{new Date(review.review_date).toLocaleString()}</p>
          </div>
        ))
      )}

      <div className="add-review">
        <h4>Add Your Review</h4>

        <div className="star-rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star ${star <= (hover || rating) ? 'filled' : ''}`}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
            >
              ★
            </span>
          ))}
        </div>

        <textarea
          placeholder="Write your comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button onClick={handleAddReview}>Submit Review</button>
      </div>
    </div>
  );
};

export default Review;
