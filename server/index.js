const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();

// database connect
mongoose.connect('mongodb+srv://Ize:023@cluster0.m2eae.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0')
.then(() => console.log('Database Connected'))
.catch((err) => console.log('Database not connected', err))

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}))

app.use('/', require('./routes/authRoutes'))
app.use("/products", require('./routes/routes-product'));



app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Replace with your frontend URL
    credentials: true
}));

const port = 8000;
app.listen(port, () => console.log('Server is running on port : ' + port )) 

