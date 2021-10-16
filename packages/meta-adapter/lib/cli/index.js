"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sandbox_1 = __importDefault(require("@meta-engine/sandbox"));
const utils_1 = require("./utils");
const inquirer_1 = __importDefault(require("inquirer"));
const evaluate = (context, exp) => sandbox_1.default.run(context, '`' + exp + '`');
exports.default = (context, action) => {
    var _a, _b, _c, _d;
    if (action.type === 'inquire') {
        const payload = {
            ...action.payload,
            default: evaluate(context, (_b = (_a = action.payload) === null || _a === void 0 ? void 0 : _a.default) !== null && _b !== void 0 ? _b : ''),
            choices: ((_c = action.payload) === null || _c === void 0 ? void 0 : _c.choices) && (((_d = action.payload) === null || _d === void 0 ? void 0 : _d.dynamicChoices) ?
                sandbox_1.default.run(context, action.payload.choices) :
                action.payload.choices.map((choice) => evaluate(context, choice))),
        };
        return inquirer_1.default.prompt(payload)
            .then((answer) => {
            context.answer = answer;
            return sandbox_1.default.invoke(context, action.callback.expression);
        });
    }
    else if (action.type === 'output') {
        const subtitles = action.payload.dynamicLines ?
            sandbox_1.default.run(context, action.payload.lines) :
            action.payload.lines.map((text) => {
                return evaluate(context, text);
            });
        return action.payload.show === 'line' ?
            (0, utils_1.playSubtitle)(subtitles, { interval: 10 })
                .then(() => context) :
            (0, utils_1.playSubtitle)(subtitles, { interval: 0, blocker: null, hint: '' })
                .then(() => context);
    }
    else if (action.type === 'update') {
        sandbox_1.default.invoke(context, action.payload.expression);
        const subtitle = evaluate(context, action.payload.subtitle);
        return (0, utils_1.playSubtitle)([subtitle], { interval: 10 })
            .then(() => context);
    }
    return Promise.resolve(context);
};
