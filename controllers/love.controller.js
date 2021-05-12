let love = require('../models/love.model');

module.exports.react = (req, res)=>{
    res.send("Love");
}

module.exports.unreact = (req, res)=>{
    res.send("UnLove");
}