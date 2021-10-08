import * as fs from 'fs-extra';
import {PathLike} from 'fs-extra';
import {load} from 'js-yaml';

export const read = (path: PathLike) => {
  return fs.readFile(path)
      .then((buffer) => buffer.toString())
      .then((text) => parse(text));
};

export const parse = (yaml: string) => {
  return load(yaml, {json: true});
};
