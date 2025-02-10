const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // Lấy token từ header Authorization
    const token = req.header('Authorization')?.replace('Bearer ', ''); 
    console.log('Token received:', token); // Log kiểm tra token

    if (!token) {
        // Nếu không có token, trả về lỗi 401
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        // Xác minh token với secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key');
        req.user = decoded; // Lưu thông tin người dùng vào req.user
        console.log('Decoded user:', decoded); // Log decoded user (nếu cần)

        next(); // Tiếp tục với middleware hoặc route handler tiếp theo
    } catch (error) {
        // Nếu token không hợp lệ, trả về lỗi 403
        console.error('Error verifying token:', error); // Log chi tiết lỗi
        return res.status(403).json({ message: 'Invalid token.' });
    }
};

module.exports = verifyToken;
