let love = require('../models/love.model');

module.exports.react = (req, res)=>{
    let userId = parseInt(req.body.userId);
    let postId = parseInt(req.body.postId);
    try {
        
    } catch (error) {
        console.error(error);
    }
}

module.exports.unreact = (req, res)=>{
    res.send("UnLove");
}