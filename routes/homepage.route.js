const controller = require('../controllers/homepage.controller');
const express = require('express');
const Auth = require('../middlewares/auth.middleware');
const Notification = require('../controllers/notification.controller');

const routeHome = express.Router();

routeHome.get('/',Auth.Auth, controller.getHome);
routeHome.get('/login', controller.getLogin);
routeHome.get('/signup', controller.signUp);
routeHome.get('/notifications', Auth.Auth, Notification.getNotifications);
module.exports = routeHome;