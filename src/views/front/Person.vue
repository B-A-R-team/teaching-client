<template>
  <div class="personal mb-8">
    <v-row>
      <v-col cols="3">
        <info :childavatar="userInfo.avatar" />
      </v-col>
      <v-col cols="9">
        <v-card tile :loading="loading">
          <v-tabs v-model="tab">
            <template v-for="(item, index) in nav">
              <v-tab :key="index" :to="item.link" v-if="isShowTabs(item)">
                {{ item.label }}
              </v-tab>
            </template>
          </v-tabs>
          <router-view></router-view>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import Info from "./components/Info.vue";
export default {
  components: {
    Info,
  },
  provide() {
    return {
      changeLoading: this.changeLoading,
      getAvatar: this.getAvatar,
    };
  },
  data() {
    return {
      tab: null,
      nav: [
        { link: "/person/home", label: "主页" },
        { link: "/person/todo", label: "待办" },
        { link: "/person/publish", label: "发布" },
        { link: "/person/settings", label: "设置" },
      ],
      loading: true,
      userInfo: { role: { id: null } },
    };
  },
  methods: {
    changeLoading(val) {
      this.loading = val;
    },
    isShowTabs(item) {
      if (item.link === "/person/publish") {
        if (this.userInfo.role.id >= 2 && this.userInfo.role.id <= 3) {
          return true;
        }
        return false;
      }
      return true;
    },
    getAvatar(filePath) {
      this.userInfo.avatar = filePath
    }
  },
  mounted() {
    const userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
    this.userInfo = userInfo;
  },
};
</script>
<style lang="scss" scoped></style>
