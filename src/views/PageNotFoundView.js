import React from 'react';
import PropTypes from 'prop-types';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    infoBox: {
        padding: theme.spacing.unit * 3,
    },
});

class PageNotFoundView extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    };

    componentDidMount() {
        document.title = '404 | ' + document.location.host;
    }

    render() {
        const { classes } = this.props;

        return (
            <>
                <Grid container>
                    <Grid item xs={false} sm={false} md={2} lg={3} xl={3} />
                    <Grid item xs={12} sm={12} md={8} lg={6} xl={6} >
                        <Fade in={true} timeout={500}>
                            <Paper className={classes.infoBox}>
                                <List dense>
                                    <ListItem><Typography component="h2" variant="h1">404</Typography></ListItem>
                                    <ListItem><Typography component="h2" variant="h5">Page Not Found</Typography></ListItem>
                                </List>
                            </Paper>
                        </Fade>
                    </Grid>
                </Grid>
            </>
        );
    }
}

export default withStyles(styles)(PageNotFoundView);
