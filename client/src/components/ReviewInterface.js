import React, { useState } from 'react';
import { Star } from 'lucide-react';

const ReviewInterface = ({ farmerName }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="review-success">
        <h4>Thank you for your feedback!</h4>
        <p>Your review for {farmerName} has been submitted.</p>
      </div>
    );
  }

  return (
    <div className="review-container">
      <h4>Rate your experience with {farmerName}</h4>
      <p className="text-secondary">Please rate the produce quality and freshness.</p>
      
      <form onSubmit={handleSubmit} className="review-form">
        <div className="star-rating">
          {[...Array(5)].map((star, index) => {
            index += 1;
            return (
              <button
                type="button"
                key={index}
                className={index <= (hover || rating) ? 'star-btn on' : 'star-btn off'}
                onClick={() => setRating(index)}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(rating)}
              >
                <Star className="star-icon" fill={index <= (hover || rating) ? "currentColor" : "none"} />
              </button>
            );
          })}
        </div>
        
        <div className="form-group">
          <textarea
            placeholder="Tell us about your experience..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="input-field review-textarea"
            rows="3"
            required
          ></textarea>
        </div>
        
        <button type="submit" className="btn-secondary" disabled={rating === 0}>
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewInterface;
