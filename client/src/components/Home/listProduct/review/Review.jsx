// src/components/review/Review.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Review.scss';
import { FaStar } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';

const Review = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/products/${productId}/reviews`);
        setReviews(response.data);
        calculateAverageRating(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [productId]);

  const calculateAverageRating = (reviews) => {
    if (reviews.length > 0) {
      const total = reviews.reduce((sum, review) => sum + review.rating, 0);
      setAverageRating((total / reviews.length).toFixed(1));
    }
  };

  const handleAddReview = async () => {
    if (!rating || !comment) {
      toast.error('Please provide both a rating and a comment.');
      return;
    }

    try {
      const { data } = await axios.post(`http://localhost:5000/products/${productId}/reviews`, {
        userId: 3,
        rating,
        comment,
      });
      toast.success('Review added successfully!');
      setReviews((prev) => [...prev, data]);
      calculateAverageRating([...reviews, data]);
      setRating(0);
      setComment('');
    } catch (error) {
      console.error('Error adding review:', error);
      toast.error('Failed to add review.');
    }
  };

  return (
    <div className="review-container">
      <ToastContainer />
      <h3>Customer Reviews</h3>
      <div className="average-rating">
        <span>Average Rating: {averageRating} </span>
        <FaStar color="#ffc107" />
      </div>

      <div className="review-list">
        {reviews.map((review, index) => (
          <div key={index} className="review-item">
            <div className="review-rating">
              {[...Array(5)].map((star, i) => (
                <FaStar key={i} color={i < review.rating ? '#ffc107' : '#e4e5e9'} />
              ))}
            </div>
            <p className="review-comment">{review.comment}</p>
            <span className="review-date">{new Date(review.created_at).toLocaleDateString()}</span>
          </div>
        ))}
      </div>

      <div className="add-review">
        <h4>Add Your Review</h4>
        <div className="rating-input">
          {[...Array(5)].map((star, i) => (
            <FaStar
              key={i}
              color={i < rating ? '#ffc107' : '#e4e5e9'}
              onClick={() => setRating(i + 1)}
              style={{ cursor: 'pointer' }}
            />
          ))}
        </div>
        <textarea
          placeholder="Write your review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button onClick={handleAddReview}>Submit Review</button>
      </div>
    </div>
  );
};

export default Review;
