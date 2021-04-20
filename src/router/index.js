import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/front/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: () => import('../views/front/Index.vue'),
    children: [
      {
        path: '/',
        name: '首页',
        component: Home,
        meta: { title: '首页 | 教研管理' },
      },
      {
        path: '/about',
        name: '关于',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/front/About.vue'),
        meta: { title: '关于 | 教研管理' },
      },
    ],
  },

  {
    path: '/admin',
    name: '后台管理',
    component: () => import('../views/admin/Index.vue'),
    children: [
      { path: '/admin/', redirect: '/admin/active' },
      {
        path: '/admin/active',
        name: '活动',
        component: () => import('../views/admin/Active.vue'),
        meta: { title: '活动 | 后台管理' },
      },
      {
        path: '/admin/user',
        name: '用户',
        component: () => import('../views/admin/User.vue'),
        meta: { title: '用户 | 后台管理' },
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

export default router;
