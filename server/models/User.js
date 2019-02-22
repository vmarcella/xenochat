const mongoose = require('mongoose');

const { Schema } = mongoose;

// Create the user schema
const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
    },
});

module.exports = mongoose.model('User', userSchema);
