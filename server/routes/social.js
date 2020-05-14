const express = require('express');
const realtionController = require('../controllers/relations');
const { requireSignin } = require('../controllers/auth');
const userController = require('../controllers/user');


const router = expres.Router();

// routes from controller
router.post('/follow/:userId', requireSign, realtionController.requestFollow);



// any routes containing ::userId ,our app will execute userById()
router.param("userId", userController.userById);

module.exports = router;