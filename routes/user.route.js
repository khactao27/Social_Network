const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const userFollow = require('../controllers/follow.controller');
const Auth = require('../middlewares/auth.middleware');


router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/:id/follow', Auth.Auth, userFollow.follow);
router.post('/:id/unfollow', Auth.Auth, userFollow.unfollow);
router.get('/:user_id',Auth.Auth, userController.getUser);
router.post('/:user_id', Auth.Auth, userController.updateInfo);

module.exports = router;