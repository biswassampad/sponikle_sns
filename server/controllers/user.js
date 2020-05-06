const _ = require('lodash');

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
        res.json({ user });
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