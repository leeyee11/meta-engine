"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.weaponQualityAttackDict = exports.weaponTypeDropRateDict = exports.weaponQualityDropRateDict = exports.WeaponQuality = exports.WeaponType = void 0;
var WeaponType;
(function (WeaponType) {
    WeaponType["sword"] = "sword";
    WeaponType["staff"] = "staff";
    WeaponType["book"] = "book";
    WeaponType["bow"] = "bow";
    WeaponType["knife"] = "knife";
})(WeaponType = exports.WeaponType || (exports.WeaponType = {}));
var WeaponQuality;
(function (WeaponQuality) {
    WeaponQuality["humble"] = "humble";
    WeaponQuality["apprentice"] = "apprentice";
    WeaponQuality["standard"] = "standard";
    WeaponQuality["sophisticated"] = "sophisticated";
    WeaponQuality["rare"] = "rare";
    WeaponQuality["legendary"] = "legendary";
})(WeaponQuality = exports.WeaponQuality || (exports.WeaponQuality = {}));
exports.weaponQualityDropRateDict = {
    "humble": 0.45,
    "apprentice": 0.3,
    "standard": 0.15,
    "sophisticated": 0.06,
    "rare": 0.03,
    "legendary": 0.01
};
exports.weaponTypeDropRateDict = {
    "sword": 0.2,
    "staff": 0.15,
    "book": 0.25,
    "bow": 0.2,
    "knife": 0.2,
};
exports.weaponQualityAttackDict = {
    "humble": 6,
    "apprentice": 8,
    "standard": 12,
    "sophisticated": 18,
    "rare": 30,
    "legendary": 48
};
