// Copyright (c) 2019-2024, NeKz
// SPDX-License-Identifier: MIT

export const stableSort = (array: any, order: string, orderBy: any) => {
    let desc = (a: any, b: any) => {
        if (b[orderBy] < a[orderBy]) return -1;
        if (b[orderBy] > a[orderBy]) return 1;
        return 0;
    };

    let cmp = order === 'desc' ? (a: any, b: any) => desc(a, b) : (a: any, b: any) => -desc(a, b);

    let sort = (a: any, b: any) => {
        let order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    };

    return array
        .map((el: any, index: number) => [el, index])
        .sort(sort)
        .map((el: any) => el[0]);
};
