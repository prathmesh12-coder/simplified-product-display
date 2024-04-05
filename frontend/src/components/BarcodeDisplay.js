import React from 'react';

const BarcodeDisplay = ({ barcodeImageData }) => {
  // Convert the barcode image data to a base64 string
  // const base64Image = `data:image/png;base64,${Buffer.from(barcodeImageData).toString('base64')}`;
  const imageUrl = `data:image/png;base64,${barcodeImageData}`;

  return (
    <div>
          
      <img src={imageUrl} alt="Barcode" />
    </div>
  );
};

export default BarcodeDisplay;
