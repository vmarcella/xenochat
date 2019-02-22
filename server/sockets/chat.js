// Handle socket events related to the chat room
const handleChat = (io, socket, serverInfo) => {
    // Handle when a new user has entered a room
    socket.on('new user', (user) => {
        // Register information about the user to the coket object
        serverInfo.onlineUsers[user.username] = socket.id;
        socket.username = user.username;

        // Force the user to join the general room
        socket.join('General');

        // Alert all users that someone has entered the chat room
        io.emit('new user', user.username);
    });
}

// Export the handle chat wrapper function
module.exports = {
    handleChat,
}
