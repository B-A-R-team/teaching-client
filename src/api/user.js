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
export function fetchUserList(page = 0, pageSize = 10) {
  return request({
    url: '/user/getAllUsers',
    method: 'get',
    params: {
      startNum: page * pageSize,
      pageSize,
    },
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
export const fetchRegister = (data) => request({
  url: '/user/register',
  method: 'post',
  data,
})

export const fetchUploadAvatar = (formData) =>
  request({
    method: 'post',
    url: '/upload/avatar',
    data: formData,
  });

export const fetchAllUserByRommId = (room_id) =>
  request({
    method: 'get',
    url: '/user/getUsersByRoomId',
    params: {
      id: room_id,
    },
  });

export function fetchUserFuzzyQuery(name) {
  return request({
    url: '/user/like',
    method: 'get',
    params: {
      username: name,
    },
  });
}

// 获取所有没有在教研室的用户
export const  fetchAllNoRoomUsers = () => request({
  url: '/user/noroom',
  method: 'get',
})

// 
export const fetchComparePwd = (data) => request({
  url: '/user/pwd',
  method: 'post',
  data
})

export const fetchUpdatePwd = (data) => request({
  url: '/user/pwd',
  method: 'put',
  data
})