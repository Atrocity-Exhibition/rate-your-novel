import React from 'react';

interface NovelCardProps {
  id: string;
  title: string;
  author: string;
  coverUrl?: string;
  rating: number;
  reviewCount: number;
}

const NovelCard: React.FC<NovelCardProps> = ({
  id,
  title,
  author,
  coverUrl,
  rating,
  reviewCount,
}) => {
  return (
    <div className="novel-card">
      {coverUrl && <img src={coverUrl} alt={title} className="novel-cover" />}
      <div className="novel-info">
        <h3>{title}</h3>
        <p className="author">by {author}</p>
        <div className="rating">
          <span className="stars">⭐ {rating.toFixed(1)}</span>
          <span className="review-count">({reviewCount} reviews)</span>
        </div>
      </div>
    </div>
  );
};

export default NovelCard;
