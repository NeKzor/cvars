const baseApi = (process.env.NODE_ENV === 'development')
    ? 'http://127.0.0.1:8080'
    : 'https://raw.githubusercontent.com/NeKzor/cvars/api';

export default class Api {
    static async get(route) {
        const file = baseApi + route +  '.json';
        console.log(`Fetching ${file}`);
        let res = await fetch(file);
        return res.ok ? (await res.json()).Cvars : [];
    }
}
