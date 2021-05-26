let jwt = require('jsonwebtoken');
let Comment = require('../models/comment.model');

module.exports.createComment = (req, res, next)=>{
    try{
        let post_id = req.params.post_id;
        let token = req.cookies.token;
        let decode = jwt.decode(token);
        let user_id = decode.user_id;
        let content = req.body.content;
        Comment.create({comment_id: user_id + Date.now(), user_id: user_id, post_id: post_id, content: content, timestamp: Date.now()})
        .then(result=>{
            res.status(201).json({
                message: "Comment Successed"
            }).end();
        })
        .catch(err =>{
            res.status(500).json({
                message: "Comment failed"
            }).end();
        })
    }catch(error){
        res.status(500).json({
            message: "Comment failed",
            error: error
        }).end();
    }
}

module.exports.deleteComment = (req, res, next)=>{
    res.status(200).json({
        message: "Delete successed"
    }).end();
}