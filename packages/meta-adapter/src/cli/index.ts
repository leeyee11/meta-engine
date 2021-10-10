import {ActionBase} from '@meta-engine/action';
import sandbox, {Context} from '@meta-engine/sandbox';
import {keypress, playSubtitle} from './utils';
import inquirer from 'inquirer';

const evaluate = (context: Context, exp: string) => sandbox.run(context, "`" + exp +"`");

export default (context: Context, action: ActionBase): Promise<Context> => {

  if (action.type === 'inquire') {
    const payload = {
      ...action.payload,
      default: evaluate(context, action.payload?.default ?? ''),
      choices: action.payload?.choices && (
        action.payload?.dynamicChoices
        ? sandbox.run(context, action.payload.choices)
        : action.payload.choices.map((choice: string)=> evaluate(context, choice))
      )
    };
    return inquirer.prompt(payload)
        .then((answer) => {
          context.answer = answer;
          return sandbox.invoke(context, action.callback.expression);
        });
  } else if (action.type === 'output') {
    const sentences = action.payload.dynamicLines
      ? sandbox.run(context, action.payload.lines)
      : (action.payload.lines as string[]).map(text => {
          return evaluate(context, text);
        });
    return action.payload.show === "line"
      ? playSubtitle(sentences, {interval: 10})
        .then(() => context)
      : playSubtitle(sentences, {interval: 0, blocker: null, hint: ''})
        .then(() => context)
  }
  return Promise.resolve(context)
};
