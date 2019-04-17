import React from 'react';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import CvarsTable from '../components/CvarsTable';
import CvarsFilter from '../components/CvarsFilter';
import Client from '../Client';
import { FCVAR, OS } from '../Types';
import { withContext } from '../withContext';

const styles = theme => ({
    filterBox: {
        paddingLeft: 20,
        padding: 10,
        marginBottom: theme.spacing.unit * 3,
    },
    fab: {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
    },
});

class CvarsView extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        hasNewCheckbox: PropTypes.bool,
    };

    state = {
        cvars: [],
        filter: () => true,
    };

    async componentDidMount() {
        const { location: { pathname }, games } = this.props;

        const game = games[pathname];
        document.title = (game ? game.title + ' | ' : '') + 'Cvars | ' + document.location.host;

        const cvars = await Client.get(pathname);
        for (let cvar of cvars) {
            cvar.getFlags = function () {
                return this._flags ? this._flags : this._flags = FCVAR.list(this.flags);
            };
            cvar.getOs = function () {
                return this._os ? this._os : this._os = OS[this.system];
            };
        }
        this.setState({ cvars });
    }

    updateFilter = (filter) => this.setState({ filter });

    render() {
        const { classes, hasNewCheckbox } = this.props;
        const { cvars, filter } = this.state;

        return (
            <>
                <Grid container>
                    <Grid item xs={false} md={1} lg={2} />
                    <Grid item xs={12} md={10} lg={9}>
                        <Paper className={classes.filterBox}>
                            <CvarsFilter searchFilter={this.updateFilter} newCheckbox={hasNewCheckbox} />
                        </Paper>
                        <Paper>
                            {cvars.length === 0 && <LinearProgress />}
                            <CvarsTable data={cvars.filter(filter)} />
                        </Paper>
                    </Grid>
                </Grid>
                <Fab title="Jump to top" color="primary" className={classes.fab} onClick={() => window.scroll(0, 0)}>
                    <KeyboardArrowUpIcon />
                </Fab>
            </>
        );
    }
}

export default withContext(withStyles(styles)(CvarsView));
