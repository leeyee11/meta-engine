import * as fs from 'fs-extra';
import {PathLike} from 'fs-extra';
import {load} from 'js-yaml';

export const read = (path: PathLike): Promise<Object> => {
  return fs.readFile(path)
      .then((buffer) => buffer.toString())
      .then((text) => parse(text) as Object);
};

export const readSync = (path: PathLike): Object => {
  const buffer = fs.readFileSync(path);
  const text = buffer.toString();
  return parse(text) as Object;
};

export const parse = (yaml: string): unknown => {
  return load(yaml, {json: true});
};
