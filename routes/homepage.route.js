const controller = require('../controllers/homepage.controller');
const express = require('express');
const Auth = require('../middlewares/auth.middleware');

const routeHome = express.Router();

routeHome.get('/',Auth.Auth, controller.getHome);
routeHome.get('/login', controller.getLogin);
routeHome.get('/signup', controller.signUp);
module.exports = routeHome;