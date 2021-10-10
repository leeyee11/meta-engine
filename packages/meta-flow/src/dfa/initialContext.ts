import {profWeaponMasteryDict, Profession} from '../dict/profession';
import {weaponQualityAttackDict, WeaponQuality, WeaponType} from '../dict/weapon';

const EmptyHands = 'empty hands';

export default {
  player: {
    batk: 5,            // base attack
    bdef: 5,            // base defence
    exp: 0,             // experience
    hp: 50,             // health points
    lv: 1,              // level
    cash: 0,            // cash
    wpn: EmptyHands,    // weapon
    prof: 'none',       // profession
    get atk() {
      if(this.wpn === EmptyHands) {
        return this.batk;
      }
      const [weaponQuality, weaponType] = this.wpn.split(' ');
      const weaponAttack = weaponQualityAttackDict[weaponQuality as WeaponQuality];
      const profBasedWeaponAttack = weaponAttack * 
        profWeaponMasteryDict[this.prof as Profession][weaponType as WeaponType];
      return this.batk + profBasedWeaponAttack
    },
  },
  game: {},
  battle: {},
  enemies: {},
  storage: {
    player: [],
    supplyBox: [{
        type: 'wpn',
        name: 'humble sword'
      }, {
        type: 'wpn',
        name: 'humble staff'
      }, {
        type: 'wpn',
        name: 'humble book'
      }, {
        type: 'wpn',
        name: 'humble bow'
      }, {
        type: 'wpn',
        name: 'humble knife'
      },
    ]
  }
}