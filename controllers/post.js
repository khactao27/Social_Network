let post =require('../models/post.model');

async function findPost(idPost){
    let p = await post.findByPk(idPost);
    return p;
}

export {findPost};