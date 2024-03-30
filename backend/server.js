const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 5000; //this is port number on which server listening

// Connect to MongoDB database
// mongoose.connect('mongodb://localhost:27017/productDB', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => {
//     console.log('Connected to MongoDB');
// }).catch((error) => {
//     console.error('MongoDB connection error:', error);
// });



//hardcore dummy data
const items = [
  { id: 1, name: "Jeans", price: 200, description: "this is jeans pant" },
  {
    id: 2,
    name: "T shirt ",
    price: 300,
    description: "this is summer T-shirt",
  },
  {
    id: 3,
    name: "hoodie",
    price: 400,
    description: "this is winter hoddie",
  },
];

//routes


//this is root URL- home page of our backend server
app.get("/", (req, res) => {
  res.send("Welcome to the backend server");
});

//getting all products
app.get("/api/products", (req, res) => {
  res.json(items);
});

//getting all details of the sepecific products
app.get("/api/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const product = items.find((items) => items.id === productId);
  if (!product) {
    res.status(404).json({ message: "product not available" });
  } else {
    res.json(product);
  }
});

//error handling middleware function 
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal server error' });
});

// Handle 404 errors
app.use((req, res, next) => {
  res.status(404).send("Page not found");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
