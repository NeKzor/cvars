// Copyright (c) 2019-2024, NeKz
// SPDX-License-Identifier: MIT

const baseApi =
    process.env.NODE_ENV === 'development'
        ? 'http://127.0.0.1:8080'
        : 'https://raw.githubusercontent.com/NeKzor/cvars/api';

export default class Api {
    static async get(route: string) {
        const file = baseApi + route + '.json';
        console.log(`Fetching ${file}`);
        let res = await fetch(file);
        return res.ok ? (await res.json()).Cvars : [];
    }
}
