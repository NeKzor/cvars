import React from 'react';
import GameGrid from '../components/GameGrid';
import { useTitle } from '../Hooks';
import AppState from '../AppState';
import ViewContent from './ViewContent';

const MainView = () => {
    useTitle('Cvars');

    const {
        state: { games },
    } = React.useContext(AppState);

    return (
        <ViewContent>
            <GameGrid games={games} />
        </ViewContent>
    );
};

export default MainView;
