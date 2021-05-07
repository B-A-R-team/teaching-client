<template>
  <div>
    <v-btn color="primary" class="mb-4" @click="showCreate">
      创建新的教研室
    </v-btn>
    <v-dialog v-model="dialogCreate" max-width="500px">
      <v-card>
        <v-card-title class="headline">创建新教研室</v-card-title>
        <v-card-text>
          <v-text-field label="新教研室的名称" v-model="newRoomName" />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="closeCreate">取消</v-btn>
          <v-btn color="red darken-1" text @click="createConfirm">
            确定
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-card>
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
      <v-dialog v-model="dialogEdit" max-width="500px">
        <v-card>
          <v-card-title class="headline">修改教研室信息</v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="教研室名称"
                    v-model="editRoom.name"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-select
                    :items="users"
                    item-text="name"
                    item-value="id"
                    label="主任"
                    v-model="editRoom.director_id"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-select
                    :items="users"
                    item-text="name"
                    item-value="id"
                    v-model="editRoom.f_director_id"
                    label="副主任"
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="closeEdit">取消</v-btn>
            <v-btn color="red darken-1" text @click="editItemConfirm">
              确定
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-data-table
        :headers="headers"
        :items="rooms"
        :loading="loading"
        :server-items-length="total"
        :options.sync="options"
        :footer-props="{
          'items-per-page-text': '每页数据量',
          'items-per-page-options': [5, 10, 15],
        }"
      >
        <template v-slot:[`item.name`]="{ item }">
          <v-btn text :to="'/admin/room/detail/' + item.id" color="primary">
            {{ item.name }}
          </v-btn>
        </template>
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
  </div>
</template>

<script>
import {
  fetchEditRoom,
  fetchRoomList,
  fetchCreateRoom,
} from '../../../api/room';
import { fetchAllUserByRommId } from '../../../api/user';

export default {
  data() {
    return {
      search: '',
      headers: [
        { text: '名称', value: 'name', sortable: false },
        { text: '主任', value: 'director_name', sortable: false },
        { text: '副主任', value: 'f_director_name', sortable: false },
        { text: '操作', value: 'actions', sortable: false },
      ],
      editRoom: {
        id: -1,
        name: '',
        director_id: -1,
        f_director_id: -1,
      },
      newRoomName: '',
      total: 0,
      rooms: [],
      users: [],
      dialogDelete: false,
      dialogEdit: false,
      dialogCreate: false,
      loading: true,
      options: {},
    };
  },
  methods: {
    async getUsersByRoom(roomId) {
      const { data } = await fetchAllUserByRommId(roomId);
      this.users = data;
    },
    closeDelete() {
      this.dialogDelete = false;
    },
    deleteItem() {
      this.dialogDelete = true;
    },
    editItem(item) {
      this.dialogEdit = true;
      this.editRoom.id = item.id;
      this.editRoom.name = item.name;
      this.editRoom.director_id = item.director_id;
      this.editRoom.f_director_id = item.f_director_id;
      this.getUsersByRoom(item.id);
    },

    closeEdit() {
      this.dialogEdit = false;
    },

    deleteItemConfirm() {
      this.closeDelete();
    },
    async getRooms(page, pageSize) {
      this.loading = true;
      const { data } = await fetchRoomList(page, pageSize);

      this.rooms = data.rooms.map((room) => ({
        id: room.id,
        name: room.name,
        director_name: room.director_name || '暂无',
        f_director_name: room.f_director_name || '暂无',
        director_id: room.director_id || -1,
        f_director_id: room.f_director_id || -1,
      }));
      this.total = data.length;

      this.loading = false;
    },
    async editItemConfirm() {
      const { code, data } = await fetchEditRoom(this.editRoom);
      if (code === 200) {
        this.$message({
          type: 'success',
          message: data.msg,
        });
        this.closeEdit();

        const { page, itemsPerPage } = this.options;
        this.getRooms(page - 1, itemsPerPage);
      }
    },
    showCreate() {
      this.dialogCreate = true;
    },
    closeCreate() {
      this.dialogCreate = false;
    },
    async createConfirm() {
      const { code, data } = await fetchCreateRoom(this.newRoomName);
      if (code === 200) {
        this.$message({
          type: 'success',
          message: data.name + '创建成功',
        });
        this.closeCreate();
        
        const { page, itemsPerPage } = this.options;
        this.getRooms(page - 1, itemsPerPage);
      }
    },
  },
  watch: {
    options: {
      handler() {
        const { page, itemsPerPage } = this.options;

        this.getRooms(page - 1, itemsPerPage);
      },
      deep: true,
    },
  },
  mounted() {},
};
</script>

<style>
input {
  -webkit-box-shadow: none;
}
</style>
