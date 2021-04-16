const express = require('express');
const controller = require('../controllers/homepage.controller');

const route = express.Router();

route.get('/');

export {route};