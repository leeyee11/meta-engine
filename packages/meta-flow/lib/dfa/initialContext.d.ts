declare const _default: {
    player: {
        batk: number;
        bdef: number;
        exp: number;
        hp: number;
        lv: number;
        cash: number;
        wpn: string;
        prof: string;
        maxhp: number;
        readonly atk: number;
    };
    game: {};
    battle: {};
    enemies: {};
    storage: {
        player: never[];
        supplyBox: {
            type: string;
            name: string;
        }[];
    };
    utils: {
        randomValue: (start: number, end: number) => number;
        weaponDropGenerator: () => {
            type: string;
            name: string;
        };
    };
};
export default _default;
