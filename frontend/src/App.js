import React from 'react';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import LandingPage from './components/landingPage/LandingPage';
import ProductList from './components/productList/ProductList';
import ProductDetails from './components/productDetails/ProductDetails';
import BarcodePage from './components/BarcodePage/BarcodePage.js';
import BarcodeScanner from './components/BarcodeScanner.js';
import NotFoundPage from './components/NotFoundPage.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function App() {
  return (
    <Router>
      <div className="App">
 
        {/* this is main section  */}
        <main>
        <Routes>
            <Route exact path="/" element={<LandingPage />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/products/:id/barcode" element={<BarcodePage />} />
            <Route path="/barcodeScanner" element={<BarcodeScanner />} />
            <Route path="*" element={<NotFoundPage />} /> 
            {/* if address not matches any of the above, redirects */}
        </Routes>
        </main>

        <footer>{/*  this is footer section  */}
        <p>&copy; 2024 Machhan Products. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
