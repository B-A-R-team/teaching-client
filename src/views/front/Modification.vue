<template>
  <v-card class="mesBox" elevation="0">
    <v-card-title>
      <h2 class="mx-auto">个人信息修改</h2>
    </v-card-title>
    <div class="listBox mx-auto">
      <v-list class="meslist">
        <v-list-item>
          <v-avatar
            class="mt-3 mx-auto"
            color="primary"
            size="60"
            @click="updateAvt"
          >
            <img :src="imgUrl" />
          </v-avatar>
        </v-list-item>
        <v-list-item>
          <p class="name mx-auto mt-3">{{ name }}</p>
        </v-list-item>
        <v-list-item width="400px">
          <div class="unMod">
            <div class="fl">
              <label>工号：</label>
              <span>{{ job_id }}</span>
            </div>
            <div class="fr">
              <label>ID：</label>
              <span>{{ id }}</span>
            </div>
          </div>
        </v-list-item>
        <v-list-item>
          <label>性别：</label>
          <v-radio-group row mandatory v-model="gender">
            <v-radio :value="0" label="男"></v-radio>
            <v-radio :value="1" label="女"></v-radio>
          </v-radio-group>
        </v-list-item>
        <v-list-item>
          <label>电话：</label>
          <v-text-field label="PhoneNumber" v-model="phone"></v-text-field>
        </v-list-item>
      </v-list>
      <v-btn class="btn" elevation="2" large medium @click="upDateMes"
        >保存</v-btn
      >
    </div>
  </v-card>
</template>

<script>
import { getToken } from "@/utils/auth";
import { request, getImgFullPath } from "@/utils";
import { fetchUploadAvatar } from "@/api/user";
export default {
  data() {
    return {
      name: "",
      avatar: "",
      job_id: "",
      id: "",
      phone: "",
      gender:'',
      token: "",
      myUserInfo: {},
      imgUrl: "",
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
      const myUserInfo = this.myUserInfo;
      this.token = getToken("vue_teaching_token");
      this.name = myUserInfo.name;
      this.job_id = myUserInfo.job_id;
      this.avatar = myUserInfo.avatar;
      this.imgUrl = getImgFullPath(myUserInfo.avatar);
      this.phone = myUserInfo.phone;
      this.id = myUserInfo.id;
      this.gender = myUserInfo.gender;
    },
    async upDateMes() {
      const { id, phone, avatar, gender } = this;
      const res = await request({
        url: "/user/update",
        method: "put",
        data: { id, phone, avatar, gender },
      });
      console.log(res);
      if (res.code === 200 && res.data.msg) {
        this.myUserInfo.phone = phone;
        this.myUserInfo.avatar = avatar;
        this.myUserInfo.gender = gender;
        //更新localStorage中数据
        window.localStorage.setItem(
          "userInfo",
          JSON.stringify(this.myUserInfo)
        );
        //更新登录状态中的头像信息
        // this.changeLoginState();

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
      upload.accept = "image/png, image/jpeg";
      //添加onchange事件
      upload.onchange = this.setFile;
      //模拟点击
      upload.click();
    },
    async setFile(e) {
      //获取文件
      const file = e.path[0].files[0];
      console.log(file);
      const { data } = await fetchUploadAvatar(file);
      console.log(data);
      this.avatar = data.filePath;
      console.log(this.avatar);
      this.imgUrl = getImgFullPath(data.filePath);
    },
  },
};
</script>

<style lang="scss">
.mesBox {
  width: 1188px;
  height: 550px;
  padding-top: 30px;
  margin: 0 auto;
  background: url(https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg);
  background-size: 100%;
  .subheard {
    height: 48px;
    line-height: 24px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.54);
  }
  .listBox {
    width: 400px;
    .unMod {
      width: 400px;
      .fl {
        float: left;
      }
      .fr {
        float: right;
      }
    }
    .name {
      line-height: 40px;
      font-size: 20px;
    }
    .btn {
      width: 370px;
      height: 30px;
      margin: 15px 15px;
      background-color: #40a9ff;
      color: #fff;
    }
  }
}
</style>