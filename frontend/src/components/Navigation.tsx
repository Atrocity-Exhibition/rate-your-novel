import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          📚 Rate Your Novel
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/browse" className="nav-link">
              Browse
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/profile/me" className="nav-link">
              My Profile
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
