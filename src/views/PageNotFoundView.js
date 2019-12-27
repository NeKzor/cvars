import React from 'react';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useTitle } from '../Hooks';

const useStyles = makeStyles((theme) => ({
    infoBox: {
        padding: theme.spacing(3),
    },
}));

const PageNotFoundView = () => {
    useTitle('404');

    const classes = useStyles();

    return (
        <Grid container>
            <Grid item xs={false} sm={false} md={2} lg={3} xl={3} />
            <Grid item xs={12} sm={12} md={8} lg={6} xl={6}>
                <Fade in={true} timeout={500}>
                    <Paper className={classes.infoBox}>
                        <List dense>
                            <ListItem>
                                <Typography component="h2" variant="h1">
                                    404
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <Typography component="h2" variant="h5">
                                    Page Not Found
                                </Typography>
                            </ListItem>
                        </List>
                    </Paper>
                </Fade>
            </Grid>
        </Grid>
    );
};

export default PageNotFoundView;
