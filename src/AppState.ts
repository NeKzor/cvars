// Copyright (c) 2019-2024, NeKz
// SPDX-License-Identifier: MIT

import React from 'react';

class DarkMode {
    enabled: boolean;

    constructor() {
        this.enabled = localStorage.getItem('dark_mode') === 'true';
    }
    toggle() {
        this.enabled = !this.enabled;
        localStorage.setItem('dark_mode', this.enabled.toString());
        return this;
    }
}

const SourceGame = (title: string, appid: string) => {
    return {
        ['/' + title.toLowerCase().replace(/[ :]+/g, '-')]: {
            title,
            image: `https://steamcdn-a.akamaihd.net/steam/apps/${appid}/header.jpg`,
        },
    };
};

export const initialState = {
    games: {
        ...SourceGame('Half-Life 2', '220'),
        ...SourceGame('Half-Life: Source', '280'),
        ...SourceGame('Black Mesa', '362890'),
        ...SourceGame('Portal', '400'),
        ...SourceGame('Portal 2', '620'),
        ...SourceGame('Portal 2 Sixense', '247120'),
        ...SourceGame('The Beginners Guide', '303210'),
        ...SourceGame('The Stanley Parable', '221910'),
        ...SourceGame('INFRA', '251110'),
        ...SourceGame('Global Offensive', '730'),
        ...SourceGame('Counter-Strike: Source', '240'),
        ...SourceGame('Team Fortress 2', '440'),
        ...SourceGame('Alien Swarm', '630'),
        ...SourceGame('Dota 2', '570'),
        ...SourceGame('The Lab', '450390'),
        ...SourceGame('Left 4 Dead 2', '550'),
        ...SourceGame('Portal 2 Community Edition', '440000'),
        ...SourceGame('Portal: Revolution', '601360'),
    },
    darkMode: new DarkMode(),
};

export const AppReducer =  (state: typeof initialState, { action }: { action: string; }) => {
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
};

export default React.createContext({ state: initialState, dispatch: (() => void 0) as React.Dispatch<{ action: string }> });
