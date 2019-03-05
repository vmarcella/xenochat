const express = require('express');

const authController = require('./auth');

const router = express.Router();

// Setup the auth controller
router.use('/v1/auth', authController);

module.exports = router;
