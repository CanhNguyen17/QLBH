const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', ''); // Lấy token từ header

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' }); // Nếu không có token
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key'); // Xác minh token
        req.user = decoded; // Lưu thông tin người dùng vào req.user
        next(); // Tiếp tục với middleware hoặc route handler tiếp theo
    } catch (error) {
        return res.status(400).json({ message: 'Invalid token.' }); // Nếu token không hợp lệ
    }
};

module.exports = verifyToken;


