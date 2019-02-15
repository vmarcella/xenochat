import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
                alignItems="center"
                className="registerGrid"
            >
                <Grid item xs={4}>
                    <Paper className="registerContainer">
                        <h1>Sign up for Xenochat</h1>
                        <form autoComplete="off" className="registerForm">
                                <TextField
                                    id="name"
                                    label="username"
                                    name="username"
                                    type="text"
                                    value={this.state.username}
                                    onChange={handleChange}
                                    margin="normal"
                                    className="registerInput"
                                />
                                <TextField
                                    id="email"
                                    label="email"
                                    name="email"
                                    type="email"
                                    value={this.state.email}
                                    onChange={handleChange}
                                    margin="normal"
                                    className="registerInput"
                                />
                                <TextField
                                    id="email"
                                    label="Password"
                                    name="password"
                                    type="password"
                                    value={this.state.password}
                                    onChange={handleChange}
                                    margin="normal"
                                    className="registerInput"
                                />
                                <TextField
                                    id="email"
                                    label="Confirm Password"
                                    type="password"
                                    value={this.state.confirmPassword}
                                    onChange={handleChange}
                                    margin="normal"
                                    className="registerInput"
                                />
                                <Button color="primary" type="submit" className="registerSubmitBtn">
                                    Submit
                                </Button>
                        </form> 
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}

export default Register;
