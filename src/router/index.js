import Vue from 'vue';
import VueRouter from 'vue-router';
import docs from '../docs';
import Doc from '../components/doc.vue';

Vue.use(VueRouter);

const routes = docs.map(
  v =>
    /** @type {import('vue-router').RouteConfig} */ ({
      path: '/' + v.url,
      name: v.url,
      component: Doc,
      meta: v
    })
);

const router = new VueRouter({
  routes,
  mode: 'hash'
});

export default router;
