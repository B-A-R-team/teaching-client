<template>
  <div>
    <v-row class="todo-list" justify="center">
      <v-col :md="12" v-if="isLeader">
        <v-card class="pa-4 pt-3 adv-act" elevation="0" outlined>
          <p class="text-subtitle-1">草稿活动代办</p>
          <v-divider></v-divider>
          <template v-for="(item, index) in advanceActives">
            <v-list-item three-line :key="item.id" @click="handleDetail(item.id)">
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
                <v-list-item-subtitle class="my-ellipsis">{{ item.content }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-list-item-action-text>lalla</v-list-item-action-text>
                <div>
                  <v-btn color="primary" @click="editActive(item.id)">编辑</v-btn>
                  <v-btn class="ml-3" color="primary" @click="publish(item.id)">发布</v-btn>
                </div>
              </v-list-item-action>
            </v-list-item>
            <v-divider :key="index"></v-divider>
          </template>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import {
  fetchAdvActivesByLeader,
  fetchPublishAdvance,
} from "../../api/active";
export default {
  name: "Todo",
  data() {
    return {
      advanceActives: [],
      userInfo: { role: { id: null } },
    };
  },
  inject: ["changeLoading"],
  methods: {
    editActive(id) {
      this.$router.push("/person/publish?act_id=" + id);
    },
    handleDetail() { },
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
    async getLists() {
      this.changeLoading(true);
      const userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
      this.userInfo = userInfo;
      if (userInfo.role.id === 3 || userInfo.role.id === 2) {
        const myLists = await Promise.all([
          fetchAdvActivesByLeader()
        ]);
        if (myLists[0].code === 200) {
          this.advanceActives = myLists[0].data;
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