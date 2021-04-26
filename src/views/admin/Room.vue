<template>
  <div>
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
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small @click="deleteItem(item)">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      headers: [
        { text: '名称', value: 'name', sortable: false },
        { text: '主任', value: 'director_name', sortable: false },
        { text: '副主任', value: 'f_director_name', sortable: false },
        { text: '人数', value: 'count', sortable: false },
        { text: '操作', value: 'actions', sortable: false },
      ],
      total: 0,
      rooms: [
        {
          name: '前端',
          director_name: '人',
          f_director_name: '不是人',
          count: 10,
        },
        {
          name: '前端',
          director_name: '人',
          f_director_name: '不是人',
          count: 10,
        },
        {
          name: '前端',
          director_name: '人',
          f_director_name: '不是人',
          count: 10,
        },
        {
          name: '前端',
          director_name: '人',
          f_director_name: '不是人',
          count: 10,
        },
      ],
      dialogDelete: false,
      loading: false,
      options: {},
    };
  },
  methods: {
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
        // const { page, itemsPerPage } = this.options;
      },
      deep: true,
    },
  },
  mounted() {
    this.total = this.rooms.length;
  },
};
</script>

<style>
input {
  -webkit-box-shadow: none;
}
</style>
