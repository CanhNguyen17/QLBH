// backend/server.js
const Product = require('./app/models/Product');
const ProductCart = require('./app/models/ProductCart');
const User = require('./app/models/User')
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const mongoose = require('mongoose');
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

// Tạo sản phẩm mới
app.post('/create', (req, res) => {
    const product = new Product(req.body)
    product.save()
        .then(() => {
            res.status(200).json({ success: true });
        })
        .catch(error => {
            res.status(500).json({ success: false });
        })
});

/// Trang chủ
app.get('/shop', (req, res) => {
    Product.find({}).lean()
        .then(products => res.json(products))
        .catch(error => res.status(500).json({ message: error.message }));
});

// DS sản phẩm
app.get('/product/:slug', (req, res) => {
    Product.findOne({ slug: req.params.slug }).lean()
        .then(products =>
            res.json(products))
        .catch(error => res.status(500).json({ message: error.message }));
});

// Thêm sản phẩm vào giỏ hàng 
app.post('/cart/:id', (req, res) => {
    Product.findById({ _id: req.params.id })
        .then(product => {
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }

            const newCartItem = new ProductCart({
                productId: product._id,
                name: product.name,
                image: product.image,
                newPrice: product.newPrice,
            });

            return newCartItem.save();

        })
        .then(() => res.status(200).json({ message: 'Product added to cart' }))
        .catch(error => res.status(500).json({ message: error.message }));
});

//DS giỏ hàng
app.get('/cart', (req, res) => {
    ProductCart.find({}).lean()
        .then(products => res.json(products))
        .catch(error => res.status(500).json({ message: error.message }));
});

// Xoa
app.delete('/cart/:id', (req, res) => {
    ProductCart.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Product deleted successfully' }))
        .catch(error => res.status(500).json({ message: error.message }));
});

// Cập nhật số lượng
app.put('/cart/:id', (req, res) => {
    const { action } = req.body;
    const update = action === 'increase'
        ? { $inc: { quantity: 1 } }
        : action === 'decrease'
            ? { $inc: { quantity: -1 } }
            : null;

    if (!update) {
        return res.status(400).json({ message: 'Invalid action' });
    }

    ProductCart.updateOne({ _id: req.params.id }, update)
        .then(() => res.status(200).json({ message: 'Product quantity updated successfully' }))
        .catch(error => res.status(500).json({ message: error.message }));
});

// Đăng ký người dùng
app.post('/register', (req, res) => {
    const { email, password } = req.body;

    // Kiểm tra đầu vào
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }
    // Băm mật khẩu và lưu vào cơ sở dữ liệu
    bcrypt.hash(password, 10)
        .then((hashedPassword) => {
            const newUser = new User({ email, password: hashedPassword });
            return newUser.save();
        })
        .then(() => {
            res.status(201).send('User registered successfully');
        })
        .catch((error) => {
            if (error.code === 11000) {
                // Lỗi trùng email
                res.status(400).json({ error: 'Email is already registered' });
            } else {
                res.status(500).json({ error: 'Error registering user' });
            }
        });
});

// Đăng nhập
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Tìm người dùng theo email
    User.findOne({ email })
        .then((user) => {
            if (!user) {
                return res.status(404).send('User not found');
            }
            // So sánh mật khẩu
            return bcrypt.compare(password, user.password)
                .then((isPasswordValid) => {
                    if (!isPasswordValid) {
                        return res.status(401).send('Invalid credentials');
                    }
                    // Tạo token
                    const token = jwt.sign({ id: user._id }, 'secret_key', { expiresIn: '1h' });
                    res.status(200).json({ token });
                });
        })
        .catch((error) => {
            console.error('Login error:', error); // Log lỗi nếu cần debug
            res.status(400).send('Error logging in');
        });
});

///
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
