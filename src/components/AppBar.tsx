// Copyright (c) 2019-2024, NeKz
// SPDX-License-Identifier: MIT

import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import AppState from '../AppState';

const PREFIX = 'AppBar';
const classes = {
  root: `${PREFIX}-root`,
  appBar: `${PREFIX}-appBar`,
  menuButton: `${PREFIX}-menuButton`,
  flex: `${PREFIX}-flex`,
  list: `${PREFIX}-list`,
};
const Root = styled('div')(({ theme }) => ({
    [`&.${classes.root}`]: {
        paddingBottom: theme.spacing(8),
    },
    [`& .${classes.menuButton}`]: {
        marginLeft: -12,
        marginRight: 20,
    },
    [`& .${classes.flex}`]: {
        flex: 1,
    },
    [`& .${classes.list}`]: {
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

    const showDrawer = (open: boolean) => () => {
        setOpen(open);
    };

    const list = (
        <Root className={classes.root}>
            <List>
                <ListItemButton key={0} component={RouterLink} to={'/'}>
                    <ListItemText primary={'Cvars'} />
                </ListItemButton>
            </List>
            <Divider />
            <List>
                {Object.keys(games).map((route, index) => {
                    return (
                        <ListItemButton key={index} component={RouterLink} to={route}>
                            <ListItemText primary={games[route].title} />
                        </ListItemButton>
                    );
                })}
            </List>
            <Divider />
            <List>
                <ListItemButton key={0} component={RouterLink} to={'/about'}>
                    <ListItemText primary={'About'} />
                </ListItemButton>
            </List>
        </Root>
    );

    return (
        <Root className={classes.root}>
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
        </Root>
    );
};

export default AppBarWithDrawer;
