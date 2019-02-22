const handleChat = (io, socket, serverInfo) => {
    socket.on('new user', (user) => {
        serverInfo.onlineUsers[user.username] = socket.id;
        socket.username = user.username;

        socket.join('General');

        io.emit('new user', user.username);
    });
}
