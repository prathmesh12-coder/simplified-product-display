import React from 'react';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import LandingPage from './components/landingPage/LandingPage';
import ProductList from './components/productList/ProductList';
import ProductDetails from './components/productDetails/ProductDetails';


function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          {/* Header content goes here */
           <h4>This is heading !!</h4>
          }
        </header>
        <main>
        <Routes>
            <Route exact path="/" element={<LandingPage />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetails />} />
          </Routes>
        </main>
        <footer>
          {/* Footer content goes here */
            <h5>This is footer !!!</h5>
          }
        </footer>
      </div>
    </Router>
  );
}

export default App;
