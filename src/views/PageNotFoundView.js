import React from 'react';
import Fade from '@material-ui/core/Fade';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useTitle } from '../Hooks';
import ViewContent from './ViewContent';

const useStyles = makeStyles((theme) => ({
    infoBox: {
        padding: theme.spacing(3),
    },
}));

const PageNotFoundView = () => {
    useTitle('404');

    const classes = useStyles();

    return (
        <ViewContent>
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
        </ViewContent>
    );
};

export default PageNotFoundView;
