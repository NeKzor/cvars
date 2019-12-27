import React from 'react';

class DarkMode {
    constructor() {
        this.enabled = localStorage.getItem('dark_mode') === 'true';
    }
    toggle() {
        this.enabled = !this.enabled;
        localStorage.setItem('dark_mode', this.enabled.toString());
        return this;
    }
}

const SourceGame = (title, appid) => {
    return {
        ['/' + title.toLowerCase().replace(/[ :]+/g, '-')]: {
            title,
            image: `https://steamcdn-a.akamaihd.net/steam/apps/${appid}/header.jpg`
        },
    };
};

const inititalState = {
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
    darkMode: new DarkMode(),
};

export const AppReducer = [
    (state, { action }) => {
        console.log('[DISPATCH] ' + action);
        switch (action) {
            case 'toggleDarkMode':
                return {
                    ...state,
                    darkMode: state.darkMode.toggle(),
                };
            default:
                throw new Error('Unknown action type.');
        }
    },
    inititalState,
];

export default React.createContext(inititalState);
