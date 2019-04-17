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

const CvarsViewWithCheckbox = (props) => <CvarsView {...props} hasNewCheckbox={true} />;

const styles = theme => ({
    views: {
        marginTop: theme.spacing.unit * 5,
    },
});

class App extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    };

    render() {
        const { classes } = this.props;

        return (
            <>
                <BrowserRouter basename="/cvars">
                    <AppBar />
                    <div className={classes.views}>
                        <Switch>
                            <Route exact path="/" component={MainView} />
                            <Redirect from="/hl2" to="/half-life-2" />
                            <Redirect from="/p1"  to="/portal" />
                            <Redirect from="/p2"  to="/portal-2" />
                            <Redirect from="/tbg" to="/the-beginners-guide" />
                            <Redirect from="/tsp" to="/the-stanley-parable" />
                            <Route exact path="/half-life-2"         key="hl2"   component={CvarsView} />
                            <Route exact path="/portal"              key="p1"    component={CvarsView} />
                            <Route exact path="/portal-2"            key="p2"    component={CvarsView} />
                            <Route exact path="/the-beginners-guide" key="tbg"   component={CvarsViewWithCheckbox} />
                            <Route exact path="/the-stanley-parable" key="tsp"   component={CvarsViewWithCheckbox} />
                            <Route exact path="/infra"               key="infra" component={CvarsViewWithCheckbox} />
                            <Route exact path="/about"               key="about" component={AboutView} />
                            <Route component={PageNotFoundView} />
                        </Switch>
                    </div>
                </BrowserRouter>
            </>
        );
    }
}

export default withRoot(withStyles(styles)(App));
