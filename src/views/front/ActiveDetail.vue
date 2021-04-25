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
                <img alt="user" :src="BASE_URL + activeDetail.leader.avatar" />
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
                  src="https://picsum.photos/350/165?random"
                  lazy-src="https://picsum.photos/id/11/10/6"
                  aspect-ratio="1"
                  class="grey lighten-2"
                  v-for="item in 7"
                  :key="item"
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
                <p class="ml-16" :style="{ textIndent: '1rem' }">
                  <a>关于营造美丽安师.txt</a> --- 张三
                </p>
                <p class="ml-16" :style="{ textIndent: '1rem' }">
                  <a>关于营造美丽安师.txt</a> --- 张三
                </p>
                <p class="ml-16" :style="{ textIndent: '1rem' }">
                  <a>关于营造美丽安师.txt</a> --- 张三
                </p>
                <p class="ml-16" :style="{ textIndent: '1rem' }">
                  <a>关于营造美丽安师.txt</a> --- 张三
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
          <div class="commit-record ml-2 mr-2">
            <v-avatar size="50">
              <img
                alt="user"
                src="https://cdn.pixabay.com/photo/2020/06/24/19/12/cabbage-5337431_1280.jpg"
              />
            </v-avatar>
            <div class="commit-editor ml-2">
              <v-textarea
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
          <v-file-input
            class="ml-14 mr-4"
            label="点击选择文件"
            placeholder="上传你的文件"
            show-size
            chips
            multiple
            prepend-icon="mdi-paperclip"
          >
            <template v-slot:selection="{ text }">
              <v-chip small label color="primary">
                {{ text }}
              </v-chip>
            </template>
          </v-file-input>
          <div style="text-align: right">
            <v-btn class="mb-2 mr-2" depressed color="primary"> 提交 </v-btn>
          </div>
          <v-divider></v-divider>
          <div v-for="item in 5" :key="item">
            <div class="mt-2 mb-2">
              <v-avatar class="ml-2" size="40">
                <img
                  alt="user"
                  src="https://cdn.pixabay.com/photo/2020/06/24/19/12/cabbage-5337431_1280.jpg"
                />
              </v-avatar>
              <span class="ml-4">老王：</span>
              <span class="ml-1">这次活动收获颇多~ </span>
              <span class="ml-3 grey--text subtitle-2">2021-04-21</span>
            </div>
            <v-divider />
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { fetchActiveDetail } from "../../api/active";
// eslint-disable-next-line no-unused-vars
const imgWhitelist = [
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".wbmp",
  ".webp",
  ".svg",
];
import { BASE_URL } from "../../utils/constant";
export default {
  data() {
    return {
      BASE_URL,
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
    };
  },
  methods: {
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
        console.log(this.activeDetail);
      }
    },
  },
  mounted() {
    this.getActiveDetail(this.$route.query.act_id);
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
}
</style>