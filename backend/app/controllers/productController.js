const Product = require('../models/Product');

// Tạo sản phẩm mới
// post[/products/create]
exports.createProduct = (req, res) => {
    const product = new Product(req.body);
    product.save()
        .then(() => res.status(200).json({ success: true }))
        .catch(error => res.status(500).json({ success: false, error: error.message }));
};

/// Trang chủ (filter va pagination)
// get[/products/shop]
exports.getShop = (req, res) => {
    const { category, sort, q, page = 1, limit = 8 } = req.query;
    const skip = (page - 1) * limit;

    // Xây dựng bộ lọc
    const filter = category && category !== "Tất cả" ? { category } : {};
    if (q) filter.name = { $regex: q, $options: "i" };// Tìm kiếm không phân biệt chữ hoa/thường
    Promise.all([
        // Lấy danh sách sản phẩm

        Product.find(filter).sort(sort === "asc" ? { newPrice: 1 } : { newPrice: -1 }).skip(skip).limit(parseInt(limit)),
        // Đếm tổng số sản phẩm
        Product.countDocuments(filter),
    ])
        .then(([products, total]) =>
            // Kết quả trả về
            res.json({ data: products, total, totalPages: Math.ceil(total / limit), page: parseInt(page) }))
        .catch(error => res.status(500).json({ message: error.message }));
};

// get[/products/best-seller]
exports.bestSeller = (req, res) => {
    Product.find()
        .then((products) => {
            res.json(products.filter(product => product.isBestSeller));
        })
        .catch((error) => res.status(500).json({ message: error.message }));
};

// get[/products/:slug]
// DS sản phẩm product detail
exports.slug = (req, res) => {
    Product.findOne({ slug: req.params.slug }).lean()
        .then(products =>
            res.json(products))
        .catch(error => res.status(500).json({ message: error.message }));
};
