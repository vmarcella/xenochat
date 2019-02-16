import React, { Component } from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
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

    componentDidMount() {
        //Validate that both passwords match eachother
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => value === this.state.password )
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
                        <ValidatorForm autoComplete="off" className="registerForm">
                                <TextValidator
                                    id="name"
                                    label="username"
                                    name="username"
                                    type="text"
                                    value={this.state.username}
                                    onChange={handleChange}
                                    margin="normal"
                                    className="registerInput"
                                />
                                <TextValidator
                                    id="email"
                                    label="email"
                                    name="email"
                                    type="email"
                                    value={this.state.email}
                                    onChange={handleChange}
                                    margin="normal"
                                    className="registerInput"
                                />
                                <TextValidator
                                    id="email"
                                    label="Password"
                                    name="password"
                                    type="password"
                                    value={this.state.password}
                                    onChange={handleChange}
                                    margin="normal"
                                    className="registerInput"
                                />
                                <TextValidator
                                    id="email"
                                    label="Confirm Password"
                                    name='confirmPassword'
                                    type="password"
                                    value={this.state.confirmPassword}
                                    onChange={handleChange}
                                    margin="normal"
                                    className="registerInput"
                                />
                                <Button color="primary" type="submit" className="registerSubmitBtn">
                                    Submit
                                </Button>
                        </ValidatorForm> 
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}

export default Register;
