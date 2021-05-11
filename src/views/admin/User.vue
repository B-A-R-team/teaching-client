<template>
  <v-card>
    <v-card-title>
      <v-row>
        <v-col cols="11">
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
        <v-col cols="1">
          <v-btn @click="handleSearch">搜索</v-btn>
        </v-col>
      </v-row>
    </v-card-title>
 
    <v-dialog v-model="dialogChangeRoom" max-width="500px">
      <v-card>
        <v-card-title class="headline">修改所在教研室</v-card-title>
        <v-card-text>
          <v-select
            :loading="selectLoading"
            label="选择新的教研室"
            v-model="selectedRoom"
            :items="rooms"
            item-value="id"
            item-text="name"
            :no-data-text="selectText"
          ></v-select>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="closeDialog">取消</v-btn>
          <v-btn color="red darken-1" text @click="createConfirm">
            确定
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-data-table
      :headers="headers"
      :items="users"
      :loading="loading"
      :server-items-length="totalUser"
      :options.sync="options"
      :footer-props="{
        'items-per-page-options': [5, 10, 15],
      }"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="changeRoom(item)">
          mdi-pencil
        </v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { fetchUserList } from '@/api/user';
import { fetchUserFuzzyQuery } from '../../api/user';
import { fetchRoomList, fetchAddUser } from '../../api/room';

export default {
  data() {
    return {
      search: '',
      headers: [
        { text: '工号', value: 'job_id', align: 'start' },
        { text: '姓名', value: 'name', sortable: false },
        { text: '电话', value: 'phone', sortable: false },
        { text: '职位', value: 'role_name', sortable: false },
        { text: '教研室', value: 'room_name', sortable: false },
        { text: '操作', value: 'actions', sortable: false, align: 'center' },
      ],
      totalUser: 0,
      users: [],
      dialogDelete: false,
      loading: false,
      options: {},
      dialogChangeRoom: false,
      rooms: [],
      selectLoading: true,
      selectText: '加载中...',
      selectedRoom: -1,
      selectedUser: -1,
    };
  },
  methods: {
    async getUser(page, pageSize) {
      this.loading = true;
      const { data } = await fetchUserList(page, pageSize);

      this.users = data.users;
      this.totalUser = data.length;

      this.loading = false;
    },
    async handleSearch() {
      if (!this.search) {
        const { page, itemsPerPage } = this.options;
        this.getUser(page - 1, itemsPerPage);
        return;
      }
      const { data } = await fetchUserFuzzyQuery(this.search);
      this.totalUser = data.length;
      this.users = data;
    },
    async changeRoom(item) {
      this.selectedUser = item.id;
      this.dialogChangeRoom = true;
      this.selectLoading = true;
      this.selectText = '加载中...';
      const { data } = await fetchRoomList(0, 9999);
      this.rooms = data.rooms;
      if (data.length === 0) {
        this.selectText = '暂无数据';
      }
      this.selectLoading = false;
    },
    closeDialog() {
      this.dialogChangeRoom = false;
    },
    async createConfirm() {
      const { code } = await fetchAddUser(this.selectedRoom, this.selectedUser);
      if (code === 200) {
        this.$message({
          type: 'success',
          message: '修改成功',
        });
        this.closeDialog();

        const { page, itemsPerPage } = this.options;
        this.getUser(page - 1, itemsPerPage);
      }
    },
  },
  watch: {
    options: {
      handler() {
        const { page, itemsPerPage } = this.options;

        this.getUser(page - 1, itemsPerPage);
      },
      deep: true,
    },
  },
  mounted() {
    this.getUser();
  },
};
</script>

<style>
/* Chrome会给input一个默认的白色样式，使用此方法取消 */

input {
  -webkit-box-shadow: none;
}
</style>
