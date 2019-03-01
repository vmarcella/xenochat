import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, GridList, GridListTile, Grid, Paper, Typography, TextField } from '@material-ui/core'
import { connectToServer, newMessage, newChannel } from './api';

import Message from './Message';

import { loginUser, logoutUser } from '../../actions/user';

class Server extends Component {
    constructor(props) {
        super(props);
        this.state = {
            channel: 'General',
            channels: ['General'],
            onlineUsers: [this.props.user.username],
            messages: [],
            currentMessage: '',
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

    // create a new user
    newUser = (username) => {
        const onlineUsers = this.onlineUsers;
        onlineUsers.push(username)
        this.setState({onlineUsers})
    }

    // create a new message
    newMessage = (message) => {
        const messages = this.state.messages;
        messages.push(message);
        this.setState({ messages })
    }

    // create a new channel
    newChannel = (channel) => {
        const channels = this.state.channels;
        channels.push(channel);
        this.setState({ channels })
    }

    // Change the current channel
    changeChannel = (channel) => {
        
    }

    // Get all online users 
    onlineUsers = (onlineUsers) => {
        this.setState({ onlineUsers });
    }

    updateMessage = (e) => {
        this.setState({
            currentMessage: e.target.value,
        })
    }

    sendMessage = () => {
        // Msg object to send off to the server
        const msg = {
            user: this.props.user,
            message: this.state.currentMessage,
        }

        // Create a new message and update all the sent messages on the frontend
        const newMessages = this.state.messages
        newMessages.push(msg.message)

        this.setState({
            messages: newMessages,
            currentMessage: '',
        })

    }
    render() {
        if(this.props.user) {
            return (
                <>
                <div style={styles.root}>
                    <Grid container justify="center">
                        <Grid item xs={12} md={8} lg={8}>
                            <Paper>
                                <Typography style={styles.headerText} variant="h1">Xenochat</Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Grid container style={styles.activeContainer} justify="center">
                        <Grid item xs={6} md={6} lg={4} style={styles.activeChannels}> 
                            <Typography style={styles.headerText} variant="h3">Active channels</Typography>
                            <Paper>
                                <GridList>
                                    {Array.from(this.state.channels).map((channel) => (
                                        <GridListTile style={{textAlign: 'center', width:'100%'}}>
                                                <Typography color="primary" variant="p">{channel}</Typography>
                                        </GridListTile>
                                    ))}

                                </GridList>
                            </Paper>
                        </Grid>
                        <Grid item xs={6} md={6} lg={4} style={styles.activeUsers}>
                            <Typography style={styles.headerText} variant="h3">Active users</Typography>
                            <Paper>
                                <GridList>
                                    {Array.from(this.state.onlineUsers).map((user) => (
                                        <GridListTile style={{textAlign: 'center', width:'100%'}}>
                                                <Typography color="primary" variant="p">{user}</Typography>
                                        </GridListTile>
                                    ))}
                                </GridList>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Grid style={styles.messageContainer} container justify="center">
                        <Grid item xs={12} md={8} lg={8}>
                            <Typography style={styles.headerText} variant="h3">Currently speaking in {this.state.channel}</Typography>
                            <Paper>
                                <GridList style={styles.messageList} cols={1} cellHeight={50} spacing={1}>
                                    {Array.from(this.state.messages).map((message) => (
                                        <GridListTile>
                                            <Paper>
                                            <Message message={message} user={this.props.user}/>
                                            </Paper>
                                        </GridListTile>
                                    ))}
                                </GridList>
                                <Grid container> 
                                    <Grid item xs={11}>
                                    <TextField
                                        id="outlined-text"
                                        label="Enter a message"
                                        type="text"
                                        margin="normal"
                                        variant="outlined"
                                        style={styles.messageInput}
                                        onChange={this.updateMessage}
                                        value={this.state.currentMessage}
                                    />
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Button 
                                            style={styles.messageButton} 
                                            variant="outlined" 
                                            onClick={() => this.sendMessage()}
                                        >
                                            Send
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
               </>
            )
        }
    }
}


const styles = {
    root: {
        height: '100vh',
    },
    headerText: {
        textAlign: 'center',
        padding: 10
    },
    activeContainer: {
        margin: '30px 0',
        height: 200,
    },
    activeChannels: {
        padding: '0 10px',
    },
    activeUsers: {
        padding: '0 10px',
    },
    messageContainer: {
        margin: '80px 0',
        padding: '0 15px',
        height: 500,
    },
    messageList: {
        height: 300,
        width: '100%'
    },
    messageInput: {
        marginTop: 0,
        marginBottom: 0,
        width: '100%',
        height: '100%'
    },
    messageButton: {
        color: '#15878F',
        width: '100%',
        height:'100%'
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
        loginUser,
        logoutUser,
    }
}

// Map everything to our object and connect our compnent to the redux store
export default connect(mapStateToProps, mapDispatchToProps())(Server);
