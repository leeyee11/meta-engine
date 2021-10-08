import sandbox, {Context} from '@meta-engine/sandbox';
import {prompt} from 'inquirer';
import {ActionBase} from '../typings/action';

export const execute = async (context: Context, action: ActionBase) => {
  context.answer = await prompt([action.payload]);
  const expression = `${action.callback.expression})(answer)`;
  return sandbox.execute(context, expression);
};
