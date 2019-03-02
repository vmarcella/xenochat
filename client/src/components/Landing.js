import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'

// Material imports
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';

// Landing page 
class Landing extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        // Redirect the user to the chat if they're signed in
        if(this.props.user) {
            return (
                <Redirect to="/chat"/>
            )
        }
        return (

            <Grid 
                className="landing"
                container
                spacing={0}
                justify="center"
                alignItems="center"
            >
                 
                <Grid className="landingActionZone" item xs={6}>
                    <h1>XenoChat</h1>
                    <Paper className="">
                        <Grid    
                            container
                            spacing={0}
                        >
                            <Grid item xs={6}>
                                <Card className="registerCard">
                                    <CardActionArea component={Link} to="/register">
                                        <CardContent>
                                            <h1>Register</h1>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                            <Grid item xs={6}>
                                <Card className="loginCard">
                                    <CardActionArea component={Link} to="/login">
                                        <CardContent>
                                            <h1>Login</h1>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        </Grid>
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

// Map everything to our object and connect our compnent to the redux store
export default connect(mapStateToProps)(Landing);

