import {ActionBase} from '@meta-engine/action';
import sandbox, {Context} from '@meta-engine/sandbox';
import {keypress} from './utils';
import inquirer from 'inquirer';
import chalk from 'chalk';

export default (context: Context, action: ActionBase): Promise<Context> => {
  if (action.type === 'inquire') {
    return inquirer.prompt(action.payload)
        .then((answer) => {
          context.answer = answer;
          return sandbox.invoke(context, action.callback.expression);
        });
  } else if (action.type === 'output') {
    const sentences = (action.payload as string[]).map(text => {
      return sandbox.run(context, "`" + text +"`");
    });
    const interact = async () => {
      for (let sentence of sentences) {
        console.log(chalk.blue(sentence));
        console.log(chalk.green('Press any key to continue'));
        await keypress();
        process.stdout.moveCursor(0, -1);
        process.stdout.clearScreenDown()
      }
    }
    return interact().then(() => context);
  }
  return Promise.resolve(context)
};
