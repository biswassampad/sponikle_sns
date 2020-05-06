const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema

const PostSchema = new mongoose.Schema({
    post: [],
    postedBy: {
        type: ObjectId,
        ref: "User"
    },
    created: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model("Post", PostSchema);