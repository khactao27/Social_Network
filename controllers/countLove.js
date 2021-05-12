const Love = require('../models/love.model');

async function countLove(idPost, currUser){
    const loves = await Love.findAll({
        where:{
            idPost: idPost
        }
    });
    return loves;
}