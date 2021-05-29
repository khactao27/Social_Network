const sequelize = require('../models/db');
const Love = require('../models/love.model');
const {Op, QueryTypes, DataTypes} = require('sequelize');
const Comment = require('../models/comment.model');

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
        let arrLoves =[];
        let postLoves = await sequelize.query(`SELECT post_id FROM loves WHERE user_id="${user_id}"`, {type:QueryTypes.SELECT});
        for(let love of postLoves){
            arrLoves.push(love.post_id);
        }
        let comments = await Comment.findAll();
        let posts = await sequelize.query(`SELECT * FROM post, follow, user WHERE post.user_id = user.user_id AND user.user_id = follow.following_id AND follow.follower_id = '${user_id}'`, {type: QueryTypes.SELECT});
        console.log(posts);
        res.render('../views/homepage/home.ejs', {
            posts: posts,
            user: {
                user_id: user_id,
                avatar: avatar
            },
            arrLoves: arrLoves,
            comments: comments
        })
    }catch(error){
        res.status(500).json({
            message: 'Error! get home',
            error: error
        }).end();
    }
}