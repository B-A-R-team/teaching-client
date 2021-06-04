<template>
  <div>
    <v-row class="todo-list" justify="center">
      <v-col :md="6" v-if="isLeader">
        <v-card
          class="pa-4 pt-3 adv-act"
          elevation="0"
          outlined
          :loading="loading"
        >
          <p class="text-subtitle-1">活动箱</p>
          <v-divider></v-divider>
          <template v-for="(item, index) in doneActives">
            <v-list-item
              three-line
              :key="item.id"
              @click="handleDetail(item.id)"
            >
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
                <v-list-item-subtitle class="my-ellipsis">{{
                  item.content
                }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-list-item-action-text>{{
                  item.start_time
                }}</v-list-item-action-text>
                <div>
                  <v-btn color="primary" @click="editPubActive(item.id)"
                    >编辑</v-btn
                  >
                </div>
              </v-list-item-action>
            </v-list-item>

            <v-divider :key="index"></v-divider>
          </template>
          <div class="mt-3 pag-posi">
            <v-pagination
              v-model="page_size"
              :length="Math.ceil(total / 4)"
              @input="changePage"
            ></v-pagination>
          </div>
        </v-card>
      </v-col>
      <v-col :md="6" v-if="isLeader">
        <v-card
          class="pa-4 pt-3 adv-act"
          elevation="0"
          outlined
          style="height: 100%"
        >
          <p class="text-subtitle-1">草稿箱</p>
          <v-divider></v-divider>
          <template v-for="(item, index) in advanceActives">
            <v-list-item
              three-line
              :key="item.id"
              @click="handleDetail(item.id)"
            >
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
                <v-list-item-subtitle class="my-ellipsis">{{
                  item.content
                }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-list-item-action-text>{{
                  item.start_time
                }}</v-list-item-action-text>
                <div>
                  <v-btn color="primary" @click="editActive(item.id)"
                    >编辑</v-btn
                  >
                  <v-btn class="ml-3" color="primary" @click="publish(item.id)"
                    >发布</v-btn
                  >
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
  fetchLeaderActives,
  fetchPublishAdvance,
} from "../../api/active";
import moment from "moment";
export default {
  name: "Todo",
  data() {
    return {
      advanceActives: [],
      doneActives: [],
      userInfo: { role: { id: null } },
      total: 0,
      page_size: 1,
      loading: false,
    };
  },
  inject: ["changeLoading"],
  methods: {
    editActive(id) {
      this.$router.push("/person/publish?act_id=" + id);
    },
    editPubActive(id) {
      this.$router.push(`/person/publish?act_id=${id}&type=done`);
    },
    async changePage(e) {
      this.loading = true;
      const res = await fetchLeaderActives({
        leader_id: this.userInfo.id,
        current_page: e,
        page_size: 4,
      });
      if (res.code === 200) {
        res.data.act.forEach((item) => {
          item.start_time = moment(parseInt(item.start_time)).format(
            "YYYY-MM-DD hh:mm"
          );
        });
        this.doneActives = res.data.act;
      }
      this.loading = false;
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
    async getLists() {
      this.changeLoading(true);
      const userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
      this.userInfo = userInfo;
      if (userInfo.role.id === 3 || userInfo.role.id === 2) {
        const myLists = await Promise.all([
          fetchAdvActivesByLeader(),
          fetchLeaderActives({
            leader_id: this.userInfo.id,
            current_page: 0,
            page_size: 4,
          }),
        ]);
        if (myLists[0].code === 200) {
          myLists[0].data.forEach((item) => {
            item.start_time = moment(parseInt(item.start_time)).format(
              "YYYY-MM-DD hh:mm"
            );
          });
          myLists[1].data.act.forEach((item) => {
            item.start_time = moment(parseInt(item.start_time)).format(
              "YYYY-MM-DD hh:mm"
            );
          });
          this.advanceActives = myLists[0].data;
          this.doneActives = myLists[1].data.act;
          this.total = myLists[1].data.total;
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
  position: relative;
  .col-md-6,
  .col-md-12 {
    padding: 0 12px;
  }
  .adv-act {
    min-height: 500px;
    // max-height: 500px;
    // overflow-y: scroll;
  }
  .my-ellipsis {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    //   white-space: nowrap !important;
    -webkit-line-clamp: 1 !important;
  }
  .pag-posi {
    width: 100%;
    position: absolute;
    bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>