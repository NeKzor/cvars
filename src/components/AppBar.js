import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
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
import { makeStyles } from '@material-ui/core/styles';
import AppState from '../AppState';

const useStyles = makeStyles((theme) => ({
    root: {
        paddingBottom: theme.spacing(8),
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    flex: {
        flex: 1,
    },
    list: {
        width: theme.spacing(25),
    },
}));

const AppBarWithDrawer = () => {
    const { pathname } = useLocation();

    const {
        state: { games },
    } = React.useContext(AppState);
    const game = games[pathname];

    const [open, setOpen] = React.useState(false);

    const showDrawer = (open) => () => {
        setOpen(open);
    };

    const classes = useStyles();

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
                    <IconButton className={classes.menuButton} onClick={showDrawer(true)} color="inherit">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" className={classes.flex}>
                        <Link component={RouterLink} to={'/'} color="inherit" underline="none">
                            {game ? game.title + ' Cvars' : pathname === '/about' ? 'About' : 'Cvars'}
                        </Link>
                    </Typography>
                </Toolbar>
            </AppBar>
            <SwipeableDrawer open={open} onClose={showDrawer(false)} onOpen={showDrawer(true)} variant="temporary">
                <div tabIndex={0} role="button" onClick={showDrawer(false)} onKeyDown={showDrawer(false)}>
                    {list}
                </div>
            </SwipeableDrawer>
        </div>
    );
};

export default AppBarWithDrawer;
