const express = require("express");
const mongoose = require("mongoose");
const app = express();
const generateRandomData=require('./randomData');
const PORT = process.env.PORT || 5000;

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


// Routes

app.get("/", (req, res) => {
  res.send("Welcome to the backend server");
});

app.get("/api/productsList", async(req, res) => {
  try{
    const products=await Product.find().select('productID productName brandName price');
    res.json(products); 
  }catch(error){
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
  }
);

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


app.get("/api/products/:id", async (req, res) => {
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
