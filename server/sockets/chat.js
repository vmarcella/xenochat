const chatHandler = require('../socketHandlers/chat');

// Register all the chat socket handlers
module.exports = (server) => {
    // GET socket handlers
    server.socket.on('get online users', () => chatHandler.getOnlineUsers(server));

    // NEW socket handlers
    server.socket.on('new user', user => chatHandler.newUser(server, user));
    server.socket.on('new message', msg => chatHandler.newMessage(server, msg));
    server.socket.on('new channel', newChannel => chatHandler.newChannel(server, newChannel));
    server.socket.on('disconnect', () => chatHandler.disconnect(server));
};
