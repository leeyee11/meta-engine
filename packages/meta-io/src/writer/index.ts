import {dump as yamlDump} from 'js-yaml';
import {PathLike} from 'graceful-fs';
import {writeFile, writeFileSync} from 'fs-extra';
import {FlowBase} from '@meta-engine/flow';
import {ActionBase} from '@meta-engine/action';
import {RuleBase} from '@meta-engine/rule';

type Serializable = ActionBase | FlowBase | RuleBase

export const write = (file: PathLike, data: Serializable): void => {
  const text = dump(data);
  writeFileSync(file, text);
};

export const writeSync = (file: PathLike, data: Serializable)
: Promise<void> => {
  const text = dump(data);
  return writeFile(file, text);
};

export const dump = (data: Serializable): string => {
  return yamlDump(data);
};

