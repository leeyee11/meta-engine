"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.playSubtitle = exports.sleep = exports.keypress = void 0;
const chalk_1 = __importDefault(require("chalk"));
const keypress = async () => {
    process.stdin.setRawMode(true);
    process.stdin.resume();
    return new Promise((resolve) => process.stdin.once('data', () => {
        process.stdin.setRawMode(false);
        resolve();
    }));
};
exports.keypress = keypress;
const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};
exports.sleep = sleep;
const clearLastLine = () => {
    process.stdout.moveCursor(0, -1);
    process.stdout.clearScreenDown();
};
const isCommunication = (text) => /^\".*?\"$/.test(text);
const isNotification = (text) => /^\(.*?\)$/.test(text);
const playSubtitle = async (textList, option) => {
    const { blocker = exports.keypress, interval = 60, hint = 'Press any key to continue.', } = option || {};
    for (const text of textList) {
        const chalkWrite = isCommunication(text) ?
            chalk_1.default.blue :
            isNotification(text) ?
                chalk_1.default.yellow :
                chalk_1.default.white;
        const chalkHint = chalk_1.default.green;
        let acc = '';
        if (interval === 0) {
            acc = text;
        }
        else {
            const chars = text.split('');
            for (const char of chars) {
                acc += char;
                console.log(chalkWrite(acc));
                await (0, exports.sleep)(interval);
                clearLastLine();
            }
        }
        console.log(chalkWrite(acc));
        console.log(chalkHint(hint));
        if (blocker) {
            await blocker();
        }
        clearLastLine();
    }
};
exports.playSubtitle = playSubtitle;
