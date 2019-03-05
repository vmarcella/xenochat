const express = require('express');

// require the auth router functions
const auth = require('../routes/auth');

const router = express.Router();

// Map the router to the function handlers
router.post('/signup', auth.signup);
router.post('/login', auth.login);

// Export the router
module.exports = router;
