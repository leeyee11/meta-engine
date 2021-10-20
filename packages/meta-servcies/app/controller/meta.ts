import { Controller } from 'egg';

export default class HomeController extends Controller {
  public async blueprints() {
    const { ctx } = this;
    ctx.body = await ctx.service.game.blueprints();
  }

  public async projects() {
    const { ctx } = this;
    ctx.body = await ctx.service.workspace.projects();
  }
}
