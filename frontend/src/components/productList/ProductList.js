import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import './ProductList.css';
import axios from 'axios';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
     
      
      const fetchData = async () => {
        try {
          const response = await axios.get('api/productsList');
          
          if (!response.data) {
            
            throw new Error('Network response was not ok');
          }
          
          setProducts(response.data);
        } catch (error) {
          console.error('Error fetching Machhanproducts:', error);
        }
      };
    
      fetchData();
    }, []);
  
  

  

  return (
    <div className="product-list">
  <h2>Product List</h2>
  <ul className="product-list">
    {products.map(product => (
      <li key={product.productID} className="product-card">
        <img src={product.image} alt={product.name} className="product-image" />
        <div className="product-details">
          <h3 className="product-name">{product.productName}</h3>
          <p className="product-brand">Brand: {product.brandName}</p>
          <p className="product-price">Price: ${product.price}</p>
          <button className="view-details-button">
            <Link to={`/products/${product.productID}`}>View Details</Link>
          </button>
        </div>
      </li>
    ))}
  </ul>
</div>

  );
}

export default ProductList;
