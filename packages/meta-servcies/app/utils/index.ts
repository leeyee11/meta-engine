import * as fs from 'fs-extra';
import io from '@meta-engine/io';
import * as path from 'path';
import * as _ from 'lodash';

export const visitDir = (fullPath, dict, keys) => {
  const dirs = fs.readdirSync(fullPath);
  dirs.forEach(dir => {
    const cwd = path.resolve(fullPath, dir);
    const stat = fs.statSync(cwd)
    if (stat.isDirectory()){
      visitDir(cwd, dict, [...keys, dir]);
    } else if (stat.isFile()){
      if (dir.split('.').pop() !== 'yml') return;
      const fileName = dir.split('.').shift();
      const data = io.readSync(cwd);
      _.set(dict, [...keys, fileName].join('.'), data);
    }
  })
}

export const listProjects = (fullPath) => {
  return fs.readdirSync(fullPath).map(dir => 
    io.readSync(path.resolve(fullPath, dir, 'project.yml'))
  );
}