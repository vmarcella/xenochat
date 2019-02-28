import React, { Component } from 'react';
import { connectToServer, newMessage, newChannel } from './api';

class Server extends Component {
    constructor(props) {
        super(props);

        this.state = {
            channel: 'General',
            onlineUsers: [],
            messages: [],
        }
    }

    // Handle when the server is mounted
    componentDidMount() {
        client = {
            user: this.props.user,
            channel: this.state.channel,
            updates: {
                newUser: this.newUser,
                newMessage: this.newMessage,
                newChannel: this.newChannel,
                changeChannel: this.changeChannel,
                onlineUsers: this.onlineUsers,
            }
        }
        connectToServer(client);
    }
}


mapPropsToState()
