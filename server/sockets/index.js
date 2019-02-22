// Import npm modules
const socketio = require('socket.io');

// Import chat listener
const handleChat = require('./chat');

// Create the socket io object

// Instantiate the server with basic
const serverInfo = {
    onlineUsers: {},
    channels: {
        General: [],
    },
};

// Create the socket connection
const createSocket = (app) => {
    
    const io = socketio(app);

    io.on('connection', (socket) => {
        handleChat(io, socket, serverInfo);
    });
};

module.exports = {
    createSocket,
};
