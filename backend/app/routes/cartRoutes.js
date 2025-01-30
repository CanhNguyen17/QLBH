const express = require('express');
const verifyToken = require('../../middlewares/verifyToken');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.post('/:id', verifyToken, cartController.addToCart); // post[/cart/:id]
router.get('/', cartController.getCart); // get[/cart]
router.delete('/:id', cartController.deleteCart); // delete[/cart/:id]
router.put('/:id', cartController.putQuantityCart); // put[/cart/:id] Cap nhat SL
router.put('/', cartController.putDeleteCart); // put[/cart] cap nhat delete

module.exports = router;
