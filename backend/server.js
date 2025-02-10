// backend/server.js
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('../backend/app/routes/user/productRoutes');
const cartRoutes = require('../backend/app/routes/user/cartRoutes');
const orderRoutes = require('../backend/app/routes/user/orderRoutes');
const userRoutes = require('../backend/app/routes/user/userRoutes');
const allOrderRoutes = require('../backend/app/routes/admin/allOrderRoutes')
const allProductRoutes = require('../backend/app/routes/admin/allProductRoutes')
const allAccountRoutes = require('../backend/app/routes/admin/allAccountRoutes')
require('dotenv').config();

const app = express();
const PORT = 5000;

//Override
app.use(express.urlencoded({ extended: true }));

// Sử dụng middleware CORS để cho phép React frontend gọi API
app.use(cors());
app.use(express.json());

// Kết nối MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.log('MongoDB connection error:', error));

// Định tuyến
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/order', orderRoutes);
app.use('/user', userRoutes);
//admin
app.use('/allorder', allOrderRoutes);
app.use('/allproduct', allProductRoutes);
app.use('/allaccount', allAccountRoutes);

//
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
