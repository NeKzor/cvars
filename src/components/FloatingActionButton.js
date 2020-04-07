import React from 'react';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { useScroll } from '../Hooks';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((_) => ({
    fab: {
        margin: 0,
        top: 'auto',
        right: 30,
        bottom: 30,
        left: 'auto',
        position: 'fixed',
    },
}));

const jumpToTop = () => {
    const smoothScroll = () => {
        const y = document.documentElement.scrollTop;
        if (y > 0) {
            window.requestAnimationFrame(smoothScroll);
            window.scrollTo(0, y - y / 5);
        }
    };
    smoothScroll();
};

const FloatingActionButton = () => {
    const { y } = useScroll();
    const classes = useStyles();

    return (
        <Zoom in={y !== 0} timeout={1000}>
            <Fab title="Jump to top" color="primary" className={classes.fab} onClick={jumpToTop}>
                <KeyboardArrowUpIcon />
            </Fab>
        </Zoom>
    );
};

export default FloatingActionButton;
