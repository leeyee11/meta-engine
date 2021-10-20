import { Service } from 'egg';
import * as path from 'path';
import { listProjects } from '../utils';

/**
 * Game Service
 */
 export default class Workspace extends Service {
  /**
   * blueprints
   */
  public async projects() {
    const absPath = path.resolve(
      process.cwd(), 
      './../../', 
      process.env.GAME_ROOT!
    );
    return listProjects(absPath);
  }
}

