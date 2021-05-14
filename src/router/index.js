import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/front/Home.vue';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { getToken } from '../utils/auth';
// import getRoutes from './diff'
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name:'zong',
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
        path: '/activeDetail',
        name: 'ActiveDetail',
        component: () => import('../views/front/ActiveDetail.vue'),
        meta: { title: '活动详情 | 教研管理' },
      },
    ],
  },
];

const router = new VueRouter({
  routes,
  scrollBehavior() {
    return {
      x: 0,
      y: 0,
    };
  },
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  const token = getToken()
  if (to.name === 'Login' && token) {
    return next({ name: '首页' });
  }
  if (to.name !== 'Login' && !token && to.name !== '首页' && to.name !== 'ActiveDetail' && to.name !== 'Register') next({ name: 'Login' });
  // 如果用户未能验证身份，则 `next` 会被调用两次
  // if (from.name === 'Login') {
  //   if (window.localStorage.getItem('userInfo')) {
  //     const menu = JSON.parse(JSON.parse(window.localStorage.getItem('userInfo')).role.role_menu)
  //     // eslint-disable-next-line no-unused-vars
  //     const myRoutes = getRoutes(menu)
  //     // console.log(myRoutes)
  //     // for (let i = 0; i < myRoutes.length; i++) {
  //     //   router.addRoute(myRoutes[i].path, myRoutes[i])
  //     // }
  //     router.options.routes = myRoutes
  //     router.addRoutes(router.options.routes)
  //   }

  // }
  next();
});
router.afterEach(() => {
  NProgress.done();
});
// router.options.routes[0].children[2].children.push({
//   path: '/person/publish',
//   name: 'Publish',
//   component: resolve => require(['../views/front/Publish.vue'], resolve),
//   meta: { title: '发布 | 教研管理' },
// })
// router.addRoutes(router.options.routes)
// router.addRoute('person', {
//   path: '/person/publish',
//   name: 'Publish',
//   component: resolve => require(['../views/front/Publish.vue'], resolve),
//   meta: { title: '发布 | 教研管理' },
// })


export default router;
