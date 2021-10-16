"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profWeaponMasteryDict = exports.Profession = void 0;
var Profession;
(function (Profession) {
    Profession["warrior"] = "warrior";
    Profession["mage"] = "mage";
    Profession["priest"] = "priest";
    Profession["archer"] = "archer";
    Profession["thief"] = "thief";
})(Profession = exports.Profession || (exports.Profession = {}));
exports.profWeaponMasteryDict = {
    'warrior': {
        'sword': 1,
        'staff': 0.25,
        'book': 0,
        'bow': 0.75,
        'knife': 0.5,
    },
    'mage': {
        'sword': 0.25,
        'staff': 1,
        'book': 0.75,
        'bow': 0,
        'knife': 0.5,
    },
    'priest': {
        'sword': 0.5,
        'staff': 0.5,
        'book': 1,
        'bow': 0,
        'knife': 0.5,
    },
    'archer': {
        'sword': 0.75,
        'staff': 0.25,
        'book': 0,
        'bow': 1,
        'knife': 0.5,
    },
    'thief': {
        'sword': 0.75,
        'staff': 0.5,
        'book': 0,
        'bow': 0.25,
        'knife': 1,
    },
};
