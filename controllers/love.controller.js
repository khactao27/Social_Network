let Love = require('../models/love.model');
const jwt = require('jsonwebtoken');
const Post = require('../models/post.model');

module.exports.react = (req, res, next) => {
    try {
        const token = req.cookies.token;
        const decode = jwt.decode(token, {json: true});
        let user_id = decode.user_id;
        //let email = decode.email;
        let post_id = req.params.idpost;
        Love.findAll({
            where:{
                user_id: user_id,
                post_id: post_id
            }
        }).then(result => {
            if(result.length >= 1){
                res.status(409).json({
                    message: "Love exists"
                });
            }
            Love.create({post_id: post_id, user_id: user_id}).then(temp =>{
                res.status(201).json({
                    message: "Like done"
                });
            }).catch(err=>{
                res.status(500).json({
                    message: "error insert for Love"
                })
            });
        })
    } catch (error) {
        return res.status(500).json({
            message: "React failed",
            error: error
        });
    }
}

module.exports.unreact = (req, res, next) => {
    try {
        const token = req.cookies.token;
        const decode = jwt.decode(token, {json: true});
        let user_id = decode.user_id;
        let email = decode.email;
        let post_id = req.params.idpost;
        Love.findAll({
            where:{
                user_id: user_id,
                post_id: post_id
            }
        }).then(result=>{
            if(result.length < 1){
                return req.status(409).json({
                    message: "Love isnot exists"
                });
            }
            else{
                Love.destroy({
                    where:{
                        post_id: post_id,
                        user_id: user_id
                    }
                }).then(temp=>{
                    res.status(201).json({
                        message: "Unlike success"
                    }).end();
                }).catch(err=>{
                    res.status(500).json({
                        message: 'Unlike failed'
                    }).end();
                })
            }
        })
    } catch (error) {
        return res.status(500).json({
            message: "Unreact failed"
        })
    }
}