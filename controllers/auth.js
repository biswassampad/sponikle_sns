const jwt = require('jsonwebtoken');
const expressjwt = require('express-jwt');

require('dotenv').config();

const User = require('../models/user');

exports.signup = async(req, res) => {
    const userExists = await User.findOne({ email: req.body.email })
    if (userExists) return res.status(403).json({
        error: "Email is already present"
    })

    const user = await new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        userName: req.body.userName,
        display_pic: req.body.display_pic
    });

    await user.save()
    res.status(200).json({
        message: "signup success",
        user: user
    })
}

exports.signin = async(req, res) => {
    // find the user based on emailid
    const { email, password } = req.body;
    const user = await User.findOne({ email: email }, (err, user) => {
        if (err || !user) {
            return res.status(401).json({
                error: "User with this email id doesnot exists,Please SignUp"
            });
        }
        // if user is found make sure email and password matches
        // the authentication method is created in the model and used here .
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: "Email Or Password does not match"
            });
        }
        // generate the token with user _id and app secret
        const token = jwt.sign({ _id: user._id }, process.env.APP_SECRET);

        // presist the token with cookie
        res.cookie("t", token, { expire: new Date() + 100000 })

        // return response with user token to front end token 
        const { _id, name, email, displayName, display_pic } = user;
        return res.json({
            token,
            user: { _id, name, email, displayName, display_pic }
        });
    });
}

exports.signout = async(req, res) => {
    res.clearCookie("t");
    return res.json({
        message: "Sign Out Successful"
    })
}

exports.requireSignin = expressjwt({
    // if the token is valid,express jwt appends the varified userid
    // in an auth key to the request object 
    secret: process.env.APP_SECRET,
    userProperty: "auth"
})