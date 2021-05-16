let post = require('../models/post.model');
import { getPost } from './post';

module.exports.getPost = async(req, res)=>{
    res.send("Get post");
}

module.exports.createPost = (req, res)=>{
    
}

module.exports.updatePost = (req, res)=>{
    res.send('Update post');
}

module.exports.deletePost = (req, res)=>{
    res.send("deletePost");
}