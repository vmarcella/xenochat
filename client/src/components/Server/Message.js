import React from 'react';
import { Grid, Typography } from '@material-ui/core';

export default (props) => {
    return (
        <Grid container direction="row" alignItems="center">
            <Grid style={styles.name}item xs={4} md={4} lg={4}>
                <Typography variant="p" color="primary">{props.user.firstName}</Typography>
            </Grid>
            <Grid style={styles.message } item xs={8} md={8} lg={4}>
                <Typography color="secondary" variant="p">{props.message}</Typography>
            </Grid>
        </Grid>
    ) 
}

const styles = {
    name: {
        height: 40,
        width: '20%',
    },
    message: {
        height: 40,
        width: '80%',
    }
}
