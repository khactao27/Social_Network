let jwt = require('jsonwebtoken');
let User = require('../models/user.model');
let Post = require('../models/post.model');
const bcrybt = require('bcrypt');
const Follow = require('../models/follow.model');
const sequelize = require('../models/db');

module.exports.getUser = async(req, res, next)=>{
    try {
        let token = req.cookies.token;
        let decode = jwt.decode(token);
        let user_id = decode.user_id;
        User.findAll({
            user_id: user_id
        }).then(users => {
            if(users.length < 1){
                return res.status(404).json({
                    message: '404 User not found'
                }).end();
            }
            Post.findAll({
                where: {
                    where: user_id
                }
            }).then(posts => {
                return res.status(200).json({
                    user: users[0],
                    posts: posts
                }).end();
            })
        })
    } catch (error) {
        return res.status(500).json({
            message: "Get user failed"
        }).end();
    }
}

module.exports.updateInfo = (req, res, next)=>{
    res.send("Update info success!");
}

module.exports.login = async(req, res, next)=>{
    User.findAll({
        where: {
            email: req.body.email
        }
    })
    .then(user =>{
        if(user.length < 1){
            return res.status(500).json({
                message: 'Login failed'
            }).end();
        }else{
            bcrybt.compare(req.body.password, user[0].password, (err, result)=>{
                if(err){
                    return res.status(500).json({
                        error: err
                    });
                }else{
                   const token = jwt.sign({
                        email: user[0].email,
                        user_id: user[0].user_id,
                        avatar: user[0].avatar
                    }, "Tee_secret", {
                        expiresIn:"1h"
                    });
                    res.cookie('token', token);
                    return res.status(200).json({
                        message: "Auth Successful",
                        token: token
                    }).end();
                }
            });
        }
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
}

module.exports.signup = (req, res, next)=>{
    User.findAll({
        where:{
            email: req.body.email
        }
    })
    .then(user=>{
        if(user.length >= 1){
            return res.status(409).json({
                error: "Mail exists"
            });
        }else{
            bcrybt.hash(req.body.password, 10, (err, hash)=>{
                if(err){
                    return res.status(500).json({
                        error: err
                    });
                }else{
                    const user = User.build({
                        fullname: req.body.fullname,
                        email: req.body.email,
                        birthday: new Date(req.body.birthday),
                        user_id: req.body.user_id,
                        password: hash
                    });
                    user.save().then(result => {
                        // Follow.create({follower_id: req.body.user_id, following_id: req.body.user_id});
                        sequelize.query(`INSERT INTO follow (following_id, follower_id) VALUES ('${req.body.user_id}', '${req.body.user_id}')`);
                        res.redirect('/login');
                    })
                    .catch(err=>{
                        console.log(err);
                        res.status(500).json({
                            error: err
                        })
                    })
                }
            })
        }
    })
}

module.exports.findUser = (req, res, next)=>{
    res.send("Profile user page");
}