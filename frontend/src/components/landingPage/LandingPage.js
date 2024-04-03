// LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './LandingPage.css'

function LandingPage() {
  return (
    <div className="landing-page">
      <header>
        <h1>Welcome to MacchanStore</h1>   
      </header>
      <section className="hero">
        <div className="hero-content">
          <h2>Discover Amazing Products</h2>
          <p>Explore our collection of high-quality products that will enhance your life.</p>
          <Link to="/products">
         <Button variant="primary">Shop Now</Button>{' '}
         </Link>
          
        </div>
      </section>
     
    </div>
    // {/* <div className="landing-page">
    //   <h1>Welcome to Machhan Products Store</h1>
    //   <p>Explore our collection of products.</p>
    //   <Link to="/products">
    //     <Button variant="primary">Show Product List</Button>{' '}
    //   </Link>
    // </div> */}
  );
}

export default LandingPage;
