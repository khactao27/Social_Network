const express = require('express');
let controller = require('../controllers/post.controller');
let love = require('../controllers/love.controller');
let comment = require('../controllers/comment.controller');

const router = express.Router();

router.get('/:id', controller.getPost);
router.put('/:id', controller.updatePost);
router.post('/',controller.createPost);
router.delete('/:id', controller.deletePost);
router.post('/:id/like', love.react);
router.post('/:id/unlike', love.unreact);
router.post('/:id/comment', comment.createComment);

module.exports = router;