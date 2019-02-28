import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GridList, GridListTile, Grid, Paper, Typography } from '@material-ui/core'
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
                            <Paper>
                                hi
                            </Paper>
                        </Grid>
                        <Grid item xs={6} md={6} lg={4} style={styles.activeUsers}>
                            <Paper>
                                below hi
                            </Paper>
                        </Grid>
                    </Grid>
                    <Grid style={styles.messageContainer} container justify="center">
                        <Grid item xs={12} md={8} lg={12}>

                            <Paper>
                                below hi
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
    },
    activeContainer: {
        margin: '10px 0'
    },
    activeChannels: {
        padding: '0 10px',
    },
    activeUsers: {
        padding: '0 10px',
    },
    messageContainer: {
        margin: '10px 0',
        padding: '0 10px',
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
