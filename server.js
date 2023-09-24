// Import required modules and libraries
const express = require("express");
const dotenv = require("dotenv").config(); 
const bodyParser = require('body-parser'); 

//Import error handling middleware function
const errorHandle = require('./errorHandler')

// Import database connection function
const connectDb = require("./config/dbConnection");

// Import route handlers
const userRoutes = require('./routes/userRoutes');
const otpRoutes = require('./routes/otpRoutes');

// Initializing the Express application
const app = express();

// Define the port to listen on, using the provided environment variable or a default of 3000
const port = process.env.PORT || 3000;

// Database Connection
connectDb();

// Configure EJS as the view engine
app.set('view engine', 'ejs'); 
app.set('views', __dirname + '/views');

// Body parser middleware to parse form data
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false })); 

// JSON parsing middleware
app.use(express.json());

// Define routes
app.use('/user', userRoutes); // User-related routes
app.use('/otp', otpRoutes); // OTP-related routes

//Defiling middleware route
app.use(errorHandle);

// Start the Express server
app.listen(port, () => {
    console.log(`Server running on the port ${port}`);
});
