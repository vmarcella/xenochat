const express = require('express');

// overall app controller
const appController = express.Router();

// API controller
const apiController = require('./api');

// import Authentication middleware
const authenticate = require('../lib/authenticate');

// Mount the api router with authentication
appController.use(authenticate);
appController.use('/api', apiController);

module.exports = appController;
