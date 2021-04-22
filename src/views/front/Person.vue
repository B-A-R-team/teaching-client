<template>
  <div class="personal">
    <v-row>
      <v-col cols="3">
        <info />
      </v-col>
      <v-col cols="9">
        <v-card tile>
          <v-tabs v-model="tab">
            <v-tab v-for="(item, index) in nav" :key="index" :to="item.link">
              {{ item.label }}
            </v-tab>
          </v-tabs>
          <router-view></router-view>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import Info from './components/Info.vue';
export default {
  components: {
    Info,
  },
  data() {
    return {
      tab: null,
      nav: [
        { link: '/person/home', label: '主页' },
        { link: '/person/todo', label: '待办' },
        { link: '/person/publish', label: '发布' },
        { link: '/person/settings', label: '设置' },
      ],
    };
  },
};
</script>
<style lang="scss" scoped></style>
