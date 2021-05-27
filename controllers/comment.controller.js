let jwt = require('jsonwebtoken');
let Comment = require('../models/comment.model');

module.exports.createComment = (req, res, next)=>{
    try{
        let user_id = req.userData.user_id;
        let content = req.body.content;
        let post_id = req.body.post_id;
        Comment.create({comment_id: user_id + Date.now(), user_id: user_id, post_id: post_id, content: content, timestamp: Date.now()})
        .then(result=>{
            res.status(201).json({
                user_id: user_id,
                text: content
            }).end();
        })
        .catch(err =>{
            res.status(500).json({
                message: "Comment failed"
            }).end();
        })
    }catch(error){
        res.status(404).json({
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