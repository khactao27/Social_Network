const express = require('express');
let controller = require('../controllers/post.controller');

const router = express.Router();

// router.get('/:id', controller.getPost);
// router.put('/:id', controller.updatePost);
router.post('/',controller.createPost);
//router.delete('/:id', controller.deletePost);

module.exports = router;