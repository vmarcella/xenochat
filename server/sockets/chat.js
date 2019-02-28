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

    // When a new message has been sent by a user 
    socket.on('new message', (data) => {
        console.log(`${data.sender}: ${data.message}`);
        io.to(data.channel).emit('new message', data);
    });

    // When a new channel has been created
    socket.on('new channel', (newChannel) => {
        serverInfo.channels[newChannel] = [];
        socket.join(newChannel);

        io.emit('new channel', newChannel);

        const channelData = {
            channel: newChannel,
            messages: serverInfo.channels[newChannel],
        };

        socket.emit('user changed channel', channelData);
    });

    // When a client wants to get all online users
    socket.on('get online users', () => {
        socket.emit('get online users', onlineUsers);
    });

    // When the client disconnects
    socket.on('disconnect', () => {
        delete serverInfo.onlineUsers[socket.username];
        io.emit('user has left', onlineUsers);
    });
}

// Export the handle chat wrapper function
module.exports = {
    handleChat,
}
