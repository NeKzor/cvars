export default class Client {
    static async get(route) {
        console.log(`Fetching /api${route}.json`);
        let res = await fetch(`https://raw.githubusercontent.com/NeKzor/cvars/api${route}.json`);
        let json = await res.json();
        return json.Cvars;
    }
}
