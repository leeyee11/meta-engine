import sandbox, {Context} from '@meta-engine/sandbox';
import {cloneDeep} from 'lodash';

export const execute = (context: Context, expression: string) => {
  return sandbox.execute(context, expression);
};

export const judge = (context: Context, expression: string) => {
  const clonedContext = cloneDeep(context);
  const result = sandbox.test(clonedContext, expression);
  if (typeof result === 'boolean') {
    return result;
  }
  throw new Error('Invalid response from expression');
};
