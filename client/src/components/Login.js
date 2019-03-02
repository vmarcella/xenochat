import React, { Component } from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { loginUser } from '../actions/user';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

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
        // handle updates for input
        const handleChange = (e) => {
            this.setState({
                [e.target.name]: e.target.value,
            })
        }

        if (this.props.user !== null) {
            return (<Redirect to="chat"></Redirect>)
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
                            <ValidatorForm onSubmit={() => this.props.loginUser(this.state)}autoComplete="off" className="registerForm">
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
                                    value={this.state.password}
                                    onChange={handleChange}
                                    margin="normal"
                                    className="registerInput"
                                    validators={['required']}
                                    errorMessages={['This field is required!']}
                                    required
                                />
                                <Button color="primary" type="submit" className="registerFormBtn" onclick={() => this.props.loginUser() }>
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
        loginUser,
    }
}

// Map everything to our object and connect our compnent to the redux store
export default connect(mapStateToProps, mapDispatchToProps())(Login);
