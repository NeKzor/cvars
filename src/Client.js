class Client {
    static async get(route) {
        console.log(`Fetching /api${route}.json`);
        let res = await fetch(`https://raw.githubusercontent.com/NeKzor/cvars/api${route}.json`);
        let txt = await res.text();
        let json = await txt.json();
        return json.Cvars;
    }
}

export default Client;
