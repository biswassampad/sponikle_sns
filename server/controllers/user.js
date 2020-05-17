const _ = require('lodash');
const fs = require('fs');
const formidable = require("formidable");
const User = require('../models/user');
const aws = require('aws-sdk');


// uploading to cloud function 
function uploadToS3(file, filename, cb) {
    console.log('uploading initiated')
    let s3bucket = new aws.S3({
        accessKeyId: 'AKIAJM2EGAWHAXMOKKLQ',
        secretAccessKey: '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',
        Bucket: 'sponikle'
    });
    s3bucket.createBucket(function() {
        var params = {
            Bucket: 'sponikledp/images',
            Key: filename + '.jpg',
            Body: file
        };
        return s3bucket.upload(params, function(err, data) {
            console.log('cloud,OK', 'Uploading..........')
            if (err) {
                console.log('error in callback');
                console.log(err);
            }
            console.log('success');
            return cb(data);
        });
    });
}

// getting user by id function
exports.userById = async(req, res, next, id) => {
    await User.findById(id)
        .populate('following', '_id displayname displaypic')
        .populate('followers', '_id displayname displapic')
        .exec((err, user) => {
            if (err || !user) {
                return res.status(400).json({
                    error: "User not found"
                })
            }
            //adds the profile object in req with user info
            req.profile = user;
            next();
        })
}

// checks if the requester has authorization or not
exports.hasAuthorizarion = async(req, res, next) => {
    const authorized = await req.profile && req.auth && req.profile.id === req.auth._id
    if (!authorized) {
        return res.status(403).json({
            error: "User is not authorized to perform this action"
        })
    }
}

// gets all the user
exports.allUsers = async(req, res) => {
    await User.find((err, user) => {
        if (err) {
            return res.status(400).json({
                message: "No users found"
            })
        }
        res.json(user);
    }).select("name email created");
}

// gets perticular user by id
exports.getUser = async(req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return await res.status(200).json(req.profile);
}

// updates  user by id
exports.updateUser = async(req, res, next) => {
    let user = req.profile
    user = _.extend(user, req.body); //extend - mutates the source object
    user.updated = Date.now();
    await user.save((err) => {
        if (err) {
            return res.status(400).json({
                error: "You are not authorized to perform this action"
            })
        }
        user.hashed_password = undefined;
        user.salt = undefined;
        res.json({ user });
    })
}

// deletes user by id
exports.deleteUser = async(req, res, next) => {
    let user = req.profile;
    await user.remove((err, user) => {
        if (err) {
            return res.status(400).json({
                error: "Ooops Can not be deleted"
            })
        }

        res.json({
            message: "Account Deleted !!"
        })
    })
}

// updated user profile picture
exports.uploadProfilePicture = async(req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtesnions = true;
    let stringDate = Date.parse(new Date);
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Image can not be uploaded ."
            })
        }
        let user = req.profile;
        if (files.image) {
            var imageFile = fs.readFileSync(files.image.path);
            var fileName = user._id + stringDate
            uploadToS3(imageFile, fileName, function(response) {
                user.displaypic = response.Location;
                user.save((err, result) => {
                    if (err) {
                        return res.status(400).json({
                            error: err
                        });
                    }
                    user.hashed_password = undefined;
                    user.salt = undefined;
                    res.json(user);
                });
            });
        }
    });
}

//gets the profile pic for the perticular user 
exports.getProfilePicture = async(req, res, next) => {
    console.log('user details', req.profile);
    if (req.profile.displaypic) {
        console.log('user diplay pic', req.profile.displaypic)
        return res.send(req.profile.displaypic)
    }
    next();
}



// follow & unfollow methods
exports.addFollowing = (req, res, next) => {
    User.findByIdAndUpdate(req.body.userId, { $push: { following: req.body.followId } }, (err, result) => {
        if (err) {
            return res.status(400).json({ error: err });
        }
        next();
    });
};

exports.addFollower = (req, res) => {
    User.findByIdAndUpdate(req.body.followId, { $push: { followers: req.body.userId } }, { new: true })
        .populate('following', '_id name')
        .populate('followers', '_id name')
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            result.hashed_password = undefined;
            result.salt = undefined;
            res.json(result);
        });
};

exports.removeFollowing = (req, res, next) => {
    User.findByIdAndUpdate(req.body.userId, {
        $pull: { following: req.body.unfollowId }
    }, (err, result) => {
        if (err) {
            return res.status(400).json({ error: err });
        }
        next()
    })
};

exports.removeFollower = (req, res, next) => {
    User.findByIdAndUpdate(req.body.unfollowId, {
            $pull: { followers: req.body.userId }
        }, { new: true })
        .populate('following', '_id displayname displaypic')
        .populate('followers', '_id displayname displaypic')
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
            result.hashed_password = undefined;
            result.salt = undefined;
            res.json(result);
        });
};