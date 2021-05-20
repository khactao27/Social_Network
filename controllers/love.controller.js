let love = require('../models/love.model');

module.exports.react = (req, res) => {
    let userId = parseInt(req.cookies.userId);
    let postId = parseInt(req.body.postId);
    try {
        await love.create({ user_id: userId, post_id: postId });
        res.status(200).end();
    } catch (error) {
        console.error(error);
    }
}

module.exports.unreact = (req, res) => {
    let postId = parseInt(req.params.postId);
    let userid = parseInt(req.cookies.userid);
    try {
        await love.destroy({ where: { post_id: postId, user_id: userid } });
        res.status(200).end();
    } catch (error) {
        console.error(error);
    }
}