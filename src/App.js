import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import red from '@material-ui/core/colors/red';
import AppBar from './components/AppBar';
import AboutView from './views/AboutView';
import CvarsView from './views/CvarsView';
import MainView from './views/MainView';
import PageNotFoundView from './views/PageNotFoundView';
import AppState, { AppReducer } from './AppState';

const CvarsViewWithCheckbox = (props) => <CvarsView {...props} hasNewCheckbox={true} />;

const useStyles = makeStyles((theme) => ({
    views: {
        marginTop: theme.spacing(5),
    },
}));

const App = () => {
    const [state, dispatch] = React.useReducer(...AppReducer);

    const theme = React.useMemo(() => {
        return createMuiTheme({
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
                type: state.darkMode.enabled ? 'dark' : 'light',
            },
            typography: {
                useNextVariants: true,
            },
        });
    }, [state.darkMode.enabled]);

    const classes = useStyles();
    const context = React.useMemo(() => ({ state, dispatch }), [state, dispatch]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppState.Provider value={context}>
                <BrowserRouter basename={process.env.NODE_ENV === 'production' ? '/cvars' : '/'}>
                    <AppBar />
                    <div className={classes.views}>
                        <Switch>
                            <Redirect from="/hl2" to="/half-life-2" />
                            <Redirect from="/p1" to="/portal" />
                            <Redirect from="/p2" to="/portal-2" />
                            <Redirect from="/tbg" to="/the-beginners-guide" />
                            <Redirect from="/tsp" to="/the-stanley-parable" />
                            <Redirect from="/bm" to="/black-mesa" />
                            <Redirect from="/csgo" to="/global-offensive" />
                            <Redirect from="/p2s" to="/portal-2-sixense" />
                            <Redirect from="/asw" to="/alien-swarm" />
                            <Redirect from="/css" to="/counter-strike-source" />
                            <Redirect from="/hls" to="/half-life-source" />
                            <Redirect from="/tf2" to="/team-fortress-2" />
                            <Redirect from="/d2" to="/dota-2" />
                            <Redirect from="/lab" to="/the-lab" />
                            <Route exact path="/" component={MainView} />
                            <Route exact path="/half-life-2" key="hl2" component={CvarsView} />
                            <Route exact path="/portal" key="p1" component={CvarsView} />
                            <Route exact path="/portal-2" key="p2" component={CvarsView} />
                            <Route exact path="/the-beginners-guide" key="tbg" component={CvarsViewWithCheckbox} />
                            <Route exact path="/the-stanley-parable" key="tsp" component={CvarsViewWithCheckbox} />
                            <Route exact path="/infra" key="infra" component={CvarsViewWithCheckbox} />
                            <Route exact path="/black-mesa" key="bm" component={CvarsViewWithCheckbox} />
                            <Route exact path="/global-offensive" key="csgo" component={CvarsView} />
                            <Route exact path="/portal-2-sixense" key="p2s" component={CvarsViewWithCheckbox} />
                            <Route exact path="/alien-swarm" key="asw" component={CvarsView} />
                            <Route exact path="/counter-strike-source" key="css" component={CvarsView} />
                            <Route exact path="/half-life-source" key="hls" component={CvarsView} />
                            <Route exact path="/team-fortress-2" key="tf2" component={CvarsView} />
                            <Route exact path="/dota-2" key="d2" component={CvarsView} />
                            <Route exact path="/the-lab" key="lab" component={CvarsView} />
                            <Route exact path="/about" key="about" component={AboutView} />
                            <Route component={PageNotFoundView} />
                        </Switch>
                    </div>
                </BrowserRouter>
            </AppState.Provider>
        </ThemeProvider>
    );
};

export default App;
