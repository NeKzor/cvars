// Copyright (c) 2019-2024, NeKz
// SPDX-License-Identifier: MIT

import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { styled, createTheme } from '@mui/material/styles';
import teal from '@mui/material/colors/teal';
import red from '@mui/material/colors/red';
import AppBar from './components/AppBar';
import AboutView from './views/AboutView';
import CvarsView from './views/CvarsView';
import MainView from './views/MainView';
import PageNotFoundView from './views/PageNotFoundView';
import AppState, { AppReducer, initialState } from './AppState';

const CvarsViewWithCheckbox = (props: any) => <CvarsView {...props} hasNewCheckbox={true} />;

const PREFIX = 'App';
const classes = {
  views: `${PREFIX}-views`,
};
const Root = styled('div')(({ theme }) => ({
    [`&.${classes.views}`]: {
        marginTop: theme.spacing(5),
    },
}));

const Redirect = ({ to }: { to: string }) => {
    let navigate = useNavigate();
    React.useEffect(() => navigate(to));
    return null;
};

const App = () => {
    const [state, dispatch] = React.useReducer(AppReducer, initialState);

    const theme = React.useMemo(() => {
        return createTheme({
            palette: {
                primary: {
                    light: teal[300],
                    main: teal[500],
                    dark: teal[700],
                },
                secondary: {
                    light: '#fff',
                    main: '#fff',
                    dark: '#fff',
                },
                error: {
                    main: red.A400,
                },
                background: {
                    default: state.darkMode.enabled ? '#303030' : '#fafafa',
                    paper: state.darkMode.enabled ? '#303030' : '#fff',
                },
                mode: state.darkMode.enabled ? 'dark' : 'light',
            },
        });
    }, [state.darkMode.enabled]);

    const context = React.useMemo(() => ({ state, dispatch }), [state, dispatch]);

    return (
        <React.StrictMode>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AppState.Provider value={context}>
                    <BrowserRouter>
                        <AppBar />
                        <Root className={classes.views}>
                            <Routes>
                                <Route path="/hl2" element={<Redirect to="/half-life-2" />} />
                                <Route path="/p1" element={<Redirect to="/portal" />} />
                                <Route path="/p2" element={<Redirect to="/portal-2" />} />
                                <Route path="/tbg" element={<Redirect to="/the-beginners-guide" />} />
                                <Route path="/tsp" element={<Redirect to="/the-stanley-parable" />} />
                                <Route path="/bm" element={<Redirect to="/black-mesa" />} />
                                <Route path="/csgo" element={<Redirect to="/global-offensive" />} />
                                <Route path="/p2s" element={<Redirect to="/portal-2-sixense" />} />
                                <Route path="/asw" element={<Redirect to="/alien-swarm" />} />
                                <Route path="/css" element={<Redirect to="/counter-strike-source" />} />
                                <Route path="/hls" element={<Redirect to="/half-life-source" />} />
                                <Route path="/tf2" element={<Redirect to="/team-fortress-2" />} />
                                <Route path="/d2" element={<Redirect to="/dota-2" />} />
                                <Route path="/lab" element={<Redirect to="/the-lab" />} />
                                <Route path="/l4d2" element={<Redirect to="/left-4-dead-2" />} />
                                <Route path="/p2ce" element={<Redirect to="/portal-2-community-edition" />} />
                                <Route path="/" Component={MainView} />
                                <Route path="/half-life-2" key="hl2" Component={CvarsView} />
                                <Route path="/portal" key="p1" Component={CvarsView} />
                                <Route path="/portal-2" key="p2" Component={CvarsView} />
                                <Route path="/the-beginners-guide" key="tbg" Component={CvarsViewWithCheckbox} />
                                <Route path="/the-stanley-parable" key="tsp" Component={CvarsViewWithCheckbox} />
                                <Route path="/infra" key="infra" Component={CvarsViewWithCheckbox} />
                                <Route path="/black-mesa" key="bm" Component={CvarsViewWithCheckbox} />
                                <Route path="/global-offensive" key="csgo" Component={CvarsView} />
                                <Route path="/portal-2-sixense" key="p2s" Component={CvarsViewWithCheckbox} />
                                <Route path="/alien-swarm" key="asw" Component={CvarsView} />
                                <Route path="/counter-strike-source" key="css" Component={CvarsView} />
                                <Route path="/half-life-source" key="hls" Component={CvarsView} />
                                <Route path="/team-fortress-2" key="tf2" Component={CvarsView} />
                                <Route path="/dota-2" key="d2" Component={CvarsView} />
                                <Route path="/the-lab" key="lab" Component={CvarsView} />
                                <Route path="/left-4-dead-2" key="l4d2" Component={CvarsView} />
                                <Route
                                    path="/portal-2-community-edition"
                                    key="p2ce"
                                    Component={CvarsViewWithCheckbox}
                                />
                                <Route path="/about" key="about" Component={AboutView} />
                                <Route Component={PageNotFoundView} />
                            </Routes>
                        </Root>
                    </BrowserRouter>
                </AppState.Provider>
            </ThemeProvider>
        </React.StrictMode>
    );
};

export default App;
