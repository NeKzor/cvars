import React from 'react';
import Grid from '@material-ui/core/Grid';
import GameGrid from '../components/GameGrid';
import { useTitle } from '../Hooks';
import AppState from '../AppState';

const MainView = () => {
    useTitle('Cvars');

    const { state: { games } } = React.useContext(AppState);

    return (
        <Grid container>
            <Grid item xs={false} sm={false} md={1} lg={2} xl={2} />
            <Grid item xs={12} sm={12} md={10} lg={8} xl={8}>
                <GameGrid games={games} />
            </Grid>
        </Grid>
    );
};

export default MainView;
