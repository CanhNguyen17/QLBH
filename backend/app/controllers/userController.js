const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// post[/user/register]
exports.registerUser = (req, res) => {
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
};

// post[/user/login]
exports.loginUser = (req, res) => {
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
};

// put[/user/profile]
exports.profileUser = (req, res) => {
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
};

// get[/user/profile]
exports.getProfileUser = (req, res) => {
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
};
