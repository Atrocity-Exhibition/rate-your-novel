import React from 'react';
import { useParams } from 'react-router-dom';
import RatingForm from '@components/RatingForm';

const NovelDetail = () => {
  const { id } = useParams<{ id: string }>();

  const handleRatingSubmit = (rating: number, review: string) => {
    console.log('Submitting rating:', { rating, review });
    // API call will go here
  };

  return (
    <div className="novel-detail-page">
      <div className="novel-header">
        <div className="novel-cover-section">
          <img src="/placeholder-cover.png" alt="Novel Cover" />
        </div>
        <div className="novel-info-section">
          <h1>Novel Title</h1>
          <p className="author">by Novel Author</p>
          <div className="rating-summary">
            <p className="rating-value">⭐ 4.5 / 5.0</p>
            <p className="review-count">Based on 150 reviews</p>
          </div>
          <button className="btn-secondary">Add to Reading List</button>
        </div>
      </div>

      <div className="novel-content">
        <div className="novel-description">
          <h2>Description</h2>
          <p>
            This is where the novel description would go. It contains the plot
            summary and key information about the story.
          </p>
        </div>

        <div className="novel-details">
          <h2>Details</h2>
          <ul>
            <li>
              <strong>Status:</strong> Ongoing
            </li>
            <li>
              <strong>Genre:</strong> Fantasy, Adventure
            </li>
            <li>
              <strong>Chapters:</strong> 150+
            </li>
          </ul>
        </div>

        <div className="rating-section">
          <h2>Rate This Novel</h2>
          <RatingForm novelId={id || ''} onSubmit={handleRatingSubmit} />
        </div>

        <div className="reviews-section">
          <h2>Recent Reviews</h2>
          <p>Reviews would be displayed here...</p>
        </div>
      </div>
    </div>
  );
};

export default NovelDetail;
