import React from 'react';

const Home = () => {
  return (
    <div className="home-page">
      <header className="hero">
        <h1>Welcome to Rate Your Novel</h1>
        <p>Discover, rate, and review web novels with a community of readers</p>
        <button className="btn-primary btn-lg">Start Browsing</button>
      </header>

      <section className="featured">
        <h2>Featured Novels</h2>
        <p>Loading featured novels...</p>
      </section>

      <section className="features">
        <h2>What We Offer</h2>
        <div className="feature-grid">
          <div className="feature-item">
            <h3>📚 Browse Novels</h3>
            <p>Explore thousands of web novels with detailed information</p>
          </div>
          <div className="feature-item">
            <h3>⭐ Rate & Review</h3>
            <p>Share your opinions and read reviews from other readers</p>
          </div>
          <div className="feature-item">
            <h3>💾 Save for Later</h3>
            <p>Build your personal reading list and track your progress</p>
          </div>
          <div className="feature-item">
            <h3>👥 Community</h3>
            <p>Connect with fellow novel enthusiasts and share recommendations</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
