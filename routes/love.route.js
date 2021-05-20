let express = require('express');
let controller = require('../controllers/love.controller');

let router = express.Router();

router.post('/loves/:idpost/love', controller.react);
router.post('/loves/:idpost/unlove', controller.unreact);

exports.router = router;