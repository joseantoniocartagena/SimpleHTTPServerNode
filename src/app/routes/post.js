'use strict';
const postCtrl = require('../controllers/post.controller');
const express = require('express');
const router = express.Router();
var multer = require('multer');
var upload = multer();
router.post('/newpost', upload.single('image'), postCtrl.newPost);
module.exports = router;