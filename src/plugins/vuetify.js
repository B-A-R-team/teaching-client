/*
 * @Author: lts
 * @Date: 2021-04-08 09:26:37
 * @LastEditTime: 2021-04-14 09:24:38
 * @FilePath: \teaching-client\src\plugins\vuetify.js
 */
import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import zhHans from 'vuetify/es5/locale/zh-Hans';

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: { zhHans },
    current: 'zhHans',
  },
  theme: {
    themes: {
      light: {
        primary: '#1F8DDA',
      },
      dark: {
        primary: '#1F8DDA',
      },
    },
  },
});
