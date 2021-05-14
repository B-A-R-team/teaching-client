import { request } from '../utils';


export const fetchCreateRole = (data) => request({
    url: '/role/create',
    method: 'post',
    data
})
export const fetchUpdateRole = (data) => request({
    url: '/role/update',
    method: 'put',
    data
})
export const fetchRoles = () => request({
    url: '/role',
    method: 'get',
})