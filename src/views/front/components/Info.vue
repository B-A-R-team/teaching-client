<template>
  <v-card tile :loading="loading">
    <v-card-title class="pt-8">
      <v-spacer />
      <v-avatar size="104" color="primary" rounded="circle">
        <v-img :src="renderImg(propsAvatar)" />
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
      <v-subheader>个人信息</v-subheader>
      <v-list-item>
        <v-list-item-title style="text-align: left">
          教研室：{{ room }}
        </v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-title style="text-align: left">
          工号：{{ jobId }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import getImgFullPath from "../../../utils/getImgFullPath";

export default {
  data() {
    return {
      avatar: "",
      role: "",
      name: "",
      loading: true,
      room: "无",
      jobId: "",
      todoList: [
        {
          label:
            "如何处理考试中只花10分钟写完卷子之后拿出手机打游戏的学生的会议",
          link: "/todo/123",
        },
      ],
      propsAvatar: null,
    };
  },
  methods: {
    getUserInfo() {
      const userInfo = localStorage.getItem("userInfo");
      if (userInfo) {
        return JSON.parse(userInfo);
      } else {
        return null;
      }
    },
    renderImg(filePath) {
      return getImgFullPath(filePath);
    },
  },
  props: {
    childavatar: {
      type: String,
    },
  },
  mounted() {
    const userInfo = this.getUserInfo();
    if (userInfo) {
      this.avatar = getImgFullPath(userInfo.avatar);
      this.name = userInfo.name;
      this.role = userInfo.role.name;
      this.user = userInfo;
      userInfo.room && (this.room = userInfo.room.name);
      this.jobId = userInfo.job_id;
    } else {
      this.$message({ type: "error", message: "用户数据读取失败" });
    }

    this.loading = false;
  },
  watch: {
    childavatar(newVal) {
      this.propsAvatar = newVal;
    },
  },
};
</script>

<style></style>
