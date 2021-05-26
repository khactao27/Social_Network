const Follow = require('../models/follow.model');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

module.exports.follow = async(req, res, next) => {
    try {
        // let token = req.cookies.token;
        // let decode = jwt.decode(token);
        // let user_id = decode.user_id;
        let user_id = req.userData.user_id;
        let id_follow = req.params.id;
        User.findAll(id_follow).then(user => {
            if(user.length < 1){
                return res.status(500).json({
                    message: 'Dont have a user'
                }).end();
            }
            Follow.findAll({
                where: {
                    following_id: id_follow,
                    follower_id: user_id
                }
            }).then(result =>{
                if(result.length < 1){
                    Follow.create({following_id: id_follow, follower_id: user_id}).then(suce =>{
                        res.status(201).json({
                            message: 'Follow success'
                        }).end();
                    }).catch(err => {
                        res.status(500).json({
                            message: 'Follow failed'
                        }).end();
                    });
                }
                else{
                    return res.status(209).json({
                        message: 'Followed before'
                    }).end();
                }
            })
        })
    } catch (error) {
        return res.status(500).json({
            message: 'follow failed'
        }).end();
    }
}

module.exports.unfollow = (req, res, next) =>{
    try {
        // let id_follow = req.params.id;
        // let token = req.cookies.token;
        // let decode = jwt.decode(token);
        let user_id = req.userData.user_id;
        User.findAll({
            where: {
                user_id: id_follow
            }
        }).then(user => {
            if(user.length < 1){
                return res.status(404).json({
                    message: '404 Not found user'
                }).end();
            }
            return Follow.findAll({
                where: {
                    following_id: id_follow,
                    follower_id: user_id
                }
            })
        }).then(result =>{
            if(result.length < 1){
                return res.status(500).json({
                    message: 'User followed this person yet'
                }).end();
            }
            Follow.destroy({
                where:{
                    following_id: id_follow,
                    follower_id: user_id
                }
            }).then(result =>{
                return res.status(200).json({
                    message: 'Unfollow successed!'
                }).end();
            })
        }).catch(error=>{
            res.status(500).json({
                message: 'failed'
            }).end();
        })
    } catch (error) {
        return res.status(500).json({
            message:'unfollow failed'
        }).end();
    }
}