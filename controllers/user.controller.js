let jwt = require('jsonwebtoken');
let User = require('../models/user.model');
let Post = require('../models/post.model');
const bcrybt = require('bcrypt');
const Follow = require('../models/follow.model');
const sequelize = require('../models/db');
var multer  = require('multer');
const {Op, QueryTypes, DataTypes} = require('sequelize');
let helpers = require('./helpers');
const path = require('path');


// define the storage location for our images
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/avatar/');
    },
    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
module.exports.updateInfo = async (req, res, next)=>{
    try {
    // 'profile_pic' is the name of our file input field in the HTML form
    let upload = multer({ storage: storage, fileFilter: helpers.imageFilter }).single('avatar_change');
     upload(req, res, async(err) => {
         // req.file contains information of uploaded file
         // req.body contains information of text fields, if there were any
         if (req.fileValidationError) {
             return res.send(req.fileValidationError);
         }
         else if (!req.file) {
             return res.send('Please select an image to upload');
         }
         else if (err instanceof multer.MulterError) {
             return res.send(err);
         }
         else if (err) {
             return res.send(err);
         }
         let user_id = req.userData.user_id;
         let class_id = req.body.class_id;
         let gender = parseInt(req.body.gender);
         let hometown = req.body.hometown;
         let fullname = req.body.fullname;
         let birthday = new Date(req.body.birthday);
         let status = parseInt(req.body.status);
         let avatar = '/avatar/' + path.basename(req.file.path);
         try{
            User.update({fullname: fullname, birthday: birthday, avatar: avatar, hometown: hometown, class_id: class_id, status: status, gender: gender}, {
                where: {
                    user_id: user_id
                }
            }).then(success =>{
                res.redirect(`/users/${user_id}`);
            })
         }catch(error){
             res.status(500).json({
                 message: "Create new post failed",
                 error: error
             })
         }
     });
    } catch (error) {
        return res.status(500).json({
            message: "Update infor failed!"
        })
    }
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
                        avatar: user[0].avatar,
                        fullname: user[0].fullname
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

module.exports.getUser = async(req, res, next)=>{
    try {
        let user_curr = req.userData;
        let id = req.userData.user_id;
        let user_id = req.params.user_id;
        let arrLoves =[];
        let postLoves = await sequelize.query(`SELECT post_id FROM loves WHERE user_id="${id}"`, {type: QueryTypes.SELECT});
        for(let love of postLoves){
            arrLoves.push(love.post_id);
        }
        let posts = await Post.findAll({
            where: {
                user_id: user_id
            },
            order:[['post_id', 'DESC']]
        });
        posts = JSON.stringify(posts);
        posts = JSON.parse(posts);
        let user = await User.findByPk(user_id);
        let avatar = user.avatar;
        for(let post of posts){
            post.avatar = avatar;
            post.timestamp = new Date(post.timestamp);
        }
        let follow = await Follow.findAll({
            attributes: ["following_id", "follower_id"],
            where:{
                following_id: user_id,
                follower_id: id
            }
        })
        let checkfollow = 0;
        if(follow.length > 0){
            checkfollow = 1;
        }
        res.render('../views/user/user.ejs', {
            user: user,
            user_curr: user_curr,
            posts: posts,
            arrLoves: arrLoves,
            comments: [],
            checkfollow: checkfollow
        });
    } catch (error) {
        res.status(404).json({
            message: "404 User not found"
        }).end();
    }
}