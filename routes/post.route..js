const express = require('express');
let controller = require('../controllers/post.controller');

const router = express.Router();

router.get('/posts/:id', controller.getPost);
router.put('/posts/:id', controller.updatePost);
router.post('/posts', controller.createPost);
router.delete('/posts/:id', controller.deletePost);

module.exports = router;