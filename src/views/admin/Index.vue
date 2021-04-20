<template>
  <v-app id="app">
    <sidebar :visible="visible" />
    <v-app-bar app dense>
      <v-app-bar-nav-icon @click="changeSidebar"></v-app-bar-nav-icon>
    </v-app-bar>
    <v-main>
      <v-breadcrumbs :items="crumbs"></v-breadcrumbs>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Sidebar from './components/Sidebar.vue';
export default {
  components: { Sidebar },
  data() {
    return {
      visible: false,
      crumbs: [
        {
          text: '后台管理',
          disabled: true,
          href: '/#/admin/',
        },
        {
          text: '活动',
          href: '/#/admin/active',
        },
      ],
    };
  },
  methods: {
    changeSidebar() {
      this.visible = !this.visible;
    },
    renderCrumbs(routes) {
      this.crumbs = routes.map(({ name, href }, index) => ({
        text: name,
        disabled: index === 0,
        href: href,
      }));
    },
  },
  watch: {
    $route: function(val) {
      const routes = val.matched.map((route) => ({
        name: route.name,
        href: route.path,
      }));
      this.renderCrumbs(routes);
    },
  },
};
</script>

<style></style>
