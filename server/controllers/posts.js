const fd = require('formidable');
const fs = require('fs');
const Post = require('../models/post');
const _ = require('lodash');

exports.postById = async(req, res, next, id) => {
    await Post.findById(id)
        .populate("postedBy", "_id name")
        .exec((err, post) => {
            if (err || !post) {
                return res.status(400).json({
                    error: err
                });
            }
            req.post = post;
            next();
        });
}

exports.getPosts = async(req, res) => {
    const posts = await Post.find()
        .populate("postedBy", "_id name email")
        .then(posts => {
            res.status(200).json({ posts: posts });
        })
        .catch(err => {
            res.status(500).json({
                error: error
            });
        });
};

exports.createPost = async(req, res) => {
    req.profile.hashed_password = undefined
    req.profile.salt = undefined
    const post = await new Post({
        post: req.body.text,
        postedBy: req.profile
    });

    post.save((err, result) => {
        if (err) {
            res.status(500).json({
                'error': err
            })
        }

        if (result) {
            res.status(200).json({
                'post': result,
            })
        }
    });
}

exports.postByUser = async(req, res) => {
    await Post.find({ postedBy: req.profile._id })
        .populate("postedBy", "_id name")
        .sort("_created")
        .exec((err, posts) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
            res.status(200).json(posts)
        });

}

exports.singlePost = async(req, res) => {
    return await res.status(200).json(req.post);
}

exports.deleteOne = async(req, res) => {
    let post = req.post;
    await post.remove((err, post) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        res.status(200).json({
            message: "Post deleted successfully"
        });
    });
}

exports.updatePost = async(req, res) => {
    let id = req.post._id;
    const post = await Post.findById(id).update({
        post: req.body.text,
        updated: Date.now()
    });
    const updated = await Post.findById(id);

    return res.status(200).json({
        message: "Post Updated",
        post: updated
    });
}