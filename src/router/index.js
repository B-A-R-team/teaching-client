import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/front/Home.vue';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
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
        path: '/login',
        name: 'Login',
        component: () => import('../views/front/login.vue'),
        meta: { title: '登录 | 教研室管理' },
      },
      {
        path: '/person',
        name: 'Person',
        component: () => import('../views/front/Person.vue'),
        redirect: '/person/home',
        children: [
          {
            path: '/person/home',
            name: 'PersonHome',
            component: () => import('../views/front/PersonHome.vue'),
            meta: { title: '个人空间 | 教研室管理' },
          },
          {
            path: '/person/settings',
            name: 'Modification',
            component: () => import('../views/front/Modification.vue'),
            meta: { title: '设置 | 教研管理' },
          },
        ],
      },
      {
        path: '/activeDetail',
        name: 'ActiveDetail',
        component: () => import('../views/front/ActiveDetail.vue'),
        meta: { title: '活动详情 | 教研管理' },
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
  NProgress.start();
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});
router.afterEach(() => {
  NProgress.done();
});

export default router;
