<template>
  <v-container class="room-detail">
    <v-row>
      <v-col cols="6">
        <h2 class="text-h6">
          {{ info.name }}
        </h2>
      </v-col>
      <v-col cols="6" class="text-end">
        <v-btn color="primary">添加新成员</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">主任：{{ info.director_name || "暂无" }}</v-col>
      <v-col cols="4">副主任：{{ info.f_director_name || "暂无" }}</v-col>
      <v-col cols="4">人数：{{ info.people_count || 0 }}</v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card outlined>
          <v-card-title>
            <v-row>
              <v-col class="text-subtitle-2 user-title" cols="8">
                成员名单
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="搜索"
                  single-line
                  hide-details
                  dense
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :loading="user_loading"
            :search="search"
            :items="users"
            :items-per-page="5"
            :footer-props="{
              'items-per-page-options': [5, 10, 15],
            }"
          >
            <template v-slot:[`item.avatar`]="{ item }">
              <v-avatar tile>
                <img
                  v-if="item.avatar"
                  :src="renderAvatar(item.avatar)"
                  :alt="item.name"
                />
                <span v-else>暂无</span>
              </v-avatar>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card outlined>
          <v-card-title class="text-subtitle-2">相关活动</v-card-title>
          <v-data-table
            :headers="actives_header"
            :items="actives"
            :loading="active_loading"
            :items-per-page="5"
            :footer-props="{
              'items-per-page-options': [5, 10, 15],
            }"
          >
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="headline">
          你确定要将该成员从此教研室中移除吗？
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="closeDelete">取消</v-btn>
          <v-btn color="red darken-1" text @click="deleteConfirm"> 确定 </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { fetchDeleteUser, fetchRoomById } from "../../api/room";
import { fetchAllUserByRommId } from "../../api/user";
import { fetchActiveByRoomId } from "../../api/active";
import getImgFullPath from "../../utils/getImgFullPath";

export default {
  data() {
    return {
      id: -1,
      info: {},
      users: [],
      actives: [],
      search: "",
      user_loading: true,
      active_loading: true,
      headers: [
        { text: "头像", value: "avatar", align: "start", sortable: false },
        { text: "工号", value: "job_id", align: "start" },
        { text: "姓名", value: "name", sortable: false },
        { text: "电话", value: "phone", sortable: false },
        { text: "职位", value: "role_name", sortable: false },
        { text: "教研室", value: "room_name", sortable: false },
        { text: "操作", value: "actions", sortable: false },
      ],
      actives_header: [
        { text: "活动名称", value: "title", sortable: false },
        { text: "开始时间", value: "start_time" },
        { text: "结束时间", value: "end_time" },
      ],
      dialogDelete: false,
      selectedUser: -1,
    };
  },
  methods: {
    async getRoomInfo() {
      const { data } = await fetchRoomById(this.id);
      this.info = data[0];
    },
    async getUsers() {
      this.user_loading = true;
      const { data } = await fetchAllUserByRommId(this.id);
      this.users = data;
      this.user_loading = false;
    },
    async getActives() {
      this.active_loading = true;
      const { code, data } = await fetchActiveByRoomId(this.id);
      if (code === 200) {
        this.actives = data.length ? data : [];
      }
      this.active_loading = false;
    },
    renderAvatar(avatar_url) {
      return getImgFullPath(avatar_url);
    },
    closeDelete() {
      this.dialogDelete = false;
    },
    deleteItem(item) {
      this.dialogDelete = true;
      this.selectedUser = item.id;
    },
    async deleteConfirm() {
      const { code } = await fetchDeleteUser(this.id, this.selectedUser);
      if (code === 200) {
        this.$message({
          type: "success",
          message: "移除成功",
        });
        this.closeDelete();
        this.getUsers();
      }
    },
  },
  mounted() {
    const myUserInfo = JSON.parse(window.localStorage.getItem("userInfo"));
    if (myUserInfo.room) {
      this.id = myUserInfo.room.id;
    } else {
      this.id = -1;
    }
    this.getRoomInfo();
    this.getUsers();
    this.getActives();
  },
};
</script>

<style lang="scss">
input {
  -webkit-box-shadow: none;
}
.room-detail {
  .user-title {
    display: flex;
    align-items: center;
  }
}
</style>
