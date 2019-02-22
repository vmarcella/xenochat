import React, { Component } from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { connect } from 'react-redux';
import { register } from '../actions/user';

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

    // Make sure the component mounts
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
                        <ValidatorForm onSubmit={() => this.props.register(this.state)} className="registerForm">
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
                                    errorMessages={['This field is required!', 'Names must be at least 6 characters']}
                                    required
                                />
                                <TextValidator
                                    id="email"
                                    label="Email"
                                    name="email"
                                    type="email"
                                    value={this.state.email}
                                    onChange={handleChange}
                                    margin="normal"
                                    className="registerInput"
                                    validators={['required', 'isEmail']}
                                    errorMessages={['This field is required!', 'Must be a valid email!']}
                                    required
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
                                    validators={['required']}
                                    errorMessages={['This field is required!']}
                                    required
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
                                    validators={['required', 'isPasswordMatch']}
                                    errorMessages={['This field is required!', 'The passwords must match!']}
                                    required
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
        register,
    }
}

// Map everything to our object and connect our compnent to the redux store
export default connect(mapStateToProps, mapDispatchToProps())(Register);
