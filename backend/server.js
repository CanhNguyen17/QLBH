// backend/server.js
const Product = require('./app/models/Product');
const ProductCart = require('./app/models/ProductCart');
const User = require('./app/models/User')
const ProductOrder = require('./app/models/ProductOrder');
//
const verifyToken = require('./middlewares/verifyToken');
//
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
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

/// Trang chủ (filter va pagination)
app.get('/shop', (req, res) => {
    const { category, sort, q, page = 1, limit = 8 } = req.query;
    const skip = (page - 1) * limit;

    // Xây dựng bộ lọc
    const filter = category && category !== "Tất cả" ? { category } : {};
    if (q) {
        filter.name = { $regex: q, $options: "i" }; // Tìm kiếm không phân biệt chữ hoa/thường
    }

    Promise.all([
        // Lấy danh sách sản phẩm
        Product.find(filter)
            .sort(sort === "asc" ? { newPrice: 1 } : sort === "desc" ? { newPrice: -1 } : {})
            .skip(skip)
            .limit(parseInt(limit)),

        // Đếm tổng số sản phẩm
        Product.countDocuments(filter),
    ])
        .then(([products, total]) => {
            // Kết quả trả về
            res.json({
                data: products,
                total,
                totalPages: Math.ceil(total / limit),
                page: parseInt(page),
            });
        })
        .catch((error) => {
            res.status(500).json({ message: "Có lỗi xảy ra", error: error.message });
        });
});

//
app.get('/best-seller', (req, res) => {
    Product.find()
        .then((products) => {
            res.json(products.filter(product => product.isBestSeller));
        })
        .catch((error) => res.status(500).json({ message: error.message }));
});

// DS sản phẩm product detail
app.get('/product/:slug', (req, res) => {
    Product.findOne({ slug: req.params.slug }).lean()
        .then(products =>
            res.json(products))
        .catch(error => res.status(500).json({ message: error.message }));
});

// Thêm sản phẩm vào giỏ hàng 
app.post('/cart/:id', verifyToken, (req, res) => {
    const { userId } = req.user;

    Product.findById(req.params.id)
        .then(product => {
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }

            // Kiểm tra sản phẩm đã tồn tại trong giỏ hàng
            return ProductCart.findOne({ userId, productId: product._id })
                .then(cartItem => {
                    if (cartItem) {
                        // Nếu đã có, tăng số lượng
                        cartItem.quantity += 1;
                        return cartItem.save();
                    } else {
                        // Nếu chưa có, tạo mới
                        const newCartItem = new ProductCart({
                            userId,
                            productId: product._id,
                            name: product.name,
                            image: product.image,
                            newPrice: product.newPrice,
                        });
                        return newCartItem.save();
                    }
                });
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

// update cart
app.put('/cart', (req, res) => {
    // const { userId } = req.body;
    // ProductCart.deleteMany({ userId })
    ProductCart.deleteMany()
        .then(() => res.status(200).json({ message: 'Products deleted successfully' }))
        .catch(error => res.status(500).json({ message: error.message }));
});

//dat hang
app.post('/order', (req, res) => {
    const { products, total, shippingFee, totalShipping } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!products || products.length === 0) {
        return res.status(400).json({ success: false, message: 'Danh sách sản phẩm không được để trống' });
    }

    // Tạo đơn hàng mới
    const newOrder = new ProductOrder({
        products,
        total,
        shippingFee,
        totalShipping,
    });

    newOrder.save()
        .then(savedOrder => {
            res.status(201).json({ success: true, order: savedOrder });
        })
        .catch(error => {
            console.error("Error creating order:", error);
            res.status(500).json({ success: false, message: 'Lỗi máy chủ', error: error.message });
        });
});

//DS Don hang
app.get('/order', (req, res) => {
    ProductOrder.find().lean()
        .then(products => res.json(products))
        .catch(error => res.status(500).json({ message: error.message }));
});

// Đăng ký người dùng
app.post('/register', (req, res) => {
    const { username, email, password, } = req.body;

    // Kiểm tra đầu vào
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }
    // Băm mật khẩu và lưu vào cơ sở dữ liệu
    bcrypt.hash(password, 10)
        .then((hashedPassword) => {
            const newUser = new User({
                username, email, password: hashedPassword,
            });
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
            bcrypt.compare(password, user.password)
                .then((isPasswordValid) => {
                    if (!isPasswordValid) {
                        return res.status(401).send('Invalid credentials');
                    }
                    // Tạo token
                    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET || 'secret_key', { expiresIn: '30 minutes' });
                    res.status(200).json({ token, username: user.username });
                });
        })
        .catch((error) => {
            console.error('Login error:', error); // Log lỗi nếu cần debug
            res.status(400).send('Error logging in');
        });
});
//
app.put('/profile', (req, res) => {
    const { phonenumber, address, city, country } = req.body;
    User.findOneAndUpdate({ username: req.body.username }, { phonenumber, address, city, country }, { new: true })
        .then(updatedUser => {
            if (!updatedUser) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(updatedUser);
        })
        .catch(error => {
            console.error('Error updating profile:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
});

//
app.get('/profile', (req, res) => {
    User.findOne()
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(user); // Trả về thông tin user
        })
        .catch(error => {
            console.error('Error fetching user:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
}
)

///
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
