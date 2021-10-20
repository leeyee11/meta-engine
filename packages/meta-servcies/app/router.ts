import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/meta/blueprints', controller.meta.blueprints);
  router.get('/meta/projects', controller.meta.projects);
};
