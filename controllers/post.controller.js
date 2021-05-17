let post = require('../models/post.model');
var multer  = require('multer');
const path = require('path');
let helpers = require('./helpers');


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
    let post_id = parseInt(req.params.id);
    try {
        let article = await post.findByPk(post_id);
        if(article !== null){
            res.set('Content-Type', 'application/json');
            res.send(JSON.stringify(article, null, 2));
            res.status(200).end();
        }
        else{
            res.send('404 Not Found!');
            res.status(404).end();
        }
    } catch (error) {
        error.trace();
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
         let user_id = parseInt(req.cookies.idUser);
         try{
             post.create({user_id: user_id, img_url: img_url, caption: caption, timestamp: Date.now()
                , number_of_loves: 0, number_of_comments: 0});
             res.redirect('/');
             res.end();
         }catch(error){
             console.error(error);
         }
         res.send(`You have uploaded this image: <hr/><img src="${'/uploads/'+ path.basename(req.file.path)}" width="500"><hr /><a href="./">Upload another image</a>`);
     });
}
module.exports.updatePost = (req, res)=>{
    let post_id = parseInt(req.params.post_id);
    try {
        
    } catch (error) {
        error.trace();
    }
}

module.exports.deletePost = (req, res)=>{
    res.send("deletePost");
}