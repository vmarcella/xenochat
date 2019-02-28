import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core'
import { connectToServer, newMessage, newChannel } from './api';

import { logoutUser } from '../../actions/user';

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
        const client = {
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


    render() {
        if(this.props.user) {
            return (
                <Grid container xs={12}>

                </Grid> 
            )
        }
    }
}

// Takes in the entire state and maps the application state to
// props on the component
const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
}

// Maps the dispatch functions to 
// component props
const mapDispatchToProps = () => {
    return {
        logoutUser,
    }
}

// Map everything to our object and connect our compnent to the redux store
export default connect(mapStateToProps, mapDispatchToProps())(Server);
