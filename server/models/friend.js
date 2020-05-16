const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;

const FriendSchema = new mongoose.Schema({
    sender: {
        id: ObjectId,
        displayname: {
            type: String,
            required: true
        },
        image: {
            type: String
        },
        about: {
            type: String
        }
    },
    reciever: {
        id: ObjectId,
        displayname: {
            type: String,
            required: true
        },
        image: {
            type: String
        },
        about: {
            type: String
        }
    },
    status: {
        type: Number,
        default: 0
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Friend", FriendSchema);