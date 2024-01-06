// Copyright (c) 2019-2024, NeKz
// SPDX-License-Identifier: MIT

import React from 'react';
import { useLocation } from 'react-router';
import LinearProgress from '@mui/material/LinearProgress';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import CvarsTable from '../components/CvarsTable';
import CvarsFilter from '../components/CvarsFilter';
import FloatingActionButton from '../components/FloatingActionButton';
import Api from '../Api';
import { FCVAR, OS } from '../Types';
import { useIsMounted, useTitle } from '../Hooks';
import AppState from '../AppState';
import ViewContent from './ViewContent';

const PREFIX = 'CvarsView';
const classes = {
    filterBox: `${PREFIX}-filterBox`,
};
const Root = styled('div')(({ theme }) => ({
    [`& .${classes.filterBox}`]: {
        paddingLeft: 20,
        paddingTop: 8,
        paddingBottom: 12,
        marginBottom: theme.spacing(3),
    },
}));

const searchQuery = (query: string | null, match: any) => {
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

const CvarsView = ({ hasNewCheckbox }: any) => {
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
    const [filter, setFilter] = React.useState(() => (cvar: any) => {
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
                        return this._os ? this._os : (this._os = (OS as any)[this.system]);
                    };
                }

                if (isMounted.current) {
                    setCvars(cvars);
                }
            })
            .catch((err) => console.error(err));
    }, [pathname, isMounted]);

    const updateFilter = React.useCallback(
        (filter: any) => isMounted.current && setFilter(() => filter),
        [isMounted, setFilter],
    );

    return (
        <Root>
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
        </Root>
    );
};

export default CvarsView;
