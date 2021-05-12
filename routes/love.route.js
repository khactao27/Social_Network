const express = require('express');

let router = express.Router();

router.post('/reacts');
router.delete('/reacts/:id');