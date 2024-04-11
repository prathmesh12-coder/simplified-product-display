const express = require("express");
const mongoose = require("mongoose");
const app = express();
// const generateRandomData=require('./randomDataGenerator.js');
const generateBarcode=require('./barcodeGenerator.js');
const PORT = process.env.PORT || 5000;



//cloud collection database URL
const dbURI = "mongodb+srv://Prathmesh:prathmesh12345@cluster0.2zcanyt.mongodb.net/MachhanProductsDB?retryWrites=true&w=majority&appName=Cluster0";


// Define the schema for the product
const productSchema = new mongoose.Schema({
  productID: { type: String, required: true },
  productName: { type: String, required: true },
  brandName: String,
  price: { type: Number, required: true },
  description: String,
  review:String,
  // Additional fields can be added here
},{collection:'MachhanProducts'});

// Create a model based on the schema
const Product = mongoose.model('Product', productSchema);

// Connect to MongoDB database
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async() => {
  console.log('Connected to MongoDB');

  //250 items were inserted to cloud collection "MachhanProducts" !! here


  // const products=generateRandomData(250);
  // await Product.insertMany(products);
  // console.log('products inserted successfully');
}).catch((err)=>{
  console.error('MongoDB connection error:', err);
}
)


const fetchProductDetails = async (productId) => {
  try {
    // Implement logic to fetch product details from your database or API
    // For example, you can use Mongoose to find the product by ID
    const productDetails = await Product.findOne({ productID: productId }, 'productID productName price');

    if (!productDetails) {
      throw new Error('Product not found');
    }
    // Return the product details
    return productDetails;
  } catch (error) {
    console.error('Error fetching product details:', error);
    throw new Error('Error fetching product details');
  }
};


// Routes

app.get("/", (req, res) => { //this is root directory for our backend
  res.send("Welcome to the backend server");
});

 
app.get("/api/productsList", async(req, res) => {//get all the available products in the machhan store
  try{
    const products=await Product.find().select('productID productName brandName price');
    res.json(products); 
  }catch(error){
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
  }
);

app.get("/api/productsList/:id", async (req, res) => {//get details of the specific requested product
  const productId = req.params.id;
  try {
  
    const product = await Product.findOne({ productID: productId });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }else{
      res.json(product);
     }
    
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get('/api/productsList/:id/barcode', async (req, res) => {//get the barcode for the requested product 
  try {
    const productId = req.params.id;
    // Fetch product details from the database or an API based on the productId
    const productDetails = await fetchProductDetails(productId);
    // Generate the barcode image data
    const barcodeImageData = await generateBarcode(productDetails);

    // Convert the Buffer object to a base64-encoded string
    const base64Image = Buffer.from(barcodeImageData).toString('base64');
    console.log(`genereted image code for ${productDetails.productName}`,base64Image);
    // Send the base64-encoded image data as the response
    res.send(base64Image);
  } catch (error) {
    // Log any errors that occur during barcode generation
    console.error('Error generating barcode:', error);
    // Send an error response
    res.status(500).json({ error: 'Error generating barcode' });
  }
});




// This will return all Machhan products details available in our cloud collection 
app.get("/api/AllProductsDetails", async(req, res) => {
  try{
    const products=await Product.find();
    res.json(products); 
  }catch(error){
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
  }
);


// Error handling middleware function 
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

// Handle 404 errors
app.use((req, res, next) => {
  res.status(404).send("Page not found");
});



//listening on the port
app.listen(PORT,()=>{
  console.log(`Server is listening at port : ${PORT}`);
})
