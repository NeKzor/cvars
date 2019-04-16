import React from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import ButtonBase from '@material-ui/core/ButtonBase';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        minWidth: 300,
        width: '100%',
    },
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
    focusVisible: {},
    imageButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        color: theme.palette.common.white,
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
            <div className={classes.root}>
                {Object.keys(games).map((route, idx) => {
                    return (
                        <ButtonBase
                            key={idx}
                            focusRipple
                            className={classes.image}
                            focusVisibleClassName={classes.focusVisible}
                            style={{
                                width: '33.3333%',
                            }}
                            component={Link}
                            to={route}
                        >
                            <span
                                className={classes.imageSrc}
                                style={{
                                    backgroundImage: `url(${games[route].image})`,
                                }}
                            />
                            <span className={classes.imageBackdrop}/>
                        </ButtonBase>
                )})}
            </div>
        );
    }
}

export default withStyles(styles)(GameGrid);
