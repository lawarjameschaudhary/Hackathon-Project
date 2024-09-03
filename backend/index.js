const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors');
const path = require('path')
const connectDB = require("./config/db");
const userRoutes = require('./routes/userRoutes');
const sellerRoutes = require('./routes/sellerRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const adminRoutes = require('./routes/adminRoutes');



// configure dotenv
dotenv.config();

const app = express();

// connect to database
connectDB();


// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200
}));
app.use('/images', express.static(path.join(__dirname, 'uploads')))

// routes
app.use('/api/users', userRoutes);
app.use('/api/sellers', sellerRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/admin', adminRoutes);

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));