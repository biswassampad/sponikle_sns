const express = require('express');
const authController = require('../controllers/auth');
const userController = require('../controllers/user');
const { userSignupValidator } = require('../validator/index');
const router = express.Router();


router.post('/signup', userSignupValidator, authController.signup);
router.post('/signin', authController.signin);
router.get('/signout', authController.signout);

// any routes containing ::userId ,our app will execute userById()
router.param("userId", userController.userById);

module.exports = router;