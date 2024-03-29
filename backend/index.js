const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000; // You can change the port number as needed

// Connect to MongoDB database
// mongoose.connect('mongodb://localhost:27017/productDB', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => {
//     console.log('Connected to MongoDB');
// }).catch((error) => {
//     console.error('MongoDB connection error:', error);
// });

// Define routes
app.get('/', (req, res) => {
    res.send('Welcome to the backend server');
});
app.get('/prathmesh', (req, res) => {
    console.log("request recieved for /prathmesh");
    res.send('hello prathmesh');
});
app.get('/sachin',(req,res)=>{
    res.send('God of cricket');
})

// Handle 404 errors
app.use((req, res, next) => {
    res.status(404).send('Page not found');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
