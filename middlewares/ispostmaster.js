exports.isPostMaster = (req, res, next) => {
    let isPostMaster = req.post && req.auth && String(req.post.postedBy._id) === req.auth._id;
    if (!isPostMaster) {
        return res.status(403).json({
            error: "You are not the owner of the post"
        })
    }
    next();
}