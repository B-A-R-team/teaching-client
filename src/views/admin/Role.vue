<template>
    <div>
        <v-dialog v-model="updateDialog" max-width="500px">
            <v-card>
                <v-card-title class="headline">添加权限</v-card-title>
                <v-card-text>
                    <v-form>
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
                            <v-treeview v-model="treeInfo"  return-object selectable open-all :items="items"></v-treeview>
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
        <v-btn color="primary" class="mb-3" @click="updateRole(null, 'create')">创建权限</v-btn>
        <v-data-table :headers="headers" hide-default-footer :items="desserts" class="elevation-1">
            <template #item.num="{ index }">{{ index + 1 }}</template>
            <template #item.actions="{ item }">
                <v-icon small class="mr-2" @click="updateRole(item, 'update')">mdi-pencil</v-icon>
            </template>
        </v-data-table>
    </div>
</template>
<script>
import menuData from '../../utils/treeData.js'
export default {
    data() {
        return {
            treeInfo: [],
            headers: [
                {
                    text: '序号',
                    align: 'start',
                    sortable: false,
                    value: 'num',
                },
                {
                    text: '权限名',
                    align: 'start',
                    sortable: false,
                    value: 'name',
                },
                { text: '权限值', value: 'role_value' },
                { text: '权限创建时间', value: 'create_time' },
                { text: '操作', value: 'actions', sortable: false, align: 'center' },
            ],
            desserts: [
                {
                    name: '管理员',
                    role_value: 1,
                    create_time: '2020-12-1'
                },
                {
                    name: '主任',
                    role_value: 1,
                    create_time: '2020-12-1'
                },
                {
                    name: '副主任',
                    role_value: 1,
                    create_time: '2020-12-1'
                },
                {
                    name: '普通教师',
                    role_value: 1,
                    create_time: '2020-12-1'
                },
            ],
            updateDialog: false,
            roleName: '',
            roleValue: '',
            roleNameRules: [
                v => !!v || 'roleName is required',
                v => v.length <= 10 || 'Name must be less than 10 characters',
            ],
            roleValueRules: [
                v => !!v || 'roleValue is required',
                v => v.length <= 10 || 'Name must be less than 10 characters',
            ],
            items: [
                {
                    id: 1,
                    name: 'Applications :',
                    children: [
                        { id: 2, name: 'Calendar : app' },
                        { id: 3, name: 'Chrome : app' },
                        { id: 4, name: 'Webstorm : app' },
                    ],
                },
                {
                    id: 5,
                    name: 'Documents :',
                },
                {
                    id: 6,
                    name: 'Documents :',
                },
                {
                    id: 7,
                    name: 'Documents :',
                },


            ],
        }
    },
    methods: {
        updateRole(item, type) {
            this.updateDialog = true
            if (type === 'create') {
                console.log('create')
            }
            console.log(item)
        },
        submitUpdate() {
            console.log(this.treeInfo)
        },
        cancel() {
            this.updateDialog = false
        },
    },
    created() {
        this.items = menuData
    },
}
</script>