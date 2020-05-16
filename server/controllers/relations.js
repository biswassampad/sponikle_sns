const Follow = require('../models/follow');
const Friend = require('../models/friend');

exports.requestFollow = async(req, res, next) => {
    const reciever = req.profile;
    console.log('Adding follower');
    console.log(req)
    reciever.displaypic = undefined;
    reciever.salt = undefined;
    reciever.hashed_password = undefined;
    res.json(reciever);
}