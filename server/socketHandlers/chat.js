const Message = require('../models/Message');

// Get online users
const getOnlineUsers = (server) => {
    server.socket.emit('get online users', server.info.onlineUsers);
}

// Handle a new user joining the chat
const newUser = (server, user) => {
    // Register information about the user to the coket object
    server.info.onlineUsers[user.username] = server.socket.id;
    server.socket.username = user.username;

    // Force the user to join the general room
    server.socket.join('General');

    // Alert all users that someone has entered the chat room
    server.io.emit('new user', user.username);
    server.socket.emit('get online users', server.info.onlineUsers);
};

// Handle new messages being sent
const newMessage = async (server, msg) => {
    console.log(`${msg.username}: ${msg.message}`);
    console.log(msg.channel);
    server.io.emit('new message', msg);
    const message = new Message(msg);
    await message.save();
};

// Handle a user disconnecting
const disconnect = (server) => {
    delete server.info.onlineUsers[server.socket.username];
    server.io.emit('get online users', server.info.onlineUsers);
}

module.exports = {
    newUser,
    newMessage,
    getOnlineUsers,
    disconnect
};
