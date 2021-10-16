"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.judge = exports.execute = void 0;
const sandbox_1 = __importDefault(require("@meta-engine/sandbox"));
const lodash_1 = require("lodash");
const execute = (context, expression) => {
    return sandbox_1.default.invoke(context, expression);
};
exports.execute = execute;
const judge = (context, expression) => {
    const clonedContext = (0, lodash_1.cloneDeep)(context);
    const result = sandbox_1.default.run(clonedContext, expression);
    if (typeof result === 'boolean') {
        return result;
    }
    throw new Error('Invalid response from expression');
};
exports.judge = judge;
