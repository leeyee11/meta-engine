"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.save = exports.load = void 0;
const action_1 = require("./typings/action");
const io_1 = __importDefault(require("@meta-engine/io"));
const path_1 = __importDefault(require("path"));
const actionDir = `${process.env.GAME_ROOT}/${process.env.GAME_ID}/actions`;
const load = (rawType, name) => {
    const type = (rawType !== null && rawType !== void 0 ? rawType : 'unknown').replace(/\-action/g, '');
    return io_1.default.readSync(path_1.default.resolve(`${actionDir}/${type}/${name}.yml`));
};
exports.load = load;
const save = (type, action) => {
    const file = path_1.default.resolve(`${actionDir}/${type}/${action.id}.yml`);
    return io_1.default.writeSync(file, { ...action, type });
};
exports.save = save;
