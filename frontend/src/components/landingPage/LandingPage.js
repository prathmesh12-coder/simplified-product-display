// LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="landing-page">
      <h1>Welcome to Machhan Products Store</h1>
      <p>Explore our collection of products.</p>
      <Link to="/products">
        <button>Show Product List</button>
      </Link>
    </div>
  );
}

export default LandingPage;
