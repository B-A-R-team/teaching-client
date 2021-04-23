/*
 * @Author: lts
 * @Date: 2021-04-08 09:26:37
 * @LastEditTime: 2021-04-21 11:27:13
 * @FilePath: \teaching-client\src\utils\request.js
 */
import axios from 'axios';
import { showMessage } from '../plugins/message';
import { getToken } from './auth';

const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 10000,
});

request.interceptors.request.use(
  (config) => {
    const token = getToken() ?? '';

    if (token) {
      config.headers['Authorization'] = token;
    }

    return config;
  },
  (error) => {
    showMessage({ type: 'error', message: error });
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (response) => {
    const { data: result } = response;

    if (result.code !== 200) {
      showMessage({ type: 'error', message: result.message });
    }

    return result;
  },
  (error) => {
    showMessage({ type: 'error', message: error });
    return Promise.reject(error);
  }
);

export default request;
