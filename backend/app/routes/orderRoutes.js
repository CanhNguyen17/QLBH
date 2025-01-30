const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/', orderController.createOrder); // post[/order]
router.get('/', orderController.listOrder); // get[/order] DS Don hang

module.exports = router;