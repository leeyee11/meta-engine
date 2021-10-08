import {ActionBase} from '@meta-engine/action';
import sandbox, {Context} from '@meta-engine/sandbox';
import inquirer from 'inquirer';
export default (context: Context, action: ActionBase) => {
  if (action.type === 'inquire') {
    return inquirer.prompt(action.payload)
        .then((answer) => {
          context.answer = answer;
          sandbox.execute(context, action.callback.expression);
        });
  }
};
