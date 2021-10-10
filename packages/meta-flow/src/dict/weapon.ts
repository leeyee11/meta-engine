export enum WeaponType {
  sword = "sword",
  staff = "staff",
  book = "book",
  bow = "bow",
  knife = "knife"
}

export enum WeaponQuality {
  humble = "humble",
  apprentice = "apprentice",
  standard = "standard",
  sophisticated = "sophisticated",
  rare = "rare",
  legendary = "legendary",
}

export const weaponDropRateDict = {
  "humble": 0.45, 
  "apprentice": 0.3, 
  "standard": 0.15, 
  "sophisticated": 0.06, 
  "rare": 0.03, 
  "legendary": 0.01
}
export const weaponQualityAttackDict = {
  "humble": 6, 
  "apprentice": 8, 
  "standard": 12, 
  "sophisticated": 18, 
  "rare": 30, 
  "legendary": 48
}