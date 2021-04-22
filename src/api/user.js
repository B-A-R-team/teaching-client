/*
 * @Author: lts
 * @Date: 2021-04-08 09:26:37
 * @LastEditTime: 2021-04-19 20:54:08
 * @FilePath: \teaching-client\src\api\user.js
 */
import { request } from '../utils';

/**
 * 获取用户列表
 * @returns Promise
 */
export function fetchUserList() {
  return request({
    url: '',
    method: 'get',
    params: {},
  });
}

/**
 * 添加用户
 * @param {*} user 用户信息
 * @returns Promise
 */
export function addUser(user) {
  return request({
    url: '',
    method: 'post',
    data: { ...user },
  });
}
/**
 * 登录
 * @param {*} user 用户信息
 * @returns Promise
 */
export function resLogin(account) {
  return request({
    url: '/user/login',
    method: 'post',
    data: { ...account },
  });
}
// export function fetchRegister() {

// }