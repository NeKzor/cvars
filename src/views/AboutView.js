import React from 'react';
import PropTypes from 'prop-types';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
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
            [
                'This web application contains a large console command database of various Source Engine games.',
                'Additionally it lists hidden and OS specific commands.'
            ],
            '',
            'Q/A',
            '',
            [
                'Q: What are "New" commands?',
                'A: Commands that have been added in an updated engine version. This only applies for games that derive from other games e.g. INFRA is based on Portal 2 engine.',
            ],
            '',
            [
                'Q: How about showing the exact arguments of a console command?',
                'A: Unfortunately the engine does not provide useful information about passing arguments.',
            ],
            '',
            [
                'Q: What about commands like restart_level or impulse?',
                'A: These commands are not registered by the ICvar interface and only exist hard-coded in ClientCommand functions of entities.',
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
                    {Array.isArray(text) ? text.map((item, idx) => (<React.Fragment key={idx}>{item}<br /></React.Fragment>)) : text}
                </Typography>
            </ListItem>
        ));

        const madeWithLink = <Link rel="noopener" href="https://nekzor.github.io/SourceAutoRecord">SourceAutoRecord</Link>;
        const sourceCodeLink = <Link rel="noopener" href="https://github.com/NeKzor/cvars">GitHub</Link>;

        return (
            <>
                <Grid container>
                    <Grid item xs={false} sm={false} md={2} lg={3} xl={3} />
                    <Grid item xs={12} sm={12} md={8} lg={6} xl={6} >
                        <Fade in={true} timeout={500}>
                            <Paper className={classes.aboutBox}>
                                <List dense>
                                    <ListItem><Typography component="h2" variant="h5">Source Engine Console Commands & Variables</Typography></ListItem>
                                    {description}
                                    <ListItem></ListItem>
                                    <ListItem><Typography variant="subtitle1">Generated data with {madeWithLink}.</Typography></ListItem>
                                    <ListItem><Typography variant="subtitle1">Project is open source at {sourceCodeLink}.</Typography></ListItem>
                                </List>
                            </Paper>
                        </Fade>
                    </Grid>
                </Grid>
            </>
        );
    }
}

export default withStyles(styles)(AboutView);
