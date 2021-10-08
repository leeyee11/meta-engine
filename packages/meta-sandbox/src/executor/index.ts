import {NodeVM} from 'vm2';
import {Context} from '../typings/context';

export const execute = (context: Context, expression: string) => {
  const vm = new NodeVM({
    sandbox: context,
  });
  try {
    const module = `module.exports = ${expression}`;
    vm.run(module);
    return context;
  } catch (err) {
    throw err;
  }
};
