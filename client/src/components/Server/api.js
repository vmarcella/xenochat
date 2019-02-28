import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000');

// Register listeners for our client and all the callbacks that need 
// to be made to the client when a socket event is triggered
const registerListeners = (client) => {
    socket.on('new user', (username) => {
        client.updates.newUser(username);
    }) 

    socket.on('new message', (data) => {
        if (client.channel === data.channel) {
            client.updates.newMessage(data);
        }
    });

    socket.on('new channel', (channel) => {
        client.udpates.newChannel(channel);
    })

    socket.on('user changed channel', (data) => {
        client.updates.changeChannel(data);
    })

    socket.on('get online users', (onlineUsers) => {
        client.updates.onlineUsers(onlineUsers);
    });

    socket.on('user has left', (onlineUsers) => {
        client.updates.onlineUsers(onlineUsers)
    })
}

// Connect to the server when the user has signed into it
export const connectToServer = (client) => {
    socket.emit('new user', client.user.username)
    registerListeners();
}

// Send a message to the server
export const sendMessage = (msg) => {
    if (msg.message.length > 0) {
        socket.emit('new message', msg);
        return true;
    }
    return false;
}

// Create a new channel
export const newChannel = (channel) => {
    if (channel.length > 0) {
        socket.emit('new channel', newChannel);
        return true;
    }
    return false
}


