import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import message from './plugins/message';
import router from './router';
import axios from 'axios'
axios.defaults.baseURL="https://www.zxyc.xyz:3450"
Vue.prototype.$http = axios;


Vue.config.productionTip = false;
Vue.use(message);

new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount('#app');
