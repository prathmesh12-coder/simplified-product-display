import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ProductList.css';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import {Button} from 'react-bootstrap';


function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
     
      
      const fetchData = async () => {
        try {
          const response = await axios.get('/api/productsList');
          
          if (!response.data) {
            
            throw new Error('Network response was not ok');
          }
          console.log('axios response machhan products: ',response.data);
          setProducts(response.data);
        } catch (error) {
          console.error('Error fetching Machhanproducts:', error);
        }
      };
    
      fetchData();
    }, []);
  
    // Generate random placeholder image URL for each product
const generatePlaceholderImage = (productName) => {

  const encodedProductName = encodeURIComponent(productName);
  return `https://via.placeholder.com/150/${Math.random().toString(16).slice(2, 8)}/FFFFFF/?text=${encodedProductName}`;
};

 
  if (!products || !Array.isArray(products)) {
  console.log('Products:', products);
  return <div>Loading...</div>; // Render a loading message when products are being fetched or if products is not an array
}
  return (
    
    <div className="product-list">
  <div className="product-list-heading"> {/* Center the row horizontally */}
    <h2>Available Items</h2>
  </div>
      <div className="row">
        {products.map(product => (
          <div key={product.productID} className="col-lg-3 mb-4">
            <Card>
              {/* <Card.Img variant="top" src={product.image} alt={product.name} /> */}
               <Card.Img variant="top" src={generatePlaceholderImage(product.productName)} alt={product.name} />
              <Card.Body>
                <Card.Title>{product?.productName}</Card.Title>
                <Card.Text>
                  Brand: {product.brandName}
                </Card.Text>
                <Card.Text>
                  Price: ${product.price}
                </Card.Text>
                <div className='card-buttons'>
                <Button variant="primary">
                  <Link to={`/products/${product.productID}`} className="text-white">View Details</Link>
                </Button>
                <Button variant="info">
                  <Link to={`/products/${product.productID}/barcode`} className="text-white">Barcode</Link>
                </Button>
                </div>

                
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  

  );
}

export default ProductList;
