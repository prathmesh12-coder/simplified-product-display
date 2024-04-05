const bwipjs = require('bwip-js');

// Function to generate barcode image data
const generateBarcode = async (productDetails) => {
    // Generate barcode options based on product details
    const barcodeOptions = {
        bcid: 'code128',  // Barcode type: Code 128
        text: `${productDetails.productName}`,  // Text to encode in the barcode (e.g., product ID)
        
        scale: 3,  // Scaling factor for the barcode
        height: 10,  // Height of the barcode in millimeters
        includetext: true,  // Include human-readable text below the barcode
    };

    // Generate barcode image data asynchronously
    return new Promise((resolve, reject) => {
        bwipjs.toBuffer(barcodeOptions, (err, png) => {
            if (err) {
                reject(err);  // Handle error if barcode generation fails
            } else {
                resolve(png);  // Return the generated barcode image data
            }
        });
    });
};

module.exports = generateBarcode;
