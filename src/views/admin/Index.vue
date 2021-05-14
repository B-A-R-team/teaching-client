<template>
  <v-app id="app" class="admin-container">
    <sidebar :visible="visible" />
    <v-app-bar app dense>
      <v-app-bar-nav-icon @click="changeSidebar"></v-app-bar-nav-icon>
      <v-spacer />
      <v-app-bar-nav-icon @click="changeDark">
        <v-icon>mdi-brightness-4</v-icon>
      </v-app-bar-nav-icon>
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
      ],
    };
  },
  methods: {
    changeSidebar() {
      this.visible = !this.visible;
    },
    changeDark() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
    renderCrumbs(routes) {
      this.crumbs = routes
        .map(({ name, href }, index) => {
          if (name) {
            return {
              text: name,
              disabled: index === 0,
              href: '/#' + href,
            };
          }
        })
        .filter((item) => item !== undefined);
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

<style lang="scss">
.admin-container {
  min-height: 100vh;
}
</style>
