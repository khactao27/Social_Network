const express = require('express');
let controller = require('../controllers/post.controller');
let love = require('../controllers/love.controller');
let comment = require('../controllers/comment.controller');
let Auth = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/:id', controller.getPost);
router.put('/:id', controller.updatePost);
router.post('/', Auth.Auth, controller.createPost);
router.delete('/:id', controller.deletePost);
router.post('/:idpost/like',Auth.Auth, love.react);
router.post('/:idpost/unlike',Auth.Auth, love.unreact);
router.post('/:idpost/comments', comment.createComment);

module.exports = router;