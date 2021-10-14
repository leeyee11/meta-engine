import {ActionBase, ActionType} from './typings/action';
import io from '@meta-engine/io';
import path from 'path';
const defaultActionDir = __dirname + './../actions';

export const load = (rawType: string, name: string) => {
  const type = (rawType ?? 'unknown').replace(/\-action/g, '');
  return io.readSync(
      path.resolve(`${defaultActionDir}/${type}/${name}.yml`),
  ) as ActionBase;
};

export const save = (type: ActionType, action: ActionBase) => {
  const file = path.resolve(`${defaultActionDir}/${type}/${action.id}.yml`);
  return io.writeSync(file, {...action, type});
};

export type {
  ActionBase,
};
