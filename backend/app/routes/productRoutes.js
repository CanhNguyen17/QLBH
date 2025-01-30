const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/create', productController.createProduct); // post[/products/create]
router.get('/shop', productController.getShop); // get[/products/shop]
router.get('/best-seller', productController.bestSeller); // get[/products/best-seller]
router.get('/:slug', productController.slug); // get[/products/:slug]

module.exports = router;
