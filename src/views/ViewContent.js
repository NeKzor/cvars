  
import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((_) => ({
    root: {
        marginBottom: 30,
    },
}));

const ViewContent = ({ children }) => {
    const classes = useStyles();

    return (
        <Grid className={classes.root} container>
            <Grid item xs={false} md={1} lg={2} />
            <Grid item xs={12} md={10} lg={9}>
                {children}
            </Grid>
        </Grid>
    );
};

export default ViewContent;
