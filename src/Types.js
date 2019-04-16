export class Enum {
    constructor(...items) {
        let value = 0;
        for (let item of items) {
            this[value] = item;
            this[item.replace(/ /g, '')] = value;
            ++value;
        }
        this.count = value;
    }
    static create(...items) {
        return Object.freeze(new Enum(...items));
    }
    getItemList() {
        let items = [];
        for (let idx = 0; idx < this.count; ++idx) {
            items.push({ value: idx, label: this[idx] });
        }
        return items;
    }
}

export class Flags extends Enum {
    constructor(...items) {
        super();
        let value = 0;
        for (let item of items) {
            this[value] = item;
            this[item.replace(/ /g, '')] = (value !== 0) ? 1 << value - 1 : 0;
            ++value;
        }
        this.count = value;
    }
    static create(...items) {
        return Object.freeze(new Flags(...items));
    }
    all() {
        return (1 << this.count - 1) - 1;
    }
    list(value) {
        const keys = Object.keys(this).filter(k => k !== 'count' && Number.isNaN(parseInt(k)));
        const result = keys.filter(key => (value & this[key]) !== 0);
        return result.length !== 0 ? result : [this[0]];
    }
}

export const FCVAR = Flags.create(
    'NONE',
    'UNREGISTERED',
    'DEVELOPMENTONLY',
    'GAMEDLL',
    'CLIENTDLL',
    'HIDDEN',
    'PROTECTED',
    'SPONLY',
    'ARCHIVE',
    'NOTIFY',
    'USERINFO',
    'PRINTABLEONLY',
    'UNLOGGED',
    'NEVER_AS_STRING',
    'REPLICATED',
    'CHEAT',
    'SS',
    'DEMO',
    'DONTRECORD',
    'SS_ADDED',
    'RELEASE',
    'RELOAD_MATERIALS',
    'RELOAD_TEXTURES',
    'NOT_CONNECTED',
    'MATERIAL_SYSTEM_THREAD',
    'ARCHIVE_XBOX',
    'ACCESSIBLE_FROM_THREADS',
    'NETWORKSYSTEM',
    'VPHYSICS',
    'SERVER_CAN_EXECUTE',
    'SERVER_CANNOT_QUERY',
    'CLIENTCMD_CAN_EXECUTE',
);

export const OS = Enum.create(
    'Windows',
    'Linux',
    'Both',
);
