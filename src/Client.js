const API = (process.env.NODE_ENV === 'development')
    ? 'http://127.0.0.1:8080'
    : 'https://raw.githubusercontent.com/NeKzor/cvars/api';

export default class Client {
    static async get(route) {
        console.log(`Fetching /api${route}.json`);
        let res = await fetch(API + route + '.json');
        return (await res.json()).Cvars;
    }
}
