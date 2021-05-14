<template>
  <router-view></router-view>
</template>
<script>
import getRoutes from "./router/diff.js";
export default {
  name: "App",
  created() {
    const userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
    if (userInfo) {
      const myRoutes = getRoutes(JSON.parse(userInfo.role.role_menu));
      myRoutes.forEach((item, index) => {
        if (index === 0) {
          this.$router.addRoute("zong", item);
        }
        if (index === 1) {
          this.$router.addRoute("admin", item);
        }
      });
    }
  },
};
</script>
<style lang="scss"></style>
