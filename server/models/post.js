const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema

const PostSchema = new mongoose.Schema({
    post: [],
    owner: [],
    location: [],
    likes: [],
    dislikes: [],
    comments: [],
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model("Post", PostSchema);