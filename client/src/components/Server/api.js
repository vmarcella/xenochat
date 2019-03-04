import openSocket from 'socket.io-client';
let socket;

// Register listeners for our client and all the callbacks that need 
// to be made to the client when a socket event is triggered
const registerListeners = (client) => {
    socket.on('new user', (username) => {
        client.updates.receiveNewUser(username);
    }) 

    socket.on('new message', (msg) => {
        console.log(msg)
        if (client.channel === msg.channel) {
            client.updates.receiveNewMessage(msg);
        }
    });

    socket.on('new channel', (channel) => {
        client.udpates.receiveNewChannel(channel);
    })

    socket.on('user changed channel', (data) => {
        client.updates.changeChannel(data);
    })

    socket.on('get online users', (onlineUsers) => {
        client.updates.receiveOnlineUsers(onlineUsers);
    });

    socket.on('user has left', (onlineUsers) => {
        client.updates.receiveOnlineUsers(onlineUsers)
    })
}

// Connect to the server when the user has signed into it
export const connectToServer = (client) => {
    socket = openSocket(process.env.PROD_URI || 'https://xenochat-vm.herokuapp.com')
    registerListeners(client);
    
    socket.emit('new user', client.user)
}

// Send a message to the server
export const newMessage = (msg) => {
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


