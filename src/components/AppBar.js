import React from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { withContext } from '../withContext';

const styles = theme => ({
    root: {
        paddingBottom: theme.spacing.unit * 8,
    },
    list: {
        width: theme.spacing.unit * 25,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    drawer: {
        width: 240,
        flexShrink: 0,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    flex: {
        flex: 1,
    },
    login: {
        marginLeft: -12,
        marginRight: 20,
    },
});

class AppBarWithDrawer extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    };

    constructor() {
        super();

        this.homepage = '';
        this.pageLinks = [
            { text: 'Half-Life 2', link: 'hl2' },
            { text: 'Portal', link: 'p1' },
            { text: 'Portal 2', link: 'p2' },
            { text: 'The Beginners Guide', link: 'tbg' },
            { text: 'The Stanley Parable', link: 'tsp' },
            { text: 'INFRA', link: 'infra' },
        ];
    }

    state = {
        open: false,
    };

    showDrawer = (state) => () => {
        this.setState({ open: state });
    };

    gotoPage = (page) => () => {
        window.open(this.homepage + page, '_self');
    };

    render() {
        const { classes, location: { pathname }, games } = this.props;
        const { open } = this.state;

        const game = games[pathname];

        const list = (
            <div className={classes.list}>
                <List>
                    <ListItem button key={0} component={RouterLink} to={'/'}>
                        <ListItemText primary={'Cvars'} />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    {Object.keys(games).map((route, index) => {
                        return (
                            <ListItem button key={index} component={RouterLink} to={route}>
                                <ListItemText primary={games[route].title} />
                            </ListItem>
                        );
                    })}
                </List>
                <Divider />
                <List>
                    <ListItem button key={0} component={RouterLink} to={'/about'}>
                        <ListItemText primary={'About'} />
                    </ListItem>
                </List>
            </div>
        );

        return (
            <div className={classes.root}>
                <AppBar className={classes.appBar} position="fixed">
                    <Toolbar>
                        <IconButton className={classes.menuButton} onClick={this.showDrawer(true)} color="inherit" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" className={classes.flex}>
                            <Link href="/" color="inherit" underline="none">{game ? game.title + ' Cvars' : pathname === '/about' ? 'About' : 'Cvars'}</Link>
                        </Typography>
                    </Toolbar>
                </AppBar>
                <SwipeableDrawer
                    open={open}
                    onClose={this.showDrawer(false)}
                    onOpen={this.showDrawer(true)}
                    variant="temporary">
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.showDrawer(false)}
                        onKeyDown={this.showDrawer(false)}
                    >
                        {list}
                    </div>
                </SwipeableDrawer>
            </div>
        )
    };
}

export default withContext(withRouter(withStyles(styles)(AppBarWithDrawer)));
