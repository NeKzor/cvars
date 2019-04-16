import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import AppBar from './components/AppBar';
import AboutView from './views/AboutView';
import CvarsView from './views/CvarsView';
import MainView from './views/MainView';
import PageNotFoundView from './views/PageNotFoundView';
import { withRoot } from './withRoot';

const styles = theme => ({
    views: {
        marginTop: theme.spacing.unit * 5,
    },
});

class App extends React.PureComponent {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    };

    render() {
        const { classes } = this.props;

        return (
            <>
                <BrowserRouter>
                    <AppBar />
                    <div className={classes.views}>
                        <Switch>
                            <Route exact path="/" component={MainView} />
                            <Redirect from="/hl2" to="/half-life-2" />
                            <Redirect from="/p1" to="/portal" />
                            <Redirect from="/p2" to="/portal-2" />
                            <Redirect from="/tbg" to="/the-beginners-guide" />
                            <Redirect from="/tsp" to="/the-stanley-parable" />
                            <Route exact path="/half-life-2" component={CvarsView} />
                            <Route exact path="/portal" component={CvarsView} />
                            <Route exact path="/portal-2" component={CvarsView} />
                            <Route exact path="/the-beginners-guide" component={CvarsView} />
                            <Route exact path="/the-stanley-parable" component={CvarsView} />
                            <Route exact path="/infra" render={(props) => <CvarsView {...props} hasNewCheckbox={true} />} />
                            <Route exact path="/about" component={AboutView} />
                            <Route component={PageNotFoundView} />
                        </Switch>
                    </div>
                </BrowserRouter>
            </>
        );
    }
}

export default withRoot(withStyles(styles)(App));
