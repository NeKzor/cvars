import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    help: {
        cursor: 'help',
    },
    aboutBox: {
        padding: theme.spacing.unit * 3,
    },
});

class AboutView extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    };

    constructor() {
        super();

        this.description = [
            'This web application exposes every available and hidden console command for various Source Engine games.',
            '',
            'Q/A',
            '',
            [
                'Q: What about commands like restart_level or impulse?',
                'A: These commands are not registered by the ICvar interface and only exist hard-coded in the RunCommand function of entities.',
            ],
            '',
            [
                'Q: How about showing the exact arguments of a console command?',
                'A: Unfortunately the engine does not provide useful information about passing arguments.',
            ],
        ];
    }

    componentDidMount() {
        document.title = 'About | ' + document.location.host;
    }

    render() {
        const { classes } = this.props;

        const description = this.description.map((text, idx) => (
            <ListItem key={idx}>
                <Typography variant="body1">
                    {Array.isArray(text) ? text.map((x, idx) => (<React.Fragment key={idx}>{x}<br /></React.Fragment>)) : text}
                </Typography>
            </ListItem>
        ));

        const madeWithLink = <Link rel="noopener" href="https://nekzor.github.io/SourceAutoRecord">SourceAutoRecord</Link>;
        const sourceCodeLink = <Link rel="noopener" href="https://github.com/NeKzor/cvars">GitHub</Link>;

        return (
            <>
                <Grid container>
                    <Grid item xs={false} md={1} lg={3} />
                    <Grid item xs={12} md={10} lg={6}>
                        <Paper className={classes.aboutBox}>
                            <List className={classes.list} dense>
                                <ListItem><Typography component="h2" variant="h5">Source Engine Console Commands & Variables</Typography></ListItem>
                                {description}
                                <ListItem></ListItem>
                                <ListItem><Typography variant="subtitle1">Generated data with {madeWithLink}.</Typography></ListItem>
                                <ListItem><Typography variant="subtitle1">Project is open source at {sourceCodeLink}.</Typography></ListItem>
                            </List>
                        </Paper>
                    </Grid>
                </Grid>
            </>
        );
    }
}

export default withStyles(styles)(AboutView);
