<template>
  <v-container class="active-detail">
    <v-row justify="center">
      <v-col :lg="10" :md="12" :sm="12">
        <v-card :loading="detailLoading">
          <v-card-title class="white--text mt-5">
            <div class="leader-info">
              <div class="font-weight-bold ml-1 mb-2 title active-title">
                主题： {{ activeDetail.title }}
              </div>
              <div class="room-info">
                <div class="ml-4 grey--text subtitle-2">
                  教研室：{{ activeDetail.room_name }}
                </div>
                  <div class="ml-4 mb-1 grey--text subtitle-2">
                  主任：{{ activeDetail.leader.name }}
                </div>
                <span class="ml-4 grey--text subtitle-2">开始时间：{{
                  activeDetail.start_time.substring(0, 16)
                }}</span>
              </div>
            </div>
          </v-card-title>

          <v-card-text>
            <v-row>
              <v-col :lg="12" :md="12" :sm="12">
                <v-divider></v-divider>
                <div class="font-weight-bold ml-1 mb-2 title mt-3">
                  地点： {{ activeDetail.place }}
                </div>
                <v-divider></v-divider>
                <div
                  class="font-weight-bold ml-1 mb-2 title mt-3"
                  :style="{ minHeight: '250px' }"
                >
                  <span>活动说明：{{ activeDetail.content }}</span>
                </div>
                <v-divider></v-divider>

                <div class="font-weight-bold ml-1 mb-2 subtitle mt-3">
                  参加教师：
                  <span
                    v-for="(item, index) in activeDetail.join_users"
                    :key="index"
                  >
                    {{ item.name }}
                    <span v-if="activeDetail.join_users.length - 1 > index"
                      >,</span
                    >
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
                      class="grey lighten-2 img-item"
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
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col :lg="10" :md="12" :sm="12">
        <v-card class="pa-5 content-max-height">
          <div class="font-weight-bold mb-2 title mb-2">活动记录</div>
          <v-divider />
          <div
            v-if="comments.length <= 0"
            :style="{
              display: 'flex',
              width: '100%',
              height: '80%',
              justifyContent: 'center',
              alignItems: 'center',
            }"
          >
            <span class="mb-5 subtitle-1">暂无活动记录</span>
          </div>
          <div v-for="(item, index) in comments" :key="index">
            <div class="mt-3 mb-3">
              <div class="commit-head">
                <div>
                  <v-avatar class="ml-3" size="40">
                    <img alt="user" :src="renderImg(item.user.avatar)" />
                  </v-avatar>
                  <span class="ml-4">{{ item.user.name }}</span>
                </div>
                <span class="ml-3 grey--text subtitle-2">
                  {{ item.create_time }}
                </span>
              </div>
              <div class="px-8 py-2">
                <span class="ml-9" v-html="item.content"></span>
              </div>
            </div>
            <v-divider />
          </div>
        </v-card>
      </v-col>
      <v-col :lg="10" :md="12" :sm="12">
        <v-card elevation="2" :loading="commentsLoading">
          <template v-if="current_user_info && token">
            <template v-if="isInCurrentAct">
              <div class="commit-record ml-2">
                <v-avatar size="50">
                  <img alt="user" :src="renderImg(current_user_info.avatar)" />
                </v-avatar>
                <div class="commit-editor ml-2 mb-2">
                  <editor @change="editorChange" :isClear="isClear" />
                </div>
              </div>
              <div style="text-align: right">
                <v-btn
                  class="mb-2 mr-2"
                  depressed
                  color="primary"
                  @click="submitComment"
                  >提交</v-btn
                >
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
                    <v-chip small label color="primary">{{ text }}</v-chip>
                  </template>
                </v-file-input>
                <v-btn
                  class="mr-2 mb-2"
                  depressed
                  color="primary"
                  @click="submitFile"
                  >上传</v-btn
                >
              </div>
              <v-divider></v-divider>
            </template>
            <template v-else>
              <div class="detail-login">
                您不是参加这个活动的老师，不能发表记录
              </div>
            </template>
          </template>
          <div v-else class="detail-login">
            <v-btn color="primary" @click="login">请先登录，在发表评论</v-btn>
          </div>
          <v-divider></v-divider>
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
import { getToken } from "../../utils/auth";
import getImgFullPath from "../../utils/getImgFullPath";
import Editor from "../../components/Editor.vue";
export default {
  data() {
    return {
      isClear: false,
      detailLoading: true,
      commentsLoading: true,
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
        join_users: [],
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
      token: null,
    };
  },
  components: {
    Editor,
  },
  methods: {
    editorChange(e) {
      this.commit.content = e;
    },
    renderImg(filePath) {
      return getImgFullPath(filePath);
    },
    async getActiveDetail(id) {
      const res = await fetchActiveDetail(id);
      let join_users = JSON.parse(res.data.join_users);
      if (res.code === 200) {
        this.activeDetail = res.data;
        this.activeDetail.join_users = join_users;
        this.detailLoading = false;
      }
    },
    async getComments(id) {
      const res = await fetchCommentsByActiveId(id);
      if (res.code === 200) {
        this.comments = res.data;
        this.commentsLoading = false;
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
      this.isClear = true;
    },
  },
  mounted() {
    this.getActiveDetail(this.$route.query.act_id);
    this.getComments(this.$route.query.act_id);
    const userInfo = window.localStorage.getItem("userInfo");
    this.current_user_info = JSON.parse(userInfo);
    this.token = getToken();
  },
  computed: {
    isInCurrentAct() {
      return this.activeDetail.join_users.some(
        (item) => this.current_user_info.id === item.user_id
      );
    },
  },
};
</script>
<style lang="scss">
.content-max-height {
  height: 100%;
   min-height: 300px;
  max-height: 900px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 4px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 4px;
  }
  &::-webkit-scrollbar:hover {
    width: 10px;
    height: 10px;
  }
  &::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 6px rgb(104, 104, 104);
    background: rgba(255, 255, 255, 0.2);
  }

  &::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 6px rgb(216, 211, 211);
    border-radius: 0;
  }
}
p {
  margin: 0 !important;
}
.active-detail {
  .leader-info {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    text-align: left;
    .room-info {
      display: flex;
    }
  }
  .active-title {
    font-size: 24px !important;
    color: #000;
  }
  .commit-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .record-imgs {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, 150px);
    grid-row-gap: 20px;
    grid-column-gap: 20px;
    // grid-template-rows: repeat(auto-fill, 100px);
    .img-item {
      max-height: 200px;
      max-width: 200px;
      cursor: pointer;
    }
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