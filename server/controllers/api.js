const express = require('express');

// Import API based controllers
const authController = require('./auth');
const messageController = require('./messages');

// import middleware for authorization
const authorize = require('../lib/authorize');

const router = express.Router();

// Setup the v1 api endpoints
router.use('/v1/auth', authController);

// Protect all v1 api endpoints that need the user to be signed in to access
router.use(authorize);
router.use('/v1/messages', messageController);

module.exports = router;
