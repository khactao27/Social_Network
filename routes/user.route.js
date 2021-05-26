const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const userFollow = require('../controllers/follow.controller');
const auth = require('../middlewares/auth.middleware');


router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/:id/follow', auth.Auth, userFollow.follow);
router.post('/:id/unfollow', auth.Auth, userFollow.unfollow);
router.get('/:id', userController.findUser);

module.exports = router;