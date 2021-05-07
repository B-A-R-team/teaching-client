<template>
  <div>
    <v-row class="todo-list" justify="center">
      <v-col :md="6" v-if="isLeader">
        <v-card class="pa-4 pt-3 adv-act" elevation="0" outlined>
          <p class="text-subtitle-1">预发布活动代办</p>
          <v-divider></v-divider>
          <template v-for="(item, index) in advanceActives">
            <v-list-item
              three-line
              :key="item.id"
              @click="handleDetail(item.id)"
            >
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
                <v-list-item-subtitle class="my-ellipsis">
                  {{ item.content }}
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-list-item-action-text>
                  {{ item.okNum }}/{{ item.total }}
                </v-list-item-action-text>
                <div>
                  <v-btn color="primary" @click="editActive(item.id)"
                    >编辑</v-btn
                  >
                  <v-btn
                    class="ml-3"
                    color="primary"
                    :disabled="!(item.okNum > item.total / 2)"
                    @click="publish(item.id)"
                    >发布</v-btn
                  >
                </div>
              </v-list-item-action>
            </v-list-item>
            <v-divider :key="index"></v-divider>
          </template> </v-card
      ></v-col>
      <v-col :md="isLeader ? 6 : 12">
        <v-card class="pa-4 pt-3 adv-act" elevation="0" outlined>
          <p class="text-subtitle-1">评审活动</p>
          <v-divider></v-divider>
          <div v-if="review.length > 0">
            <template v-for="(item, index) in review">
              <v-list-item
                three-line
                :key="item.id"
                @click="handleDetail(item.id)"
              >
                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                  <v-list-item-subtitle class="my-ellipsis">
                    {{ item.content }}
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <div>
                    <v-btn color="primary" @click="handleVote(item.id, true)"
                      >同意</v-btn
                    >
                    <v-btn
                      color="primary"
                      class="ml-3"
                      @click="handleVote(item.id, false)"
                      >反对</v-btn
                    >
                  </div>
                </v-list-item-action>
              </v-list-item>
              <v-divider :key="index"></v-divider>
            </template>
          </div>
          <div class="mt-3 text-center" style="padding-top: 130px" v-else>
            暂无评审
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import {
  fetchAdvActivesByLeader,
  fetchAgress,
  fetchPrePublishedActive,
  fetchPublishAdvance,
} from "../../api/active";
export default {
  name: "Todo",
  data() {
    return {
      advanceActives: [],
      userInfo: { role: { id: null } },
      review: [],
    };
  },
  inject: ["changeLoading"],
  methods: {
    editActive(id) {
      this.$router.push("/person/publish?act_id=" + id);
    },
    handleDetail() {},
    async publish(id) {
      const res = await fetchPublishAdvance(id);
      if (res.code === 200) {
        this.$message({
          type: "success",
          message: res.data.msg,
          duration: 2000,
        });
        this.getLists();
      }
    },
    async handleVote(active_id, isAgree) {
      const res = await fetchAgress({
        user_id: this.userInfo.id,
        active_id,
        is_agree: isAgree,
      });
      console.log(res);
      if (res.code === 200) {
        this.$message({
          type: "success",
          message: res.data.msg,
          duration: 2000,
        });
        this.getLists();
      }
    },
    async getLists() {
      this.changeLoading(true);
      const userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
      this.userInfo = userInfo;
      if (userInfo.role.id === 3 || userInfo.role.id === 2) {
        const myLists = await Promise.all([
          fetchAdvActivesByLeader(),
          fetchPrePublishedActive(userInfo.id, userInfo.room.id),
        ]);
        if (myLists[0].code === 200) {
          myLists[0].data.forEach((item) => {
            const myJoinUsers = JSON.parse(item.join_users || "[]");
            const total = myJoinUsers.length;
            let okNum = 0;
            myJoinUsers.forEach((item) => {
              if (item.is_ok === true || item.is_ok === "true") {
                okNum++;
              }
            });
            item.total = total;
            item.okNum = okNum;
            delete item.join_users;
          });
          this.review = [];
          myLists[1].data.forEach((item) => {
            this.review.push({
              title: item.title,
              content: item.content,
              id: item.id,
            });
          });
          this.advanceActives = myLists[0].data;
        }
      }
      if (userInfo.role.id <= 1) {
        if (userInfo.room && userInfo.room.id) {
          const res = await fetchPrePublishedActive(
            userInfo.id,
            userInfo.room.id
          );
          this.review = [];
          res.data.forEach((item) => {
            this.review.push({
              title: item.title,
              content: item.content,
              id: item.id,
            });
          });
        }
      }
      this.changeLoading(false);
    },
  },
  async mounted() {
    this.getLists();
  },
  computed: {
    isLeader() {
      const { id } = this.userInfo.role;
      if (id === 3 || id === 2) {
        return true;
      }
      return false;
    },
  },
};
</script>
<style lang="scss">
.todo-list {
  .col-md-6,
  .col-md-12 {
    padding: 0 12px;
  }
  .adv-act {
    min-height: 400px;
    //   max-height: 500px;
    //   overflow-y: scroll;
  }
  .my-ellipsis {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    //   white-space: nowrap !important;
    -webkit-line-clamp: 1 !important;
  }
}
</style>