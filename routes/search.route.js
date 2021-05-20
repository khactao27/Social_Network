let express = require('express');
let controller = require('../controllers/search.controller');
let router = express.Router();

router.get('/', controller.search);

module.exports = router;