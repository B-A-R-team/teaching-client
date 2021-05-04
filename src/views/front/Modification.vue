<template>
  <v-container>
    <v-row>
      <v-col md="6" sm="12">
        <v-card class="mesBox" elevation="0" style="padding: 15px">
          <v-card-title>
            <h3>个人信息修改</h3>
          </v-card-title>
          <div class="listBox mx-auto">
            <v-list class="meslist">
              <v-list-item>
                <label>头像：</label>
                <v-avatar
                  style="border: 1px solid rgb(182 228 255) !important"
                  rounded="circle"
                  class="avater"
                  color="primary"
                  size="60"
                  @click="updateAvt"
                >
                  <img :src="renderImg(myUserInfo.avatar)" />
                </v-avatar>
              </v-list-item>
              <v-list-item>
                <label>姓名：</label>
                <span>{{ myUserInfo.name }}</span>
              </v-list-item>
              <v-list-item>
                <div>
                  <div class="fl">
                    <label>工号：</label>
                    <span>{{ myUserInfo.job_id }}</span>
                  </div>
                </div>
              </v-list-item>
              <v-list-item>
                <label>性别：</label>

                <v-radio-group row v-model="myUserInfo.gender">
                  <v-radio :value="0" label="男"></v-radio>
                  <v-radio :value="1" label="女"></v-radio>
                </v-radio-group>
              </v-list-item>
              <v-list-item>
                <label>电话：</label>
                <v-text-field
                  label="PhoneNumber"
                  v-model="myUserInfo.phone"
                ></v-text-field>
              </v-list-item>
              <v-list-item>
                <v-btn class="btn" elevation="2" large medium @click="upDateMes"
                  >修改</v-btn
                >
              </v-list-item>
            </v-list>
          </div>
        </v-card>
      </v-col>
      <v-col md="6" sm="12">
        <v-card class="mesBox" elevation="0" style="padding: 15px">
          <v-card-title>
            <h3 >修改密码</h3>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { request } from "@/utils";
import { fetchUploadAvatar } from "../../api/user";
import { getImgFullPath } from "../../utils";
export default {
  data() {
    return {
      myUserInfo: {},
      avatarFile: null,
    };
  },
  inject: ["changeLoginState"],
  created() {
    this.getUserMessage();
  },
  methods: {
    getUserMessage() {
      this.myUserInfo = JSON.parse(
        window.localStorage.getItem("userInfo") || "{}"
      );
    },
    async upDateMes() {
      const { id, phone, gender, avatar } = this.myUserInfo;
      this.myUserInfo.phone = phone;
      this.myUserInfo.gender = gender;
      let avatarPath = avatar;
      if (this.avatarFile) {
        const formData = new FormData();
        formData.append("file", this.avatarFile);
        const avatarInfo = await fetchUploadAvatar(formData);
        this.myUserInfo.avatar = avatarInfo.data.filePath;
        avatarPath = avatarInfo.data.filePath;
      }

      const res = await request({
        url: "/user/update",
        method: "put",
        data: { id, phone, gender, avatar: avatarPath },
      });
      if (res.code === 200 && res.data.msg) {
        //更新localStorage中数据
        window.localStorage.setItem(
          "userInfo",
          JSON.stringify(this.myUserInfo)
        );
        //更新登录状态
        this.changeLoginState();
        return this.$message({
          type: "success",
          message: res.data.msg,
          duration: 2000,
        });
      } else {
        return this.$message({
          type: "error",
          message: "更新失败",
          duration: 2000,
        });
      }
    },
    updateAvt() {
      //创建input
      const upload = document.createElement("input");
      //设置type为file
      upload.type = "file";
      //类型
      upload.accept = "image/png, image/jpeg,image/jpg,image/ico";
      //添加onchange事件
      upload.onchange = this.setFile;
      //模拟点击
      upload.click();
    },
    renderImg(filePath) {
      return getImgFullPath(filePath);
    },
    setFile(e) {
      //获取文件
      const file = e.path[0].files[0];
      this.avatarFile = file;
    },
  },
};
</script>

<style lang="scss">
.mesBox {
  margin: 0 auto;
  background: url(https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg);
  background-size: 100%;
  .listBox {
    .btn {
      width: 100%;
      margin: 15px auto;
      background-color: #40a9ff;
      color: #fff;
    }
  }
}
</style>