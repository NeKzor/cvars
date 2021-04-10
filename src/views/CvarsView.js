import React from 'react';
import { useLocation } from 'react-router';
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
import ViewContent from './ViewContent';

const useStyles = makeStyles((theme) => ({
    filterBox: {
        paddingLeft: 20,
        padding: 10,
        marginBottom: theme.spacing(3),
    },
}));

const searchQuery = (query, match) => {
    if (!query) return false;

    const isArray = Array.isArray(match);

    const values = query.split(',');
    for (const value of values) {
        if (isArray) {
            for (const matchValue of match) {
                if (value === matchValue) {
                    return true;
                }
            }
        } else if (value === match) {
            return true;
        }
    }
    return false;
};

const CvarsView = ({ hasNewCheckbox }) => {
    const isMounted = useIsMounted();

    const { pathname, search } = useLocation();
    const query = new URLSearchParams(search);
    const defaultName = query.get('name');
    const defaultDefault = query.get('default');
    const defaultFlags = query.get('flags');
    const defaultSystem = query.get('system');
    const defaultHelpText = query.get('help');

    const {
        state: { games },
    } = React.useContext(AppState);
    const game = games[pathname];

    useTitle((game ? game.title + ' | ' : '') + 'Cvars');

    const [cvars, setCvars] = React.useState([]);
    const [filter, setFilter] = React.useState(() => (cvar) => {
        if (!defaultName && !defaultDefault && !defaultFlags && !defaultSystem && !defaultHelpText) {
            return true;
        }

        return searchQuery(defaultName, cvar.name)
            || searchQuery(defaultDefault, cvar.default)
            || searchQuery(defaultFlags, cvar.getFlags())
            || searchQuery(defaultSystem, cvar.getOs())
            || searchQuery(defaultHelpText, cvar.help);
    });

    React.useEffect(() => {
        Api.get(pathname)
            .then((cvars) => {
                for (let cvar of cvars) {
                    cvar.getFlags = function () {
                        return this._flags ? this._flags : (this._flags = FCVAR.list(this.flags));
                    };
                    cvar.getOs = function () {
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
            <ViewContent>
                <Paper className={classes.filterBox}>
                    <CvarsFilter
                        defaultSearchTerm={query.get('filter')}
                        searchFilter={updateFilter}
                        newCheckbox={hasNewCheckbox}
                    />
                </Paper>
                <Paper>
                    {cvars.length === 0 && <LinearProgress />}
                    <CvarsTable data={cvars.filter(filter)} />
                </Paper>
            </ViewContent>
            <FloatingActionButton />
        </>
    );
};

export default CvarsView;
