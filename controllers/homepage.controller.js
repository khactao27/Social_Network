const jwt = require('jsonwebtoken');
const Post = require('../controllers/post.controller');
const User = require('../models/user.model');
const Follow = require('../models/follow.model');

const {Op} = require('sequelize');

module.exports.getHome = async(req, res, next)=>{
    try{
        let token = req.headers.authorization.split(' ')[1];
        let decode = jwt.decode(token);
        let user_id = decode.user_id;
        let avatar = decode.avatar;
        Follow.findAll({
            attributes:['following_id'],
            where:{
                follower_id: user_id
            }
        }).then(user =>{
            let idFollowing = [];
            for(key of user){
                idFollowing.push(key.follower_id);
            }
            Post.findAll({
                where:{
                    user_id: {
                        [Op.in]:idFollowing
                    }
                }
            }).then(result =>{
                res.status(200).render('/views/homepage/home.ejs', {
                    posts: result,
                    user: {
                        user_id: user_id,
                        avatar: avatar
                    }
                }).status(200).end();
            }).catch(error => {
                res.status(500).json({
                    message: 'Error: Find Post error!'
                }).end();
            })
        })
    }catch(error){
        res.status(500).json({
            message: 'Error! get home',
            error: error
        }).end();
    }
}