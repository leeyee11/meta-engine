"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = exports.invoke = void 0;
const vm2_1 = require("vm2");
const invoke = (context, expression) => {
    const vm = new vm2_1.NodeVM({ sandbox: context });
    try {
        const func = vm.run(`
      module.exports = () => {
        const context = {answer, game, player, battle, enemies, storage, utils};
        (${expression})(context); 
        return context;
      }
    `);
        const result = func();
        return result;
    }
    catch (err) {
        throw err;
    }
};
exports.invoke = invoke;
const run = (context, expression) => {
    const vm = new vm2_1.NodeVM({ sandbox: context });
    try {
        const module = `module.exports = ${expression}`;
        return vm.run(module);
    }
    catch (err) {
        throw err;
    }
};
exports.run = run;
