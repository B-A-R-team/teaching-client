/*
 * @Author: lts
 * @Date: 2021-04-03 19:53:19
 * @LastEditTime: 2021-04-03 21:42:32
 * @Filekey: \active-center-client\src\utils\treeData.js
 */
const menuData = [
    {
        id: 1,
        key: "/person",
        name: "个人空间",
        icon: null,
        children: [
            {
                id: 2,
                key: '/person/home',
                name: '个人主页',
                icon: null,

            },
            {
                id: 3,
                key: '/person/settings',
                name: '设置',
                icon: null,
            },
            {
                id: 4,
                key: '/person/todo',
                name: '草稿箱',
                icon: null
            },
            {
                id: 5,
                key: '/person/publish',
                name: '发布活动',
                icon: null
            },
        ]
    },
    {
        id: 6,
        key: '/activeDetail',
        name: '活动详情',
        icon: null,
    },
    {
        id: 7,
        key: '/admin',
        name: '后台管理',
        icon: null,
        children: [
            {
                id: 8,
                key: '/admin/user',
                name: '用户',
                icon: 'mdi-account'
            },
            {
                id: 9,
                key: '/admin/role',
                name: '权限角色',
                icon: 'mdi-arrow-vertical-lock'

            },
            {
                id: 10,
                key: '/admin/room',
                name: '教研室',
                icon: 'mdi-home',
                children: [
                    {
                        id: 11,
                        key: '/admin/room',
                        name: '教研室',
                        icon: 'mdi-home',
                    },
                    {
                        id: 12,
                        key: '/admin/room/detail/:id',
                        name: '详情',
                        icon: null
                    },
                ],
            },
            {
                id: 13,
                key: '/admin/dRoom',
                name: '该教研室',
                icon: 'mdi-home-city'
            },
        ],
    },

]
// const arr = []
// menuData.forEach(item => {
//     dfs(item, arr)
// })
// function dfs(node, arr) {
//     if (!node.children && node.locked) {
//         arr.push(node)
//     }
//     if (node.children) {
//         dfs(node.children, arr)
//     }
// }
// console.log(arr)


export default menuData
