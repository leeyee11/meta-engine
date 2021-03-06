import {profWeaponMasteryDict, Profession} from '../dict/profession';
import {
  weaponQualityAttackDict,
  WeaponQuality,
  WeaponType,
  weaponQualityDropRateDict,
  weaponTypeDropRateDict,
} from '../dict/weapon';
import {random} from '../helper/generator';

const EmptyHands = 'empty hands';

export default {
  player: {
    batk: 5, // base attack
    bdef: 5, // base defence
    exp: 0, // experience
    hp: 50, // health points
    lv: 1, // level
    cash: 0, // cash
    wpn: EmptyHands, // weapon
    prof: 'none', // profession,
    maxhp: 50,
    get atk() {
      if (this.wpn === EmptyHands) {
        return this.batk;
      }
      const [weaponQuality, weaponType] = this.wpn.split(' ');
      // eslint-disable-next-line
      const weaponAttack = weaponQualityAttackDict[weaponQuality as WeaponQuality];
      // eslint-disable-next-line
      const profBasedWeaponAttack = weaponAttack *profWeaponMasteryDict[this.prof as Profession][weaponType as WeaponType];
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
    randomValue: (start: number, end: number) => {
      return (Math.random() * (end - start) + start) ^ 0;
    },
    weaponDropGenerator: () => {
      const quality = random(weaponQualityDropRateDict);
      const type = random(weaponTypeDropRateDict);
      return {
        type: 'wpn',
        name: `${quality} ${type}`,
      };
    },
  },
};
