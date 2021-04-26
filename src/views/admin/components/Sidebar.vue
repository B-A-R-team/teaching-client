<template>
  <v-navigation-drawer app :mini-variant="visible" permanent>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">
          教研管理
        </v-list-item-title>
        <v-list-item-subtitle>
          后台系统
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense>
      <div v-for="item in items" :key="item.title">
        <v-list-group v-if="item.children" :prepend-icon="item.icon">
          <template v-slot:activator>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </template>
          <v-list-item
            v-for="sub in item.children"
            :to="sub.url"
            color="primary"
            :key="sub.title"
          >
            <v-list-item-icon>
              <v-icon>{{ sub.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ sub.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-item v-else :to="item.url" color="primary">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </div>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    visible: Boolean,
  },
  data() {
    return {
      //  {
      //     title: '教研室',
      //     icon: 'mdi-home',
      //     children: [
      //       {
      //         title: '增加教研室',
      //         url: '/admin/room/add',
      //       },
      //     ],
      //   },
      items: [
        { title: '活动', icon: 'mdi-view-dashboard', url: '/admin/active' },
        { title: '用户', icon: 'mdi-account', url: '/admin/user' },
        { title: '教研室', icon: 'mdi-home', url: '/admin/room' },
      ],
      right: null,
    };
  },
};
</script>

<style></style>
