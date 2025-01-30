const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.registerUser); // post[/user/register]
router.post('/login', userController.loginUser); // post[/user/login]
router.put('/profile', userController.profileUser); // put[/user/profile]
router.get('/profile', userController.getProfileUser); // get[/user/profile]

module.exports = router;