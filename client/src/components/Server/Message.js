import React from 'react';
import { Grid, Typography } from '@material-ui/core';

export default (props) => {
    return (
        <>
            <Typography variant="p" color="primary">{props.user.username}</Typography>
            <Typography color="secondary" variant="p">{props.message}</Typography>
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
