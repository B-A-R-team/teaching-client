<template>
  <v-card tile>
    <v-card-title class="pt-8">
      <v-spacer />
      <v-avatar size="104" color="primary" rounded="circle">
        <v-img :src="avatar" />
      </v-avatar>
      <v-spacer />
    </v-card-title>
    <v-card-subtitle style="text-align: center">
      <p class="text-h6 mt-2 mb-2">{{ name }}</p>
      <v-chip small label color="primary" text-color="white">
        {{ role }}
      </v-chip>
    </v-card-subtitle>
    <v-divider />
    <v-list>
      <v-subheader>待办事项</v-subheader>
      <v-list-item
        v-for="(todo, index) in todoList"
        :key="index"
        :to="todo.link"
      >
        <v-list-item-title style="text-align:left;">{{
          todo.label
        }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      avatar: '',
      role: '',
      name: '',
      todoList: [
        {
          label:
            '如何处理考试中只花10分钟写完卷子之后拿出手机打游戏的学生的会议',
          link: '/todo/123',
        },
        {
          label: '关于如何处理特朗普同志的内部会议',
          link: '/todo/456',
        },
      ],
    };
  },
  methods: {
    getUserInfo() {
      const userInfo = localStorage.getItem('userInfo');
      if (userInfo) {
        return JSON.parse(userInfo);
      } else {
        return null;
      }
    },
  },
  mounted() {
    const userInfo = this.getUserInfo();
    if (userInfo) {
      this.avatar = process.env.VUE_APP_BASE_URL + userInfo.avatar;
      this.name = userInfo.name;
      this.role = userInfo.role.name;
    } else {
      this.avatar =
        'https://cdn.jsdelivr.net/gh/xmy6364/blog-image/img/20200914avatar.jpg';
    }
  },
};
</script>

<style></style>
