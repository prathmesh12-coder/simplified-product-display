import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card,Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './ProductDetails.css';



function ProductDetails() {
  const { id } = useParams();
  // const location = useLocation();
  // const { productName, brandName, price, description, review } = location?.state;
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
  const generatePlaceholderImage = (productName) => {

const encodedProductName = encodeURIComponent(productName);
return `https://via.placeholder.com/150/${Math.random().toString(16).slice(2, 8)}/FFFFFF/?text=${encodedProductName}`;
};
  
  

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    // <div className="product-details">
    //   <h2>Product Details</h2>
    //   <h3>{product.productName}</h3>
    //   <p>Brand: {product.brandName}</p>
    //   <p>Price: ${product.price}</p>
    //   <p>Description: {product.description}</p>
    //   <p>Review: {product.review}</p>
    // </div>


    <div className="container">
       <div className="page-heading"> {/* Center the row horizontally */}
    <h2>Product Description</h2>
  </div>
      <div className="row justify-content-center">
        <div className="col-lg-6">

          <Card>
          <div className='overall-card'>
          <div className='overall-card-image'>
          <Card.Img variant="top" src={generatePlaceholderImage(product.productName)} alt={product.name} />

          </div>
          <div className='overall-card-body'>
          <Card.Body>
              <Card.Title>{product.productName}</Card.Title>
              <Card.Text>
                Brand: {product.brandName}
              </Card.Text>
              <Card.Text>
                Price: ${product.price}
              </Card.Text>
              <Card.Text>
                Description: {product.description}
              </Card.Text>
              <Card.Text>
                Review: {product.review}
              </Card.Text>
              <Button variant="primary">
                <Link to="/products" className="text-white">Back to Products</Link>
              </Button>
            </Card.Body>
          </div>
          </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
