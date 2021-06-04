<template>
  <v-row justify="space-between" class="pa-2 my-publish">
    <v-col lg="6" md="6" sm="12" :xs="12">
      <v-card elevation="0" class="ml-2">
        <v-card-title>
          <h4>发布活动</h4>
        </v-card-title>
        <v-form ref="form" lazy-validation class="pa-5">
          <v-text-field
            v-model="active.title"
            :counter="40"
            :rules="titleRules"
            prepend-icon="mdi-format-title"
            label="主题"
            required
          ></v-text-field>
          <v-text-field
            v-model="active.place"
            :counter="20"
            :rules="placeRules"
            prepend-icon="mdi-home-city"
            label="活动地点"
            required
          ></v-text-field>
          <div>
            <v-row>
              <v-col md="6">
                <v-menu
                  ref="dateMenu"
                  v-model="dateMenu"
                  :close-on-content-click="false"
                  :return-value.sync="date"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      :disabled="isDisabled"
                      v-model="dateRangeText"
                      label="活动日期"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="date"
                    no-title
                    scrollable
                    :allowed-dates="allowedDate"
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="dateMenu = false"
                      >取消</v-btn
                    >
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.dateMenu.save(date)"
                      >确定</v-btn
                    >
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="6" sm="5">
                <v-menu
                  ref="timeMenu"
                  v-model="timeMenu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="time"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      :disabled="isDisabled"
                      v-model="time"
                      label="选择时间"
                      prepend-icon="mdi-clock-time-four-outline"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="timeMenu"
                    v-model="time"
                    full-width
                    @click:minute="$refs.timeMenu.save(time)"
                  ></v-time-picker>
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
        <v-card-title>
          <h4>选择参与教师</h4>
        </v-card-title>
        <div class="pa-5 my-checkbox" style="min-height: 250px">
          <template v-for="item in all_users">
            <v-checkbox
              :key="item.id"
              v-model="active.selected"
              :label="item.name"
              :value="
                JSON.stringify({
                  user_id: item.id,
                  name: item.name,
                })
              "
            ></v-checkbox>
          </template>
        </div>
      </v-card>
    </v-col>
    <div>
      <v-btn
        @click="saveToDraft"
        color="primary"
        class="mr-4 mb-3 ml-6"
        v-if="isNotDone"
        >保存草稿</v-btn
      >
      <v-btn
        @click="saveAndPublish"
        color="primary"
        :class="['mr-4', 'mb-3', isNotDone ? '' : 'ml-10']"
        >发布</v-btn
      >
    </div>
  </v-row>
</template>
<script>
import moment from "moment";
import { fetchAllUserByRommId } from "../../api/user";
import {
  fetchAdvancePublish,
  fetchActiveDetail,
  fetchUpdateActive,
} from "../../api/active";
export default {
  data() {
    return {
      isDisabled: false,
      isNotDone: true,
      date: "",
      dateMenu: false,
      time: null,
      timeMenu: false,
      active: {
        title: "",
        content: "",
        selected: [],
        place: "",
      },
      titleRules: [
        (v) => !!v || "标题不能为空",
        (v) => (v && v.length <= 40) || "标题不能超过40个字符",
      ],
      contentRules: [
        (v) => !!v || "内容不能为空",
        (v) => (v && v.length <= 300) || "内容不能超过300个字符",
      ],
      placeRules: [
        (v) => !!v || "内容不能为空",
        (v) => (v && v.length <= 20) || "地点不能超过20个字符",
      ],
      all_users: [],
      leaderInfo: {},
      act_id: null,
    };
  },
  inject: ["changeLoading"],
  computed: {
    dateRangeText() {
      return this.date;
    },
  },
  methods: {
    allowedDate: (val) => {
      return Date.parse(val) > Date.now() - 8.64e7;
    },
    async saveToDraft() {
      this.$refs.form.validate();
      if (this.$refs.form.validate() && this.date.length > 0) {
        const room_id = this.leaderInfo.room.id;
        const leader_id = this.leaderInfo.id;
        const { title, content, selected, place } = this.active;
        let join_users = [...selected].map((item) => JSON.parse(item));
        const data = {
          title,
          content,
          room_id,
          advance: 0,
          place,
          leader_id,
          start_time: moment(this.date + ` ${this.time}`)._d.getTime(),
          join_users: JSON.stringify(join_users),
        };
        if (this.act_id) {
          data.id = this.act_id;
          const res = await fetchUpdateActive(data);
          if (res.code === 200) {
            this.$message({
              type: "success",
              message: res.data.msg,
              duration: 2000,
            });
            this.$router.go(-1);
          }
          return;
        }
        const res = await fetchAdvancePublish(data);
        if (res.code === 200 && res.data.id) {
          this.$message({
            type: "success",
            message: "保存成功",
            duration: 2000,
          });
          this.$router.replace("/person/todo");
        }
      }
    },
    async saveAndPublish() {
      this.$refs.form.validate();
      if (this.$refs.form.validate() && this.date.length > 0) {
        const room_id = this.leaderInfo.room.id;
        const leader_id = this.leaderInfo.id;
        const { title, content, selected, place } = this.active;
        let join_users = [...selected].map((item) => JSON.parse(item));
        const data = {
          title,
          content,
          room_id,
          advance: 1,
          place,
          leader_id,
          start_time: moment(this.date + ` ${this.time}`)._d.getTime(),
          join_users: JSON.stringify(join_users),
        };
        if (this.act_id) {
          data.id = this.act_id;
          const res = await fetchUpdateActive(data);
          if (res.code === 200) {
            this.$message({
              type: "success",
              message: res.data.msg,
              duration: 2000,
            });
            this.$router.replace("/person");
          }
          return;
        }
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
  async created() {
    const { act_id, type } = this.$route.query;
    if (type) {
      this.isNotDone = false;
    }
    this.act_id = act_id;
    this.changeLoading(true);
    const userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
    this.leaderInfo = userInfo;
    if (userInfo.room && userInfo.room.id) {
      const res = await fetchAllUserByRommId(userInfo.room.id);
      if (res.code === 200) {
        this.all_users = res.data;
      }
    }
    if (act_id) {
      const res = await fetchActiveDetail(act_id);
      if (res.code === 200) {
        let { title, content, start_time, join_users, place } = res.data;
        join_users = JSON.parse(join_users || "[]");
        let oldJoinUsers = [];
        join_users.forEach((item) => {
          if (this.all_users.some((allItem) => allItem.id === item.user_id)) {
            oldJoinUsers.push(item);
          }
        });
        this.active.content = content;
        this.active.place = place;
        this.active.title = title;
        const dateArr = start_time.split(" ");
        this.date = dateArr[0];
        this.time = dateArr[1].substring(0, 5);
        this.active.selected = oldJoinUsers.map((item) =>
          JSON.stringify({
            user_id: item.user_id,
            name: item.name,
          })
        );
      }
      const oldTime = moment(this.date + ` ${this.time}`)._d.getTime();
      if (oldTime < Date.now() && type) {
        this.isDisabled = true;
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