import { defineConfig } from 'umi';

export default defineConfig({
  layout: {
    name: 'Meta Studio'
  },
  publicPath: '/assets/',
  nodeModulesTransform: {},
  routes: [
    { path: '/dashboard', component: '@/pages/dashboard', name: 'dashboard' },
    { path: '/flow', component: '@/pages/flow', name: 'flow' },
    { path: '/action', component: '@/pages/action', name: 'action' },
    { path: '/rule', component: '@/pages/rule', name: 'rule' },
    { path: '/', redirect: '/dashboard' }
  ],
  fastRefresh: {},
  proxy: {
    '/meta': {
      target: 'http://localhost:7001',
      changeOrigin: true,
      pathRewrite: { '^/meta' : '/meta' },
    }
  }
});
