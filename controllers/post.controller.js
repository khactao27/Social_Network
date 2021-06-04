let Post = require('../models/post.model');
var multer  = require('multer');
const path = require('path');
let helpers = require('./helpers');
const fs = require('fs');
let Love = require('../models/love.model');
let Comment = require('../models/comment.model');
let jwt = require('jsonwebtoken');

// define the storage location for our images
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/uploads/');
    },
    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

module.exports.getPost = async(req, res)=>{
    let post_id = req.params.idPost;
    try {
        Post.findAll(post_id).then(result => {
            if(result.length < 1){
                return res.status(404).json({
                    message:"404 Not found page!"
                }).end();
            }
            res.status(200).json({
                result: result
            }).end();
        }).catch(err=>{
            return res.status(500).json({
                message: 'Search post failed'
            }).end()
        })
    } catch (error) {
        return res.status(500).json({
            message: 'get post failed'
        }).end();
    }
}

module.exports.createPost = (req, res)=>{
     // 'profile_pic' is the name of our file input field in the HTML form
     let upload = multer({ storage: storage, fileFilter: helpers.imageFilter }).single('image_post');
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
         let caption = req.body.caption;
         let img_url = '/uploads/'+ path.basename(req.file.path);
         let userData = req.userData;
         let user_id = userData.user_id;
         try{
             Post.create({
                 post_id: user_id + Date.now().toString(),
                 user_id: user_id,
                 caption: caption,
                 timestamp: Date.now(),
                 img_url: img_url,
                 num_of_loves: 0,
                 num_of_comments: 0
             }).then(result=>{
                res.redirect('/');
             }).catch(error=>{
                 console.log(error);
             })
         }catch(error){
             res.status(500).json({
                 message: "Create new post failed",
                 error: error
             })
         }
     });
}
module.exports.updatePost = (req, res, next)=>{
    try {
        let post_id = req.params.id;
        let caption = req.body.caption;
        let user_id = req.userData.user_id;
        Post.findByPk(post_id).then(result =>{
            if(result.length < 1){
                return res.status(409).json({
                    message: "Do not have a post want update"
                }).end();
            }
            if(result[0].user_id === user_id){
                Post.update({caption: caption}, {
                    where: {
                        post_id: post_id
                    }
                }).then(rs =>{
                    res.status(200).json({
                        message: 'update post success!'
                    }).end();
                }).catch(err =>{
                    res.status(500).json({
                        message: 'Update failed'
                    }).end();
                })
            }
            else{
                res.status(404).json({
                    message: '404 : post not found'
                }).end();
            }
        }).catch(error=>{
            return res.status(500).json({
                message:'Search failed'
            }).end();
        });
    } catch (error) {
        res.status(500).json({
            message: "Update failed",
            error: error
        }).end();
    }
}

module.exports.deletePost = async(req, res, next)=>{
    try {
        let post_id = req.params.id;
        Post.findByPk(post_id).then(post => {
            if(post.length < 1){
                return res.status(404).json({
                    message: "404 Not found post"
                }).end();
            }
            Post.update({delete: 1}, {
                where: {
                    post_id: post_id
                }
            }).then(result =>{
                res.status(200).json({
                    message:"Deleted post"
                }).end();
            })
        })
    } catch (e) {
        res.status(400).send({ message: "Error deleting image!", error: e.toString(), req: req.body });
    }
}