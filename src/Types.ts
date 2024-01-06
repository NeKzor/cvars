// Copyright (c) 2019-2024, NeKz
// SPDX-License-Identifier: MIT

export class Enum {
    count: number;
    constructor(...items: any) {
        let value = 0;
        for (let item of items) {
            (this as any)[value] = item;
            (this as any)[item.replace(/ /g, '')] = value;
            ++value;
        }
        this.count = value;
    }
    static create(...items: any) {
        return Object.freeze(new Enum(...items));
    }
    getItemList() {
        let items = [];
        for (let idx = 0; idx < this.count; ++idx) {
            items.push({ value: idx, label: (this as any)[idx] });
        }
        return items;
    }
}

export class Flags extends Enum {
    constructor(...items: any) {
        super();
        let value = 0;
        for (let item of items) {
            (this as any)[value] = item;
            (this as any)[item.replace(/ /g, '')] = value !== 0 ? 1 << (value - 1) : 0;
            ++value;
        }
        this.count = value;
    }
    static create(...items: any) {
        return Object.freeze(new Flags(...items));
    }
    all() {
        return (1 << (this.count - 1)) - 1;
    }
    list(value: any) {
        const list = Object.keys(this)
            .filter((k) => k !== 'count' && Number.isNaN(parseInt(k)))
            .filter((key) => (value & (this as any)[key]) !== 0);
        return list.length !== 0 ? list : [(this as any)[0]];
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

export const OS = Enum.create('Windows', 'Linux', 'Both');
