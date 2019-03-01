import React from 'react';
import { Grid, Typography } from '@material-ui/core';

export default (props) => {
    return (
        <>
            <Typography variant="body1" color="primary">{props.user}</Typography>
            <Typography color="secondary" variant="body2">{props.message}</Typography>
        </>
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
