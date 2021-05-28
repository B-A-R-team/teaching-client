const routes = [
    {
        path: '/',
        name: 'zong',
        component: () => import('../views/front/Index.vue'),
        children: [
            {
                path: '/',
                name: '首页',
                component: import('../views/front/Index.vue'),
                meta: { title: '首页 | 教研管理' },
            },
            {
                path: '/login',
                name: 'Login',
                component: () => import('../views/front/login.vue'),
                meta: { title: '登录 | 教研室管理' },
            },
            {
                path: '/register',
                name: 'Register',
                component: () => import('../views/front/Register.vue'),
                meta: { title: '注册 | 教研室管理' },
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
                    {
                        path: '/person/todo',
                        name: 'Todo',
                        component: () => import('../views/front/Todo.vue'),
                        meta: { title: '草稿箱 | 教研管理' },
                    },
                    {
                        path: '/person/publish',
                        name: 'Publish',
                        component: resolve => require(['../views/front/Publish.vue'], resolve),
                        meta: { title: '发布 | 教研管理' },
                    }
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
            {
                path: '/admin',
                name: '主页',
                component: () => import('../views/admin/Home.vue'),
                meta: { title: '主页 | 后台管理' },
            },
            {
                path: '/admin/user',
                name: '用户',
                component: () => import('../views/admin/User.vue'),
                meta: { title: '用户 | 后台管理' },
            },
            {
                path: '/admin/role',
                name: '权限角色',
                component: () => import('../views/admin/Role.vue'),
                meta: { title: '用户 | 权限角色管理' },
            },
            {
                path: '/admin/room',
                name: '教研室',
                component: () => import('../views/admin/room/Index.vue'),
                children: [
                    {
                        path: '/admin/room',
                        component: () => import('../views/admin/room/Room.vue'),
                        meta: { title: '教研室 | 后台管理' },
                    },
                    {
                        path: '/admin/room/detail/:id',
                        name: '详情',
                        component: () => import('../views/admin/room/RoomDetail.vue'),
                        meta: { title: '教研室详情 | 后台管理' },
                    },

                ],
            },
            {
                path: '/admin/dRoom',
                name: '详情',
                component: () => import('../views/admin/DRoom.vue'),
                meta: { title: '该教研室 | 后台管理' },
            },

        ],
    },
];
const myRoutes = [{
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
},]
export default (menu) => {
    routes[0].children[3].children.forEach(item => {
        for (let i = 0; i < menu.length; i++) {
            if (menu[i].key === item.path) {
                myRoutes[0].children.push(item)
            }
        }
    })
    if (menu.some(item => item.key.substring(0, 6) === '/admin')) {
        myRoutes.push({
            path: '/admin',
            name: '后台管理',
            component: () => import('../views/admin/Index.vue'),
            redirect: '/admin/home',
            children: [{
                path: '/admin/home',
                name: '主页',
                component: () => import('../views/admin/Home.vue'),
                meta: { title: '主页 | 后台管理' },
            },]
        })
        routes[1].children.forEach(item => {
            for (let i = 0; i < menu.length; i++) {
                if (menu[i].key === item.path) {
                    myRoutes[1].children.push(item)
                }
            }
        })
    }
    return myRoutes
}