// Copyright (c) 2019-2024, NeKz
// SPDX-License-Identifier: MIT

import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useScroll } from '../Hooks';
import { styled } from '@mui/material/styles';

const PREFIX = 'FloatingActionButton';
const classes = {
  fab: `${PREFIX}-fab`,
};
const StyledFab = styled(Fab)(() => ({
    [`&.${classes.fab}`]: {
        margin: 0,
        top: 'auto',
        right: 30,
        bottom: 30,
        left: 'auto',
        position: 'fixed',
    },
}));

const jumpToTop = () => {
    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
};

const FloatingActionButton = () => {
    const { y } = useScroll();

    return (
        <Zoom in={y !== 0} timeout={1000}>
            <StyledFab title="Jump to top" color="primary" className={classes.fab} onClick={jumpToTop}>
                <KeyboardArrowUpIcon />
            </StyledFab>
        </Zoom>
    );
};

export default FloatingActionButton;
