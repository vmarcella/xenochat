// Import npm modules
const socketio = require('socket.io');

// Import chat listener
const registerChatSockets = require('./chat');

// Instantiate the server with basic
const serverInfo = {
    onlineUsers: {},
    channels: {
        General: [],
    },
};

// Create the socket connection
const createSocket = (app) => {
    // create our io object utilizing the servers connection
    const io = socketio(app);

    // Register how to handle any connection being made to our
    io.on('connection', (socket) => {
        const server = {
            socket,
            io,
            info: serverInfo,
        };
        registerChatSockets(server);
    });
};

module.exports = {
    createSocket,
};
