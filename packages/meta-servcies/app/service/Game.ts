import { Service } from 'egg';
import * as path from 'path';
import { visitDir } from '../utils';

/**
 * Game Service
 */
export default class Game extends Service {
  /**
   * blueprints
   */
  public async blueprints() {
    const absPath = path.resolve(
      process.cwd(), 
      './../../', 
      process.env.GAME_ROOT!
    );
    const fileDict = {};
    visitDir(absPath, fileDict, []);
    return fileDict;
  }
}
