let Love = require('../models/love.model');
const Post = require('../models/post.model');

module.exports.react = (req, res, next) => {
    try {
        let user_id = req.userData.user_id;
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
                Post.findByPk(post_id).then(post =>{
                    let num_of_loves = post.num_of_loves;
                    num_of_loves++;
                    Post.update({num_of_loves: num_of_loves}, {
                        where: {
                            post_id: post_id
                        }
                    }).then(tmp =>{
                        res.status(201).json({
                            message: "Like done"
                        }).end();
                    })
                })
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
        let user_id = req.userData.user_id;
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
                    Post.findByPk(post_id).then(post =>{
                        let num_of_loves = post.num_of_loves;
                        num_of_loves--;
                        Post.update({num_of_loves: num_of_loves}, {
                            where: {
                                post_id: post_id
                            }
                        }).then(tmp =>{
                            res.status(201).json({
                                message: "Unlike success"
                            }).end();
                        })
                    })
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