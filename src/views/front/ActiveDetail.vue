<template>
  <v-container class="active-detail">
    <v-row justify="center">
      <v-col :lg="10" :md="12" :sm="12">
        <v-card>
          <v-img
            height="200px"
            src="https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg"
          >
            <v-app-bar flat color="rgba(0, 0, 0, 0)">
              <v-toolbar-title class="title white--text pl-0">
                活动详情
              </v-toolbar-title>
              <v-spacer></v-spacer>
            </v-app-bar>

            <v-card-title class="white--text mt-5">
              <v-avatar size="64">
                <img alt="user" :src="renderImg(activeDetail.leader.avatar)" />
              </v-avatar>
              <div class="leader-info">
                <div class="ml-3 mb-1">{{ activeDetail.leader.name }}</div>
                <div class="ml-3 grey--text subtitle-2">
                  {{ activeDetail.room_name }}
                </div>
              </div>
            </v-card-title>
          </v-img>

          <v-card-text>
            <div class="font-weight-bold ml-1 mb-2 title">
              主题： {{ activeDetail.title }}
              <span class="ml-3 grey--text subtitle-2">
                {{ activeDetail.start_time }} ~ {{ activeDetail.end_time }}
              </span>
            </div>
            <v-divider></v-divider>
            <div
              class="font-weight-bold ml-1 mb-2 title mt-3"
              :style="{ minHeight: '250px' }"
            >
              正文：
              <span>
                {{ activeDetail.content }}
              </span>
            </div>
            <v-divider></v-divider>

            <div class="font-weight-bold ml-1 mb-2 subtitle mt-3">
              参加教师：
              <span
                v-for="(item, index) in activeDetail.join_users"
                :key="index"
                >{{ item }}
                <span v-if="activeDetail.join_users.length - 1 > index">
                  ,
                </span>
              </span>
            </div>
            <v-divider></v-divider>
            <div class="font-weight-bold ml-1 mb-2 subtitle mt-3">
              记录图片：
              <div class="record-imgs">
                <v-img
                  :src="renderImg(item.filePath)"
                  lazy-src="https://picsum.photos/id/11/10/6"
                  aspect-ratio="1"
                  class="grey lighten-2"
                  v-for="(item, index) in activeDetail.record_imgs"
                  :key="index"
                >
                  <template v-slot:placeholder>
                    <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                    >
                      <v-progress-circular
                        indeterminate
                        color="grey lighten-5"
                      ></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </div>
            </div>
            <v-divider></v-divider>
            <div class="font-weight-bold ml-1 mb-2 subtitle mt-3">
              记录文件：
              <div class="files-list">
                <p
                  class="ml-16"
                  :style="{ textIndent: '1rem' }"
                  v-for="(item, index) in activeDetail.record_other"
                  :key="index"
                >
                  <a
                    :href="renderImg(item.filePath)"
                    :download="item.oldFilename"
                    >{{ item.oldFilename }}</a
                  >
                  --- {{ item.username }}
                </p>
              </div>
            </div>
            <v-divider></v-divider>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col :lg="10" :md="12" :sm="12">
        <v-card elevation="2" class="pt-2">
          <template v-if="current_user_info">
            <div class="commit-record ml-2 mr-2">
              <v-avatar size="50">
                <img
                  alt="user"
                  :src="renderImg(current_user_info.avatar)"
                />
              </v-avatar>
              <div class="commit-editor ml-2">
                <v-textarea
                  v-model="commit.content"
                  height="100"
                  no-resize
                  outlined
                  name="input-7-4"
                  label="请输入内容"
                  clearable
                  clear-icon="mdi-close-circle"
                ></v-textarea>
              </div>
            </div>
            <div style="text-align: right">
              <v-btn
                class="mb-2 mr-2"
                depressed
                color="primary"
                @click="submitComment"
              >
                提交
              </v-btn>
            </div>
            <v-divider></v-divider>
            <div class="submit-files mt-2">
              <v-file-input
                class="ml-14 mr-4"
                label="点击选择文件"
                placeholder="上传你的文件"
                show-size
                chips
                multiple
                prepend-icon="mdi-paperclip"
                v-model="file"
              >
                <template v-slot:selection="{ text }">
                  <v-chip small label color="primary">
                    {{ text }}
                  </v-chip>
                </template>
              </v-file-input>
              <v-btn
                class="mr-2 mb-2"
                depressed
                color="primary"
                @click="submitFile"
              >
                上传
              </v-btn>
            </div>
            <v-divider></v-divider>
          </template>
          <div v-else class="detail-login">
            <v-btn color="primary" @click="login">请先登录，在发表评论</v-btn>
          </div>
          <v-divider></v-divider>
          <div v-for="(item, index) in comments" :key="index">
            <div class="mt-3 mb-3">
              <v-avatar class="ml-3" size="40">
                <img alt="user" :src="renderImg(item.user.avatar)" />
              </v-avatar>
              <span class="ml-4">{{ item.user.name }}：</span>
              <span class="ml-1">{{ item.content }} </span>
              <span class="ml-3 grey--text subtitle-2">{{
                item.create_time
              }}</span>
            </div>
            <v-divider />
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import {
  fetchActiveDetail,
  fetchAddComment,
  fetchCommentsByActiveId,
  fetchAddRecordFile,
} from "../../api/active";
import getImgFullPath from "../../utils/getImgFullPath";
export default {
  data() {
    return {
      file: null,
      activeDetail: {
        title: "",
        content: "",
        leader: {
          name: "",
          id: "",
          avatar: "",
        },
        files: "",
        record_files: "",
        room_id: {},
        start_time: "",
        end_time: "",
        join_users: "",
        record_imgs: [],
        record_txt: [],
      },
      comments: [],
      commit: {
        user_id: "",
        active_id: "",
        content: "",
      },
      current_user_info: {},
    };
  },
  methods: {
    renderImg(filePath) {
      return getImgFullPath(filePath);
    },
    async getActiveDetail(id) {
      const res = await fetchActiveDetail(id);
      let join_users = JSON.parse(res.data.join_users);
      const tempArr = [];
      join_users.forEach((item) => {
        tempArr.push(item.name);
      });

      if (res.code === 200) {
        this.activeDetail = res.data;
        this.activeDetail.join_users = tempArr;
      }
    },
    async getComments(id) {
      const res = await fetchCommentsByActiveId(id);
      if (res.code === 200) {
        this.comments = res.data;
      }
    },
    async submitComment() {
      this.commit.active_id = this.activeDetail.id;
      this.commit.user_id = this.activeDetail.leader.id;
      const { active_id, content } = this.commit;
      const user_id = this.current_user_info.id;
      const res = await fetchAddComment({ active_id, content, user_id });
      if (res.code === 200) {
        this.$message({ type: "success", message: "添加成功", duration: 2000 });
        this.getComments(active_id);
      }
      this.resetForm();
    },
    async submitFile() {
      const form = new FormData();
      form.append("file", this.file[0]);
      form.append("user_id", this.current_user_info.id);
      form.append("active_id", this.activeDetail.id);
      const res = await fetchAddRecordFile(form);
      if (res.code === 200) {
        this.$message({ type: "success", message: "上传成功", duration: 2000 });
        this.getActiveDetail(this.$route.query.act_id);
        this.file = null;
      }
    },
    async login() {
      this.$router.push("/login");
    },
    async resetForm() {
      this.commit.active_id = "";
      this.commit.user_id = "";
      this.commit.content = "";
    },
  },
  mounted() {
    this.getActiveDetail(this.$route.query.act_id);
    this.getComments(this.$route.query.act_id);
    const userInfo = window.localStorage.getItem("userInfo");
    this.current_user_info = JSON.parse(userInfo);
  },
};
</script>
<style lang="scss">
.active-detail {
  .leader-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    // align-items: center;
    text-align: left;
  }
  .record-imgs {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, 150px);
    grid-row-gap: 20px;
    grid-column-gap: 20px;
    // grid-template-rows: repeat(auto-fill, 100px);
  }
  // text-indent: 1rem;
  .commit-record {
    display: flex;
    .commit-editor {
      width: 100%;
      .v-text-field__details {
        display: none;
      }
    }
  }
  .submit-files {
    display: flex;
    align-items: center;
  }
  .detail-login {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 25px;
  }
}
</style>