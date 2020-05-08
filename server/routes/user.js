const express = require('express');
const userController = require('../controllers/user');
const { requireSignin } = require('../controllers/auth');
const router = express.Router();

router.get('/users', requireSignin, userController.allUsers);
router.get('/user/:userId', requireSignin, userController.getUser);
router.put("/user/:userId", requireSignin, userController.updateUser);
router.delete("/user/:userId", requireSignin, userController.deleteUser);

// any routes containing ::userId ,our app will execute userById()
router.param("userId", userController.userById);
module.exports = router;