<template>
  <div>
    <v-dialog v-model="updateDialog" max-width="500px">
      <v-card>
        <v-card-title class="headline">添加权限</v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="roleName"
                  :rules="roleNameRules"
                  :counter="10"
                  label="角色名称"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="roleValue"
                  :rules="roleValueRules"
                  :counter="10"
                  label="权限值"
                  required
                ></v-text-field>
              </v-col>
              <v-treeview
                v-model="treeInfo"
                return-object
                selectable
                item-disabled="locked"
                open-all
                :items="treeItems"
              ></v-treeview>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="cancel">取消</v-btn>
          <v-btn color="red darken-1" text @click="submitUpdate">确定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-btn color="primary" class="mb-3" @click="updateRole(null, 'create')"
      >创建权限</v-btn
    >
    <v-data-table
      :headers="headers"
      hide-default-footer
      :items="desserts"
      class="elevation-1"
    >
      <template #item.num="{ index }">{{ index + 1 }}</template>
      <template #item.actions="{ item }">
        <v-icon small class="mr-2" @click="updateRole(item, 'update')"
          >mdi-pencil</v-icon
        >
      </template>
    </v-data-table>
  </div>
</template>
<script>
import menuData from "../../utils/treeData.js";
import {
  fetchCreateRole,
  fetchRoles,
  fetchUpdateRole,
} from "../../api/role.js";
import moment from "moment";
export default {
  data() {
    return {
      valid: true,
      form: null,
      treeInfo: [],
      headers: [
        {
          text: "序号",
          align: "start",
          sortable: false,
          value: "num",
        },
        {
          text: "权限名",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "权限值", value: "value" },
        { text: "权限创建时间", value: "create_time" },
        { text: "操作", value: "actions", sortable: false, align: "center" },
      ],
      desserts: [],
      updateDialog: false,
      roleName: "",
      roleValue: "",
      roleNameRules: [
        (v) => !!v || "roleName is required",
        (v) => v.length <= 10 || "Name must be less than 10 characters",
      ],
      roleValueRules: [(v) => !!v || "roleValue is required"],
      treeItems: [],
      type: "create",
      curId: null,
    };
  },
  methods: {
    async updateRole(item, type) {
      this.updateDialog = true;
      this.type = type;
      if (type === "create") {
        this.resetForm();
        return;
      }
      this.curId = item.id;
      this.roleName = item.name;
      this.roleValue = item.value;
      this.treeInfo = JSON.parse(item.role_menu) || [];
    },
    resetForm() {
      this.$refs.form.reset();
      this.treeInfo = [];
    },
    async submitUpdate() {
      if (this.$refs.form.validate()) {
        if (this.type === "update") {
          const res = await fetchUpdateRole({
            id: this.curId,
            name: this.roleName,
            value: this.roleValue,
            role_menu: JSON.stringify(this.treeInfo),
          });
          if (res.code === 200) {
            this.$message({
              type: "success",
              message: "修改成功",
              duration: 2000,
            });
          }
          this.updateDialog = false;
          return;
        }
        const { roleName, roleValue, treeInfo } = this;
        const res = await fetchCreateRole({
          name: roleName,
          value: roleValue,
          role_menu: JSON.stringify(treeInfo),
        });
        console.log(res);

        this.updateDialog = false;
      }
    },
    cancel() {
      this.resetForm();
      this.updateDialog = false;
    },
  },
  async created() {
    const res = await fetchRoles();
    res.data.forEach((item) => {
      item.create_time = moment(item.create_time).format("YYYY-MM-DD HH:mm");
    });
    this.desserts = res.data;
    this.treeItems = menuData;
  },
};
</script>