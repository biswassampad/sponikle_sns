const _ = require('lodash');
const path = require("path");
const fs = require('fs');
const formidable = require("formidable");

const User = require('../models/user');


exports.userById = async(req, res, next, id) => {
    await User.findById(id).exec((err, user) => {
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

exports.hasAuthorizarion = async(req, res, next) => {
    const authorized = await req.profile && req.auth && req.profile.id === req.auth._id
    if (!authorized) {
        return res.status(403).json({
            error: "User is not authorized to perform this action"
        })
    }
}

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

exports.getUser = async(req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return await res.status(200).json(req.profile);
}

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

exports.uploadProfilePicture = async(req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtesnions = true;
    console.log('form', form);
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Image can not be uploaded ."
            })
        }
        let user = req.profile;
        if (files.image) {
            var imageFile = fs.readFileSync(files.image.path);
            console.log(imageFile)
            user.displaypic.data = imageFile;
            user.displaypic.contentType = files.image.type;
        }

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

exports.getProfilePicture = async(req, res, next) => {
    if (req.profile.displaypic.data) {
        res.set(("Content-Type", req.profile.displaypic.contentType));
        return res.send(req.profile.displaypic.data)
    }
    next();
}