'use strict';
const authCtrl = require('../controllers/auth.controller');
const express = require('express');
const router = express.Router();

router.post('/signin', authCtrl.signin)
router.post('/login', (req, res) => {

});
module.exports = router;