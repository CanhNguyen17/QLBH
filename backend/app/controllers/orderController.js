const ProductOrder = require('../models/ProductOrder');

// post[/order]
exports.createOrder = (req, res) => {
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
};

// get[/order] DS Don hang
exports.listOrder = (req, res) => {
    ProductOrder.find().lean()
        .then(products => res.json(products))
        .catch(error => res.status(500).json({ message: error.message }));
};

