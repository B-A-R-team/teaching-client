<template>
  <v-card>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="搜索"
        single-line
        hide-details
        dense
      ></v-text-field>
    </v-card-title>
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="headline">你确定要删除这项数据吗？</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="closeDelete">取消</v-btn>
          <v-btn color="red darken-1" text @click="deleteItemConfirm">
            确定
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-data-table
      :headers="headers"
      :items="users"
      :search="search"
      :loading="loading"
      :server-items-length="totalUser"
      :options.sync="options"
      :footer-props="{
        'items-per-page-text': '每页数据量',
        'items-per-page-options': [5, 10, 15],
      }"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { fetchUserList } from '@/api/user';

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
        { text: '操作', value: 'actions', sortable: false },
      ],
      totalUser: 0,
      users: [],
      dialogDelete: false,
      loading: false,
      options: {},
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
    closeDelete() {
      this.dialogDelete = false;
    },
    deleteItem() {
      this.dialogDelete = true;
    },
    deleteItemConfirm() {},
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
