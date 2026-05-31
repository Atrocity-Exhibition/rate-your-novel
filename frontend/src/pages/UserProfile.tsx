import React from 'react';
import { useParams } from 'react-router-dom';

const UserProfile = () => {
  const { userId } = useParams<{ userId: string }>();

  return (
    <div className="user-profile-page">
      <div className="profile-header">
        <img src="/placeholder-avatar.png" alt="Profile Avatar" />
        <div className="profile-info">
          <h1>User Name</h1>
          <p className="username">@username</p>
          <p className="bio">User bio would go here</p>
        </div>
      </div>

      <div className="profile-stats">
        <div className="stat">
          <span className="stat-value">42</span>
          <span className="stat-label">Novels Rated</span>
        </div>
        <div className="stat">
          <span className="stat-value">15</span>
          <span className="stat-label">Reviews</span>
        </div>
        <div className="stat">
          <span className="stat-value">28</span>
          <span className="stat-label">In Reading List</span>
        </div>
      </div>

      <div className="profile-content">
        <div className="reading-list">
          <h2>Reading List</h2>
          <p>User's saved novels would be displayed here...</p>
        </div>

        <div className="user-reviews">
          <h2>User Reviews</h2>
          <p>User's reviews would be displayed here...</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
