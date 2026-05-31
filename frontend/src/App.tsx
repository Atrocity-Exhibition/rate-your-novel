import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navigation from '@components/Navigation';
import Home from '@pages/Home';
import Browse from '@pages/Browse';
import NovelDetail from '@pages/NovelDetail';
import UserProfile from '@pages/UserProfile';

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/novel/:id" element={<NovelDetail />} />
        <Route path="/profile/:userId" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
