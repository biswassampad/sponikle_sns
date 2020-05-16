const express = require('express');
const followController = require('../controllers/follow');
const { requireSignin } = require('../controllers/auth');

const userController = require('../controllers/user');
const router = express.Router();

// routes from controller
router.get('/followrequest', followController.generateRequest);

// any routes containing ::userId ,our app will execute userById()
router.param("userId", userController.userById);


module.exports = router;