let express = require('express');
let controller = require('../controllers/search.controller');
let router = express.Router();
const auth = require('../middlewares/auth.middleware');

router.get('/', controller.search);

module.exports = router;