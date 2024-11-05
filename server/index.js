const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const authModellogin = require('./model/authModellogin');
const app = express();

// Connect to MongoDB
mongoose
  .connect('mongodb+srv://Ize:023@cluster0.m2eae.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connection Successful");
  })
  .catch((err) => {
    console.log(err.message);
  });

// Middleware
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
}));


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // This line is crucial

// Use your routes
app.use("/user", authModellogin); // User authentication routes
app.use("/products", authRoutes); // Product routes

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Server listen
app.listen(4000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server Started Successfully.");
  }
});

// CORS preflight request handling
app.options('*', cors());
