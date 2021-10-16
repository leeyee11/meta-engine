"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.random = void 0;
const random = (dict) => {
    const rateMap = new Map();
    let start = 0;
    for (const key of Object.keys(dict)) {
        const end = start + dict[key];
        rateMap.set([start, end], key);
        start = end;
    }
    const randomVal = Math.random();
    const target = [...rateMap.entries()].find(([[start, end]]) => {
        return randomVal >= start && randomVal < end;
    });
    if (!(target === null || target === void 0 ? void 0 : target.length)) {
        throw new Error('Randomly generat failed. Please check the dictonary.');
    }
    return target[1];
};
exports.random = random;
