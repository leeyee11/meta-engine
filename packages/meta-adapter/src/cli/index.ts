import {ActionBase} from '@meta-engine/action';
import sandbox, {Context} from '@meta-engine/sandbox';
import {keypress, playSubtitle} from './utils';
import inquirer from 'inquirer';

export default (context: Context, action: ActionBase): Promise<Context> => {
  if (action.type === 'inquire') {
    return inquirer.prompt(action.payload)
        .then((answer) => {
          context.answer = answer;
          return sandbox.invoke(context, action.callback.expression);
        });
  } else if (action.type === 'output') {
    const sentences = (action.payload.lines as string[]).map(text => {
      return sandbox.run(context, "`" + text +"`");
    });
    return action.payload.show === "line"
      ? playSubtitle(sentences, {interval: 10})
        .then(() => context)
      : playSubtitle(sentences, {interval: 0, blocker: null})
        .then(() => context)
  }
  return Promise.resolve(context)
};
