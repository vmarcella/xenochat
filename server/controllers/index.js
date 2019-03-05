const express = require('express');

// overall app controller
const appController = express.Router();

// API controller
const apiController = require('./api');

// Mount the api router
appController.use('/api', apiController);

module.exports = appController;
