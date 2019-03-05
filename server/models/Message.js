const mongoose = require('mongoose');

const { Schema } = mongoose;

// Create the user schema with both messages and usernames being required
const messageSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);
