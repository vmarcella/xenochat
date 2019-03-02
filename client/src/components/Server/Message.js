import React from 'react';
import { Grid, Typography } from '@material-ui/core';

// Export the message component
export default (props) => {
    return (
        <>
            <Typography style={styles.username} variant="body1" color="primary">{props.user}</Typography>
            <Typography style={styles.message} color="secondary" variant="body2">{props.message}</Typography>
        </>
    ) 
}

const styles = {
    name: {
        height: 40,
        width: '20%',
    },
    username: {
        marginLeft: 10,
    },
    message: {
        marginLeft: 20,
    }
}
