import React from 'react';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import LandingPage from './components/landingPage/LandingPage';
import ProductList from './components/productList/ProductList';
import ProductDetails from './components/productDetails/ProductDetails';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function App() {
  return (
    <Router>
      <div className="App">
        <main>
        <Routes>
            <Route exact path="/" element={<LandingPage />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetails />} />
          </Routes>
        </main>
        <footer>
        <p>&copy; 2024 Machhan Products. All rights reserved.</p>
      </footer>
      </div>
    </Router>
  );
}

export default App;
