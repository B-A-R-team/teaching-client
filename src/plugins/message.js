/*
 * @Author: lts
 * @Date: 2021-04-08 09:26:37
 * @LastEditTime: 2021-04-19 18:29:32
 * @FilePath: \teaching-client\src\plugins\message.js
 */
/**
 * src/plugins/message.js
 * ----------------------------
 * 封装全局提示框
 * ----------------------------
 * example:
 * this.$message.info('这是提示')
 */

import Message from '@/components/Message.vue';
import Vuetify from 'vuetify/lib';

const message = {};
let show = null;

message.install = function(Vue) {
  const MessageConstructor = Vue.extend(Message);

  const instance = new MessageConstructor();
  instance.$vuetify = new Vuetify().framework;
  let vm = instance.$mount();
  document.body.appendChild(vm.$el);
  console.log(instance)
  show = function({ type, message, duration }) {
    duration = duration ?? 5000;
    instance[type](message, duration);
  };

  Vue.prototype.$message = show;
};

export const showMessage = show;
export default message;
