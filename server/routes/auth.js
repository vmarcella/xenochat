// Import npm modules
const express = require('express');
const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');

// Import the user model
const User = require('../models/User');

const router = express.Router();
sgMail.setApiKey(process.env.SG_API_KEY);

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
            token,
        };

        const mail = {
            from: process.env.EMAIL,
            to: user.email,
            subject: 'Thanks for signing up for xenochat',
            text: `
            Weclome to xenochat, ${user.username}! We hope that you enjoy the
            chatroom we continue to build out and look forward to any feedback you
            may have.
            `,
        };

        sgMail.send(mail);

        return res.json(xenoUser);
    } catch (err) {
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

                const mail = {
                    from: process.env.EMAIL,
                    to: user.email,
                    subject: 'Sign in',
                    text: `We just received a sign in for your account: ${user.username}
                        if this was you, then you can ignore this message 
                    `
                }
                return res.json(xenoUser);
            }

            // Passwords dont match, error
            return res.json({
                err: 'pword mismatch',
                body: 'Passwords did not match',
            });
        });
    } catch (err) {
        res.json(err);
    }
});

module.exports = router;
