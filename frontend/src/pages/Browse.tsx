import React, { useState } from 'react';
import NovelCard from '@components/NovelCard';

const Browse = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('rating');

  // Mock data - will be replaced with API calls
  const novels = [
    {
      id: '1',
      title: 'Sample Novel 1',
      author: 'Author Name',
      rating: 4.5,
      reviewCount: 120,
    },
    {
      id: '2',
      title: 'Sample Novel 2',
      author: 'Another Author',
      rating: 4.2,
      reviewCount: 85,
    },
  ];

  return (
    <div className="browse-page">
      <div className="browse-controls">
        <input
          type="text"
          placeholder="Search novels..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="sort-select"
        >
          <option value="rating">Highest Rated</option>
          <option value="recent">Most Recent</option>
          <option value="reviews">Most Reviewed</option>
          <option value="name">Alphabetical</option>
        </select>
      </div>

      <div className="novels-grid">
        {novels.map((novel) => (
          <NovelCard key={novel.id} {...novel} />
        ))}
      </div>
    </div>
  );
};

export default Browse;
