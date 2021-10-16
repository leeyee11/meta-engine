"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const profession_1 = require("../dict/profession");
const weapon_1 = require("../dict/weapon");
const generator_1 = require("../helper/generator");
const EmptyHands = 'empty hands';
exports.default = {
    player: {
        batk: 5,
        bdef: 5,
        exp: 0,
        hp: 50,
        lv: 1,
        cash: 0,
        wpn: EmptyHands,
        prof: 'none',
        maxhp: 50,
        get atk() {
            if (this.wpn === EmptyHands) {
                return this.batk;
            }
            const [weaponQuality, weaponType] = this.wpn.split(' ');
            // eslint-disable-next-line
            const weaponAttack = weapon_1.weaponQualityAttackDict[weaponQuality];
            // eslint-disable-next-line
            const profBasedWeaponAttack = weaponAttack * profession_1.profWeaponMasteryDict[this.prof][weaponType];
            return this.batk + profBasedWeaponAttack;
        },
    },
    game: {},
    battle: {},
    enemies: {},
    storage: {
        player: [],
        supplyBox: [{
                type: 'wpn',
                name: 'humble sword',
            }, {
                type: 'wpn',
                name: 'humble staff',
            }, {
                type: 'wpn',
                name: 'humble book',
            }, {
                type: 'wpn',
                name: 'humble bow',
            }, {
                type: 'wpn',
                name: 'humble knife',
            },
        ],
    },
    utils: {
        randomValue: (start, end) => {
            return (Math.random() * (end - start) + start) ^ 0;
        },
        weaponDropGenerator: () => {
            const quality = (0, generator_1.random)(weapon_1.weaponQualityDropRateDict);
            const type = (0, generator_1.random)(weapon_1.weaponTypeDropRateDict);
            return {
                type: 'wpn',
                name: `${quality} ${type}`,
            };
        },
    },
};
