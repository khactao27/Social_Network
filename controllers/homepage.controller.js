const jwt = require('jsonwebtoken');
const Post = require('../controllers/post.controller');
const User = require('../models/user.model');
const Follow = require('../models/follow.model');
const sequelize = require('../models/db');

const {Op, QueryTypes} = require('sequelize');

module.exports.getLogin = (req, res, next)=>{
    res.clearCookie('token');
    res.render('../views/auth/login.ejs');
}
module.exports.signUp = (req, res, next)=>{
    res.render('../views/auth/signup.ejs');
}
module.exports.getHome = async (req, res, next)=>{
    try{
        let user_id = req.userData.user_id;
        let avatar = req.userData.avatar;
        let posts = await sequelize.query(`SELECT * FROM post, follow, user WHERE post.user_id = user.user_id AND user.user_id = follow.follower_id AND follow.following_id = '${user_id}'`, {type: QueryTypes.SELECT});
        res.render('../views/homepage/home.ejs', {
            posts: posts,
            user: {
                user_id: user_id,
                avatar: avatar
            }
        })
    }catch(error){
        res.status(500).json({
            message: 'Error! get home',
            error: error
        }).end();
    }
}