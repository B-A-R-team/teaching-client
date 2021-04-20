import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/front/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Front',
    component: () => import('../views/front/Index.vue'),
    children: [
      {
        path: '/',
        name: 'Home',
        component: Home,
      },
      {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/front/About.vue'),
      },
    ],
  },

  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/admin/Index.vue'),
    // children: [
    //   {
    //     path: '/active',
    //     name: 'Active',
    //     component: () => import('../views/admin/Active.vue'),
    //   },
    // ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
