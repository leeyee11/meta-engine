"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dfa_1 = __importDefault(require("./dfa"));
const flow_1 = require("./typings/flow");
exports.default = {
    dfa: dfa_1.default,
};
