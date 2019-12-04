import React from 'react';
import { AppContext } from './withContext';

const SourceGame = (title, appid) => {
    return {
        ['/' + title.toLowerCase().replace(/[ :]+/g, '-')]: {
            title,
            image: `https://steamcdn-a.akamaihd.net/steam/apps/${appid}/header.jpg`
        },
    };
};

class ContextProvider extends React.Component {
    state = {
        games: {
            ...SourceGame('Half-Life 2',            '220'),
            ...SourceGame('Half-Life: Source',      '280'),
            ...SourceGame('Black Mesa',             '362890'),
            ...SourceGame('Portal',                 '400'),
            ...SourceGame('Portal 2',               '620'),
            ...SourceGame('Portal 2 Sixense',       '247120'),
            ...SourceGame('The Beginners Guide',    '303210'),
            ...SourceGame('The Stanley Parable',    '221910'),
            ...SourceGame('INFRA',                  '251110'),
            ...SourceGame('Global Offensive',       '730'),
            ...SourceGame('Counter-Strike: Source', '240'),
            ...SourceGame('Team Fortress 2',        '440'),
            ...SourceGame('Alien Swarm',            '630'),
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
