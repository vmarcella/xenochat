const express = require('express');

const router = express.Router();

// get the message route handlers
const messages = require('../routes/messages');

// Map message endpoints to handlers
router.get('/', messages.getMessages);
router.get('/:messageId', messages.getMessage);

module.exports = router;
