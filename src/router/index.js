import Vue from 'vue';
import VueRouter from 'vue-router';
import docs from '../docs';
import Doc from '../components/doc.vue';
import mindmap from '../components/mindmap.vue'

Vue.use(VueRouter);

const routes = docs.map(
  v =>
    /** @type {import('vue-router').RouteConfig} */ ({
      path: v.url,
      name: v.url,
      component: Doc,
      meta: v
    })
);

routes.push({
  path: '/mindmap',
  name: 'mindmap',
  component: mindmap
})

const router = new VueRouter({
  routes,
  mode: 'hash'
});

export default router;
