"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = exports.readSync = exports.read = void 0;
const fs = __importStar(require("fs-extra"));
const js_yaml_1 = require("js-yaml");
const read = (path) => {
    return fs.readFile(path)
        .then((buffer) => buffer.toString())
        .then((text) => (0, exports.parse)(text));
};
exports.read = read;
const readSync = (path) => {
    const buffer = fs.readFileSync(path);
    const text = buffer.toString();
    return (0, exports.parse)(text);
};
exports.readSync = readSync;
const parse = (yaml) => {
    return (0, js_yaml_1.load)(yaml, { json: true });
};
exports.parse = parse;
