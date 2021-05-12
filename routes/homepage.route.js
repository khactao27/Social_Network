const controller = require('../controllers/homepage.controller');
const express = require('express');

const routeHome = express.Router();

routeHome.get('/', controller.getHome);

module.exports = routeHome;