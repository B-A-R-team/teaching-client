<template>
  <v-card>
    <v-card-title>
      用户列表
      <v-spacer />
      <v-btn class="primary" @click="newItem">添加用户</v-btn>
    </v-card-title>
    <div class="px-3 pb-2">
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="搜索"
        single-line
        hide-details
        outlined
        dense
      ></v-text-field>
    </div>
    <v-dialog v-model="dialogNewAndEdit" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">修改</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="user.job_id" label="工号"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="user.name" label="姓名"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="user.phone" label="电话"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="user.role_name"
                  label="角色"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="user.room_name"
                  label="教研室"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeNewAndEdit">
            取消
          </v-btn>
          <v-btn color="blue darken-1" text @click="saveNewAndEdit">
            保存
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
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
      user: {
        job_id: '',
        name: '',
        phone: '',
        role_name: '',
        room_name: '',
      },
      totalUser: 0,
      users: [],
      dialogDelete: false,
      dialogNewAndEdit: false,
      loading: false,
      options: {},
    };
  },
  methods: {
    async getUser(page, pageSize) {
      this.loading = true;
      const { data: users } = await fetchUserList(page, pageSize);

      this.users = users;
      this.totalUser = users.length;

      this.loading = false;
    },
    closeDelete() {
      this.dialogDelete = false;
    },
    deleteItem() {
      this.dialogDelete = true;
    },
    deleteItemConfirm() {},
    editItem() {
      this.dialogNewAndEdit = true;
    },
    newItem() {
      this.dialogNewAndEdit = true;
    },
    closeNewAndEdit() {
      this.dialogNewAndEdit = false;
    },
    saveNewAndEdit() {
      this.dialogNewAndEdit = false;
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
