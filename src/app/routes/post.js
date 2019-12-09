'use strict';
const postCtrl = require('../controllers/post.controller');
const express = require('express');
const router = express.Router();

router.post('/post', postCtrl.post);
module.exports = router;