import React, { useState } from 'react';

interface RatingProps {
  novelId: string;
  onSubmit: (rating: number, review: string) => void;
}

const RatingForm: React.FC<RatingProps> = ({ novelId, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }
    onSubmit(rating, review);
    setRating(0);
    setReview('');
  };

  return (
    <form onSubmit={handleSubmit} className="rating-form">
      <div className="rating-input">
        <label>Rate this novel:</label>
        <div className="stars-input">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className={`star ${rating >= star ? 'filled' : ''}`}
              onClick={() => setRating(star)}
            >
              ⭐
            </button>
          ))}
        </div>
      </div>

      <div className="review-input">
        <label htmlFor="review">Write a review (optional):</label>
        <textarea
          id="review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Share your thoughts about this novel..."
          rows={4}
        />
      </div>

      <button type="submit" className="btn-primary">
        Submit Rating
      </button>
    </form>
  );
};

export default RatingForm;
