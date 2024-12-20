import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
// import axios from "axios";
import axios from "../../../../utils/axios.customize";
import "./Review.scss";
import Avatar from "@mui/material/Avatar";
import { useSelector } from "react-redux";
import { IconButton, Stack } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import { GiBootKick } from "react-icons/gi";
import {
  addUserToBlackList,
  deleteAllReviewsByUserId,
  deleteReview,
  getUserById,
} from "../../../../data/api/apiService";
import ModalKickUser from "./content/ModalKickUser";

const Review = ({ productId, userId }) => {
  const [showModalKick, setShowModalKick] = useState(false);
  const [dataKickUser, setDataKickUser] = useState({});

  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null); // State to hold the timeout ID
  const [error, setError] = useState({ comment: false, rating: false });
  // State to track errors
  const navigate = useNavigate();
  const user = useSelector((state) => state.userInfo);
  useEffect(() => {
    fetchReviews();
  }, [productId, userId]);

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
    if (userId === 0) {
      navigate("/login");
    }
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
        userId: userId,
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

  const btnDeleteReview = (id) => {
    const res = deleteReview(id);
    console.log(res);
    fetchReviews();
  };

  const btnKickUser = async (userId) => {
    setShowModalKick(true);
    const dataUser = await getUserById(userId);
    console.log("Data kick: ", dataUser.data);
    setDataKickUser(dataUser.data[0]);
    // const res = addUserToBlackList(userId, reason);
    // deleteAllReviewsByUserId(userId);
    // // deleteReview(id);
    // console.log(res);
    // fetchReviews();
  };
  return (
    <>
      <div className="review-container">
        <h3>Customer Reviews</h3>
        {loading ? (
          <p>Loading reviews...</p>
        ) : reviews?.length === 0 ? (
          <p>No reviews yet. Be the first to leave a review!</p>
        ) : (
          reviews?.map((review) => (
            <div key={review.review_id} className="review">
              <p className="d-flex flex-row justify-content-between">
                <strong>
                  <Stack
                    // direction="row"
                    spacing={1}
                    display="flex"
                    flexDirection="row"
                    alignContent="center"
                    textAlign="center"
                  >
                    <Avatar
                      alt="Remy Sharp"
                      src={review.user_image}
                      className="me-2"
                    />
                    <p>{review.username} -</p>
                    {/* {review.username}- */}
                    <span className="stars">{"★".repeat(review.rating)}</span>
                  </Stack>
                </strong>{" "}
                {user && user.role_id === 2 ? (
                  <div>
                    <IconButton
                      aria-label="delete"
                      onClick={() => btnDeleteReview(review.review_id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton onClick={() => btnKickUser(review.user_id)}>
                      <GiBootKick />
                    </IconButton>
                  </div>
                ) : (
                  <></>
                )}
              </p>
              <p>{review.comment}</p>
              <p className="review-date">{review.review_date}</p>
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

          <button onClick={handleAddReview} disabled={user ? false : true}>
            {user ? (
              <>
                Submit Review <SendIcon></SendIcon>
              </>
            ) : (
              <>Please Login before Comment</>
            )}
          </button>

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
      <ModalKickUser
        show={showModalKick}
        setShow={setShowModalKick}
        dataKickUser={dataKickUser}
        fetchReviews={fetchReviews}
      ></ModalKickUser>
    </>
  );
};

export default Review;
