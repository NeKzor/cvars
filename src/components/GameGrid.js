import React from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import ButtonBase from '@material-ui/core/ButtonBase';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    image: {
        position: 'relative',
        height: 200,
        [theme.breakpoints.down('xs')]: {
            width: '100% !important',
            height: 100,
        },
        '&:hover, &$focusVisible': {
            zIndex: 1,

            '& $imageBackdrop': {
                opacity: 0.1,
                backgroundColor: theme.palette.common.white,
            },
            '& $imageMarked': {
                opacity: 0.3,

            },
        },
    },
    focusVisible: {
    },
    imageSrc: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
    },
    imageBackdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
    imageMarked: {
        height: '25%',
        width: '100%',
        position: 'absolute',
        top: '75%',
        backgroundColor: theme.palette.common.white,
        opacity: 0,
    },
});

class GameGrid extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        games: PropTypes.object.isRequired,
    };

    render() {
        const { classes, games } = this.props;

        return (
            <div>
                <Grid container spacing={0}>
                    {Object.keys(games).map((route, idx) => {
                        return (
                            <Grid key={idx} item xs={12} sm={12} md={6} lg={4} xl={3} >
                                <Fade in={true} timeout={1000 * (1 - Math.exp(-(idx + 1)))}>
                                    <ButtonBase
                                        focusRipple
                                        className={classes.image}
                                        focusVisibleClassName={classes.focusVisible}
                                        style={{ width: '100%' }}
                                        component={Link}
                                        to={route}
                                    >
                                        <span className={classes.imageSrc} style={{ backgroundImage: `url(${games[route].image})` }} />
                                        <span className={classes.imageBackdrop} />
                                    </ButtonBase>
                                </Fade>
                            </Grid>
                        )
                    })}

                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(GameGrid);
