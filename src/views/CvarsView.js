import React from 'react';
import { useLocation } from 'react-router';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import CvarsTable from '../components/CvarsTable';
import CvarsFilter from '../components/CvarsFilter';
import FloatingActionButton from '../components/FloatingActionButton';
import Api from '../Api';
import { FCVAR, OS } from '../Types';
import { useIsMounted, useTitle } from '../Hooks';
import AppState from '../AppState';

const useStyles = makeStyles((theme) => ({
    filterBox: {
        paddingLeft: 20,
        padding: 10,
        marginBottom: theme.spacing(3),
    },
}));

const CvarsView = ({ hasNewCheckbox }) => {
    const isMounted = useIsMounted();

    const { pathname, search } = useLocation();
    const query = new URLSearchParams(search);
    const defaultSearch = query.get('search');

    const {
        state: { games },
    } = React.useContext(AppState);
    const game = games[pathname];

    useTitle((game ? game.title + ' | ' : '') + 'Cvars');

    const [cvars, setCvars] = React.useState([]);
    const [filter, setFilter] = React.useState(() => (cvar) => (defaultSearch !== null ? cvar.name.includes(defaultSearch) : true));

    React.useEffect(() => {
        Api.get(pathname)
            .then((cvars) => {
                for (let cvar of cvars) {
                    cvar.getFlags = function() {
                        return this._flags ? this._flags : (this._flags = FCVAR.list(this.flags));
                    };
                    cvar.getOs = function() {
                        return this._os ? this._os : (this._os = OS[this.system]);
                    };
                }

                if (isMounted.current) {
                    setCvars(cvars);
                }
            })
            .catch((err) => console.error(err));
    }, []);

    const updateFilter = (filter) => isMounted.current && setFilter(() => filter);

    const classes = useStyles();

    return (
        <>
            <Grid container>
                <Grid item xs={false} sm={false} md={false} lg={1} xl={2} />
                <Grid item xs={12} sm={12} md={12} lg={10} xl={8}>
                    <Paper className={classes.filterBox}>
                        <CvarsFilter defaultSearchTerm={query.get('filter')} searchFilter={updateFilter} newCheckbox={hasNewCheckbox} />
                    </Paper>
                    <Paper>
                        {cvars.length === 0 && <LinearProgress />}
                        <CvarsTable data={cvars.filter(filter)} />
                    </Paper>
                </Grid>
            </Grid>
            <FloatingActionButton />
        </>
    );
};

export default CvarsView;
