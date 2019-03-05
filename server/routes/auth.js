// Import npm modules
const jwt = require('jsonwebtoken');

// Import the user model
const User = require('../models/User');

const { sendMail } = require('../lib/mail');

// Sign up route
const signup = async (req, res, next) => {
    const user = new User(req.body);
    const xenoUser = {};

    try {
        const savedUser = await user.save();

        // Create the jwt token for user authentication
        const token = jwt.sign({
            _id: savedUser._id,
            username: user.username,
        }, process.env.SECRET, {
            expiresIn: '60 days',
        });

        // set the user properties to be sent back
        xenoUser.username = user.username;
        xenoUser._id = savedUser._id;
        xenoUser.token = token;
    } catch (err) {
        next(err);
    }

    // Create mail info and send it off to our mailer
    const mailInfo = { user };
    sendMail('signup', mailInfo);

    return res.json(xenoUser);
};

// Log the user into the chat server
const login = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username }).select('username email password');

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

                // Send a login confirmation email to the user
                const mailInfo = { user }
                sendMail('login', mailInfo);
                return res.json(xenoUser);
            }

            // Passwords dont match, throw an error
            return res.json({
                err: 'pword mismatch',
                body: 'Passwords did not match',
            });
        });
    } catch (err) {
        res.json(err);
    }
};

module.exports = {
    signup,
    login,
};
