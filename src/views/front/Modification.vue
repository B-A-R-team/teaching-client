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
            <h3>修改密码</h3>
          </v-card-title>
          <v-list class="listBox">
            <v-list-item
              style="display: flex; flex-direction: column; min-height: 0"
            >
              <div
                style="
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  width: 100%;
                "
              >
                <label>原密码：</label>
                <v-text-field
                  :loading="pwdLoading"
                  type="password"
                  label="请输入旧密码"
                  v-model="allPwd.oldPwd"
                  @change="comparePwd"
                ></v-text-field>
              </div>
              <div v-if="isNotOk" style="width: 100%; color: red">
                与旧密码不一致
              </div>
            </v-list-item>
            <v-list-item>
              <label>新密码：</label>
              <v-text-field
                type="password"
                label="请输入新密码"
                v-model="allPwd.newPwd"
              ></v-text-field>
            </v-list-item>
            <v-list-item
              style="display: flex; flex-direction: column; min-height: 0"
            >
              <div
                style="
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  width: 100%;
                "
              >
                <label>确认密码：</label>
                <v-text-field
                  type="password"
                  label="请输入确认密码"
                  v-model="allPwd.okPwd"
                  @input="handleOkPwd"
                ></v-text-field>
              </div>
              <div v-if="compareOkPwd" style="width: 100%; color: red">
                两次密码不一致
              </div>
            </v-list-item>
            <v-list-item>
              <v-btn class="btn" elevation="2" style="margin-top:96px" large medium @click="updatePwd"
                >修改</v-btn
              >
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { request } from "@/utils";
import {
  fetchComparePwd,
  fetchUpdatePwd,
  fetchUploadAvatar,
} from "../../api/user";
import { getImgFullPath } from "../../utils";
export default {
  data() {
    return {
      pwdLoading: false,
      myUserInfo: {},
      avatarFile: null,
      allPwd: {
        oldPwd: "",
        newPwd: "",
        okPwd: "",
      },
      isNotOk: false,
      compareOkPwd: false,
    };
  },
  inject: ["changeLoginState", "changeLoading", "getAvatar"],
  created() {
    this.getUserMessage();
    this.changeLoading(false);
  },
  methods: {
    handleOkPwd() {
      const { allPwd } = this;
      if (allPwd.okPwd) {
        this.compareOkPwd = !(allPwd.newPwd === allPwd.okPwd);
      }
      return false;
    },
    async comparePwd() {
      this.pwdLoading = true;
      const { myUserInfo, allPwd } = this;
      if (allPwd.oldPwd) {
        const res = await fetchComparePwd({
          id: myUserInfo.id,
          password: allPwd.oldPwd,
        });
        if (res.code === 200) {
          this.isNotOk = !res.data.flag;
        }
      } else {
        this.isNotOk = false;
      }
      this.pwdLoading = false;
    },
    resetPwd() {
      this.allPwd.oldPwd = "";
      this.allPwd.newPwd = "";
      this.allPwd.okPwd = "";
    },
    async updatePwd() {
      const { allPwd, isNotOk, compareOkPwd, myUserInfo } = this;
      if (!isNotOk && allPwd.oldPwd && !compareOkPwd) {
        if (allPwd.newPwd === allPwd.okPwd && allPwd.newPwd.length > 0) {
          const res = await fetchUpdatePwd({
            id: myUserInfo.id,
            password: allPwd.okPwd,
          });
          if (res.code === 200) {
            this.resetPwd();
            this.$message({
              type: "success",
              message: res.data.msg,
              duration: 2000,
            });
          }
        }
      } else {
        this.$message({
          type: "error",
          message: "请完成上面每一步",
          duration: 2000,
        });
      }
    },
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
        this.getAvatar(avatarPath);
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
      // [1,2].forEach(()=>{})
    },
  },
};
</script>

<style lang="scss">
.mesBox {
  margin: 0 auto;
  background: url(https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg);
  background-size: 100%;
  transition: all 0.2s;
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