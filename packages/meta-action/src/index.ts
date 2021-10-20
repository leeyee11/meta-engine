import {ActionBase, ActionType} from './typings/action';
import io from '@meta-engine/io';
import {Serializable} from 'ts-serializable';
import path from 'path';

const actionDir = `${process.env.GAME_ROOT}/${process.env.GAME_ID}/actions`;

export const load = (rawType: string, name: string) => {
  const type = (rawType ?? 'unknown').replace(/\-action/g, '');
  return io.readSync(
      path.resolve(`${actionDir}/${type}/${name}.yml`),
  ) as ActionBase;
};

export const save = (type: ActionType, action: ActionBase) => {
  const file = path.resolve(`${actionDir}/${type}/${action.id}.yml`);
  return io.writeSync(file, {...action, type} as unknown as Serializable);
};

export type {
  ActionBase,
  ActionType,
};
