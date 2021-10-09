import {ActionBase} from '@meta-engine/action';
import sandbox, {Context} from '@meta-engine/sandbox';
import inquirer from 'inquirer';
export default (context: Context, action: ActionBase): Promise<Context> => {
  if (action.type === 'inquire') {
    return inquirer.prompt(action.payload)
        .then((answer) => {
          context.answer = answer;
          return sandbox.execute(context, action.callback.expression);
        });
  }
  return Promise.resolve(context)
};
