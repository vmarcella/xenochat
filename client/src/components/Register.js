import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: '',
        }
    }

    render() {
        // Event handler for when someone makes a change to the form
        const handleChange = (event) => {
            this.setState({
                [event.target.name]: event.target.value,
            }) 
        }
        return (
            <Grid
                container
                justify="center"
                alignitems="center">
                    
                <Paper>
                    <h2>Sign up for Xenochat</h2>
                    <form autoComplete="off">
                            <TextField
                                id="name"
                                label="username"
                                value={this.state.username}
                                onChange={handleChange.bind(this)}
                            />
                    </form> 
                </Paper>
            </Grid>
        )
    }
}

export default Register;
