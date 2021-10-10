import {NodeVM} from 'vm2';
import {Context} from '../typings/context';

export const invoke = (context: Context, expression: string) => {
  const vm = new NodeVM({sandbox: context});
  try {
    const func = vm.run(`
      module.exports = () => {
        const context = {answer, game, player, battle, enemies, storage};
        (${expression})(context); 
        return context;
      }
    `);
    const result = func();
    return result;
  } catch (err) {
    throw err;
  }
};

export const run = (context: Context, expression: string) => {
  const vm = new NodeVM({sandbox: context});
  try {
    const module = `module.exports = ${expression}`;
    return vm.run(module);
  } catch (err) {
    throw err;
  }
}
;
