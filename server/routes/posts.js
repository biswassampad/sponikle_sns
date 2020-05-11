const express = require('express');
const postController = require('../controllers/posts');
const { requireSignin } = require('../controllers/auth');
const { isPostMaster } = require('../middlewares/ispostmaster');

const userController = require('../controllers/user');
const router = express.Router();

// routes from controller
router.get('/post', requireSignin, postController.getPosts);
router.post('/createPost/:userId', requireSignin, postController.createPost);
router.get('/posts/by/:userId', requireSignin, postController.postByUser);
router.get('/post/by/:postId', requireSignin, postController.singlePost);
router.delete('/post/:postId', requireSignin, isPostMaster, postController.deleteOne);
router.put('/post/:postId', requireSignin, isPostMaster, postController.updatePost);
router.post('/imageUpload', postController.imageUpload);

// any routes containing ::userId ,our app will execute userById()
router.param("userId", userController.userById);
// any routes conatining  ::postId ,our app will execute postById()
router.param("postId", postController.postById);

module.exports = router;