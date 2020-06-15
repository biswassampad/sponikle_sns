const express = require('express');
const userController = require('../controllers/user');
const { requireSignin } = require('../controllers/auth');
const router = express.Router();

router.get('/users', requireSignin, userController.allUsers);
router.post('/validateSlug', userController.validateSlug);
router.get('/getCountries', userController.getCountries);
router.get('/user/:userId', requireSignin, userController.getUser);
router.put("/user/:userId", requireSignin, userController.updateUser);
router.delete("/user/:userId", requireSignin, userController.deleteUser);
router.post("/uploaddp/:userId", requireSignin, userController.uploadProfilePicture);
router.get("/userdp/:userId", requireSignin, userController.getProfilePicture);
router.post("/user/follow", requireSignin, userController.addFollowing, userController.addFollower);
router.post("/user/unfollow", requireSignin, userController.removeFollowing, userController.removeFollower);

// any routes containing ::userId ,our app will execute userById()
router.param("userId", userController.userById);
module.exports = router;