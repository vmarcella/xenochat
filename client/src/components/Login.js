import React, { Component } from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
        }
    }

    render() {
        const handleChange = (e) => {
            this.setState({
                [e.target.name]: e.target.value,
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
                            <h1>Sign in to Xenochat</h1>
                            <ValidatorForm autoComplete="off" className="registerForm">
                                <TextValidator
                                    id="name"
                                    label="Username"
                                    name="username"
                                    type="text"
                                    value={this.state.username}
                                    onChange={handleChange}
                                    margin="normal"
                                    className="registerInput"
                                    validators={['required', 'minStringLength:6']}
                                    errorMessages={['This field is required!', 'Names must be at least 3 characters']}
                                    required
                                />
                                <TextValidator
                                    id="password"
                                    label="Password"
                                    name="password"
                                    type="password"
                                    value={this.state.email}
                                    onChange={handleChange}
                                    margin="normal"
                                    className="registerInput"
                                    validators={['required']}
                                    errorMessages={['This field is required!']}
                                    required
                                />
                                <Button color="primary" type="submit" className="registerFormBtn">
                                    Submit
                                </Button>
                            </ValidatorForm>
                        </Paper>
                    </Grid>
            </Grid>
        )
    }
}

export default Login;
