<template>
  <v-row justify="space-between" class="pa-2 my-publish">
    <v-col lg="6" md="6" sm="12" :xs="12">
      <v-card elevation="0" class="ml-2">
        <v-card-title> <h4>发布活动</h4> </v-card-title>
        <v-form ref="form" lazy-validation class="pa-5">
          <v-text-field
            v-model="active.title"
            :counter="30"
            :rules="titleRules"
            prepend-icon="mdi-format-title"
            label="主题"
            required
          ></v-text-field>
          <div>
            <v-row>
              <v-col md="12">
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="dates"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="dateRangeText"
                      label="开始日期 ~ 结束日期"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="dates" no-title scrollable range>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false">
                      取消
                    </v-btn>
                    <v-btn text color="primary" @click="$refs.menu.save(dates)">
                      确定
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
          </div>
          <v-textarea
            prepend-icon="mdi-content-save-edit-outline"
            class="mt-2"
            clearable
            clear-icon="mdi-close-circle"
            label="内容"
            v-model="active.content"
            :rules="contentRules"
            no-resize
            required
          ></v-textarea>
        </v-form>
      </v-card>
    </v-col>
    <v-divider vertical></v-divider>
    <v-col lg="6" md="6" sm="12" :xs="12">
      <v-card elevation="0">
        <v-card-title> <h4>选择参与教师</h4> </v-card-title>
        <div class="pa-5 my-checkbox" style="min-height: 250px">
          <template v-for="item in all_users">
            <v-checkbox
              :key="item.id"
              v-model="active.selected"
              :label="item.name"
              :value="
                JSON.stringify({
                  user_id: item.id,
                  is_ok: false,
                  name: item.name,
                })
              "
            ></v-checkbox>
          </template>
        </div>
      </v-card>
    </v-col>
    <v-btn @click="validate" color="primary" class="mr-4 mb-3 ml-6">
      发布
    </v-btn>
  </v-row>
</template>
<script>
import moment from "moment";
import { fetchAllUserByRommId } from "../../api/user";
import { fetchAdvancePublish } from "../../api/active";
export default {
  data() {
    return {
      dates: [],
      menu: false,
      modal: false,
      menu2: false,
      active: {
        title: "",
        content: "",
        selected: [],
      },
      titleRules: [
        (v) => !!v || "标题不能为空",
        (v) => (v && v.length <= 30) || "标题不能超过30个字符",
      ],
      contentRules: [
        (v) => !!v || "内容不能为空",
        (v) => (v && v.length <= 200) || "内容不能超过200个字符",
      ],

      all_users: [],
      leaderInfo: {},
    };
  },
  inject: ["changeLoading"],
  computed: {
    dateRangeText() {
      const myDates = this.dates;
      return myDates.sort().join(" ~ ");
    },
  },
  methods: {
    async validate() {
      this.$refs.form.validate();
      if (this.$refs.form.validate() && this.dates.length === 2) {
        const room_id = this.leaderInfo.room.id;
        const leader_id = this.leaderInfo.id;
        const { title, content, selected } = this.active;
        const join_users = [...selected].map((item) => JSON.parse(item));
        const myDates = [...this.dates.sort()];
        myDates[0] += " 00:00:00";
        myDates[1] += " 23:59:59";
        const data = {
          title,
          content,
          room_id,
          leader_id,
          start_time: moment(myDates[0])._d.getTime(),
          end_time: moment(myDates[1])._d.getTime(),
          join_users: JSON.stringify(join_users),
        };
        const res = await fetchAdvancePublish(data);
        if (res.code === 200 && res.data.id) {
          this.$message({
            type: "success",
            message: "发布成功",
            duration: 2000,
          });
          this.$router.replace("/person/home");
        }
      }
    },
  },
  mounted: async function () {
    this.changeLoading(true);
    const userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
    this.leaderInfo = userInfo;
    if (userInfo.room && userInfo.room.id) {
      const res = await fetchAllUserByRommId(userInfo.room.id);
      if (res.code === 200) {
        this.all_users = res.data;
      }
    }
    this.changeLoading(false);
  },
};
</script>
<style lang="scss">
.my-publish {
  .my-checkbox {
    display: grid;
    grid-template-columns: repeat(auto-fill, 100px);
    grid-template-rows: repeat(auto-fill, 50px);
    grid-row-gap: 20px;
    grid-column-gap: 10px;
  }
}
</style>