const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

const maxAge = 60 * 24 * 60 * 60 * 1000;

// Sign up route
router.post('/signup', async (req, res, next) => {
    const user = new User(req.body);
    
    try {
        const savedUser = await user.save();
        const token = jwt.sign({ 
            _id: savedUser._id, 
            username: user.username,
        }, process.env.SECRET, {
            expiresIn: '60 days',
        });

        // What to send the user for storage
        const xenoUser = {
            username: user.username,
            _id: savedUser._id,
            token
        }

        return res.json(xenoUser);
    } catch(err){
        next(err);
    }
});

// Log the user into the chat server
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username }).select('username password');

        // Compare the password against the one the user has entered
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (err) {
                return res.json({
                    err: 'db error',
                    body: 'Something went wrong with the database, the owner has been contacted!',
                });
            }

            if (isMatch) {
                const token = jwt.sign({
                    _id: user._id,
                    username: user.username,
                }, process.env.SECRET, {
                    expiresIn: '60 days',
                });

                // What to send the user for storage
                const xenoUser = {
                    username: user.username,
                    _id: user._id,
                    token,
                };

                return res.json(xenoUser);
            }

            // Passwords dont match, error
            return res.json({
                err: 'pword mismatch',
                body: 'Passwords did not match',
            });
        })
    } catch (err) {
        res.json(err);
    }
});

module.exports = router;
