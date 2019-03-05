const express = require('express');

// Import API based controllers
const authController = require('./auth');
const messageController = require('./messages');

const router = express.Router();

// Setup the v1 api endpoints
router.use('/v1/auth', authController);
router.use('/v1/messages', messageController);

module.exports = router;
