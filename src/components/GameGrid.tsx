// Copyright (c) 2019-2024, NeKz
// SPDX-License-Identifier: MIT

import { Link } from 'react-router-dom';
import ButtonBase from '@mui/material/ButtonBase';
import Fade from '@mui/material/Fade';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('xs')]: {
        width: '100% !important',
        height: 100,
    },
    '&:hover, &.Mui-focusVisible': {
        zIndex: 1,
        '& .MuiImageBackdrop-root': {
            opacity: 0.1,
            backgroundColor: theme.palette.common.white,
        },
        '& .MuiImageMarked-root': {
            opacity: 0.3,
        },
    },
}));

const ImageSrc = styled('span')({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
});

const ImageBackdrop = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
}));

const GameGrid = ({ games }: any) => {
    return (
        <Grid container spacing={0}>
            {Object.keys(games).map((route, idx) => {
                return (
                    <Grid key={idx} item xs={12} sm={12} md={6} lg={4} xl={3}>
                        <Fade in={true} timeout={1000 * (1 - Math.exp(-(idx + 1)))}>
                            <Link to={route}>
                                <ImageButton
                                    focusRipple
                                    style={{ width: '100%' }}
                                >
                                    <ImageSrc style={{ backgroundImage: `url(${games[route].image})` }} />
                                    <ImageBackdrop className="MuiImageBackdrop-root" />
                                </ImageButton>
                            </Link>
                        </Fade>
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default GameGrid;
