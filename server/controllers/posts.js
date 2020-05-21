const fd = require('formidable');
const fs = require('fs');
const Post = require('../models/post');
const _ = require('lodash');
const aws = require('aws-sdk');

function postTos3(file, filename, cb) {
    console.log('uploading initiated for post');
    let s3bucket = new aws.S3({
        accessKeyId: 'AKIAJM2EGAWHAXMOKKLQ',
        secretAccessKey: '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',
        Bucket: 'sponiklepp'
    });
    s3bucket.createBucket(function() {
        var params = {
            Bucket: 'sponiklepp/images',
            Key: filename + '.jpg',
            Body: file
        };

        return s3bucket.upload(params, function(err, data) {
            console.log('cloud,OK', 'Uploading.....');
            if (err) {
                console.log('error in callback');
                console.log(err);
            }
            console.log('success');
            return cb(data);
        })
    })
}

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

exports.createPost = async(req, res, next) => {
    console.log('req.body', req.body);
    if (req.body.text && !req.body.image) {
        console.log('switching to TEXT only mode');
        var user = req.profile;
        user.hashed_password = undefined;
        user.salt = undefined;
        user.following = undefined;
        user.followers = undefined;
        const post = await new Post({
            post: req.body.text,
            owner: user,
            location: req.body.location,
            likes: [],
            dislikes: [],
            comments: []
        })

        post.save((err, result) => {
            if (err) {
                res.status(500).json({
                    'error': err
                })
            }
            if (result) {
                res.status(200).json({
                    'post': result
                })
            }
        })

    } else if (!req.body.text && req.body.image) {
        console.log('switching to IMAGE Only mode');

    } else if (req.body.text && req.body.image) {
        console.log('swithcing to combo mode');
    }
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

exports.imageUpload = async(req, res) => {
    var data = await req.body;
    res.status(200).json(data);
}