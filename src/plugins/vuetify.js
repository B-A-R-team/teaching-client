/*
 * @Author: lts
 * @Date: 2021-04-08 09:26:37
 * @LastEditTime: 2021-04-14 09:24:38
 * @FilePath: \teaching-client\src\plugins\vuetify.js
 */
import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#1F8DDA',
      },
    },
  },
});
