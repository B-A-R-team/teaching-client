/*
 * @Author: lts
 * @Date: 2021-04-08 09:26:37
 * @LastEditTime: 2021-04-14 10:42:24
 * @FilePath: \teaching-client\src\main.js
 */
import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import message from './plugins/message';
import router from './router';

Vue.config.productionTip = false;
Vue.use(message);

new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount('#app');
