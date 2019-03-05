const Message = require('../models/Message');

// getMessages returns 50 of the most recent messages
// GET /api/v1/messages -> Messages
const getMessages = async (req, res) => {
    let messages;
    try {
        messages = await Message.find().sort({ createdAt: -1 }).limit(50);
    } catch (err) {
        return res.status(503).json({
            err: 'db',
            type: 'message',
            desc: 'Couldnt successfully retrieve messages',
        });
    }

    // Return found messages
    if (messages) {
        return res.json({
            messages,
        });
    }

    // No messages found for the server
    return res.status(204).json({
        err: 'bad req',
        type: 'message',
        desc: 'Couldnt find any messages',
    });
};

// getMessage returns a single message.
// GET /api/v1/messages/:messageId -> Message
const getMessage = async (req, res) => {
    try {
        const message = await Message.findOne({ _id: req.params.messageId });

        if (message) {
            return res.json({
                message,
            });
        }

        return res.status(204).json({
            err: 'no content',
            type: 'message',
            desc: 'Couldnt find the message requested, bad message ID?',
        });
    } catch (err) {
        return res.status(503).json({
            err: 'db',
            type: 'message',
            desc: 'Couldnt successfully retrieve messages',
        });
    }
};

module.exports = {
    getMessages,
    getMessage,
};
