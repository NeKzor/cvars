import React from 'react';
import { AppContext } from './withContext';

const SourceGame = (title, image) => ({ ['/' + title.toLowerCase().replace(/ /g, '-')]: { title, image } });

class ContextProvider extends React.Component {
    state = {
        games: {
            ...SourceGame('Half-Life 2', 'https://steamcdn-a.akamaihd.net/steam/apps/220/header.jpg?t=1551310885'),
            ...SourceGame('Portal', 'https://steamcdn-a.akamaihd.net/steam/apps/400/header.jpg?t=1550175754'),
            ...SourceGame('Portal 2', 'https://steamcdn-a.akamaihd.net/steam/apps/620/header.jpg?t=1554956936'),
            ...SourceGame('The Beginners Guide', 'https://steamcdn-a.akamaihd.net/steam/apps/303210/header.jpg?t=1549815651'),
            ...SourceGame('The Stanley Parable', 'https://steamcdn-a.akamaihd.net/steam/apps/221910/header.jpg?t=1553766468'),
            ...SourceGame('INFRA', 'https://steamcdn-a.akamaihd.net/steam/apps/251110/header.jpg?t=1548548098'),
        },
    };

    render() {
        return (
            <AppContext.Provider value={this.state}>
                {this.props.children}
            </AppContext.Provider>
        );
    }
}

export default ContextProvider;
