<template>
  <v-card tile :loading="loading">
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
      <v-list-item v-if="todoList.length === 0">
        <v-list-item-title>暂无数据</v-list-item-title>
      </v-list-item>
      <v-list-item
        v-else
        v-for="(todo, index) in todoList"
        :key="index"
        :to="'/person/todo'"
      >
        <v-list-item-title style="text-align:left;">
          {{ todo.title }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import { fetchPrePublishedActive } from '../../../api/active';
import getImgFullPath from '../../../utils/getImgFullPath';

export default {
  data() {
    return {
      avatar: '',
      role: '',
      name: '',
      loading: true,
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
    async getTodoList() {
      this.loading = true;
      const { data: todoList } = await fetchPrePublishedActive(
        this.user.id,
        this.user.room?.id ?? 0
      );

      this.todoList = todoList;
      this.loading = false;
    },
  },
  mounted() {
    const userInfo = this.getUserInfo();
    if (userInfo) {
      this.avatar = getImgFullPath(userInfo.avatar);
      this.name = userInfo.name;
      this.role = userInfo.role.name;
      this.user = userInfo;
    } else {
      this.$message({ type: 'error', message: '用户数据读取失败' });
    }

    this.getTodoList();
  },
};
</script>

<style></style>
