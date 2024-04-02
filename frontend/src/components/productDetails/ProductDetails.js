import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/productsList/${id}`);
        console.log('fetched successfully !!');
  
        if (response.status !== 200) {
          throw new Error('Network response was not ok');
        }
        
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching macchanproduct details:', error);
      }
    };
  
    fetchData();
  }, [id]);
  
  
  

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-details">
      <h2>Product Details</h2>
      <h3>{product.productName}</h3>
      <p>Brand: {product.brandName}</p>
      <p>Price: ${product.price}</p>
      <p>Description: {product.description}</p>
      <p>Review: {product.review}</p>
    </div>
  );
}

export default ProductDetails;
