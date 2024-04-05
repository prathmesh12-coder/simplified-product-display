import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import BarcodeDisplay from '../BarcodeDisplay'; // Assume you have a component for displaying barcode images
import './BarcodePage.css';

const BarcodePage = () => {
  const { id } = useParams();
  const [barcodeImageData, setBarcodeImageData] = useState(null);

  const fetchBarcodeData = async (productId) => {
    try {
      const response = await axios.get(`/api/productsList/${productId}/barcode`);
      // Check if response data exists
      if (!response.data) {
        throw new Error('Network response was not ok');
      }
      // Update the state with the received barcode image data
      setBarcodeImageData(response.data);
    } catch (error) {
      console.error('Error fetching attach barcode image data:', error);
    }
  };

  useEffect(() => {
    // Call the fetchBarcodeData function to fetch barcode image data
    fetchBarcodeData(id);
  }, [id]);

  return (
    <div className='barcode-page-container'>
<div className='barcode-page'>
      {barcodeImageData && <BarcodeDisplay barcodeImageData={barcodeImageData} />}
    </div>
    <div className='barcode-page-button'>
    <Button variant="primary">
                <Link to="/products" className="text-white">Back to Products</Link>
    </Button>
    </div>
    
    </div>
    
  );
};

export default BarcodePage;
