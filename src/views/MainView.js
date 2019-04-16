import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import GameGrid from '../components/GameGrid';
import { withContext } from '../withContext';

class MainView extends React.Component {
    static propTypes = {
        games: PropTypes.object.isRequired,
    };

    componentDidMount() {
        document.title = 'Cvars | ' + document.location.host;
    }

    render() {
        const { games } = this.props;

        return (
            <>
                <Grid container>
                    <Grid item xs={false} md={1} lg={2} />
                    <Grid item xs={12} md={10} lg={8}>
                        <GameGrid games={games} />
                    </Grid>
                </Grid>
            </>
        );
    }
}

export default withContext(MainView);
