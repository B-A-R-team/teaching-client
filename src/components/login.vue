<!--
 * @Author: lts
 * @Date: 2021-04-08 11:28:06
 * @LastEditTime: 2021-04-20 21:37:58
 * @FilePath: \teaching-client\src\components\login.vue
-->
<template>
  <v-app>
    <div class="page">
      <div class="bgImg">
        <div class="login">
          <div class="median">
            <h3>登录</h3>
            <v-text-field
              class="user"
              label="请输入工号"
              v-model="job_id"
            ></v-text-field>
            <v-text-field
              class="user"
              :type="'password'"
              label="请输入密码"
              v-model="password"
            ></v-text-field>
            <v-btn class="btn" elevation="2" large medium @click="postComment"
              >登录</v-btn
            >
            <v-btn class="btn" elevation="2" large medium @click="remove"
              >重置</v-btn
            >
          </div>
          <div class="bottom">
            <span class="forget">忘记密码？</span>
          </div>
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>
import { resLogin } from "../api/user";
import { setToken } from "../utils/auth";
export default {
  data() {
    return {
      job_id: "",
      password: "",
    };
  },
  inject: ["changeLoginState"],
  methods: {
    async postComment() {
      const { job_id, password } = this;
      if (job_id.length > 0 || password.length > 0) {
        const res = await resLogin({ job_id, password });
        if (res.code === 200 && res.data.msg) {
          return this.$message({
            type: "error",
            message: res.data.msg,
            duration: 2000,
          });
        }
        window.localStorage.setItem("userInfo", JSON.stringify(res.data));
        setToken(res.data.token);
        this.$message({ type: "success", message: "登录成功", duration: 2000 });
        this.changeLoginState()
        this.$router.push("/");
      } else {
        this.$message({
          type: "error",
          message: "帐号，密码不能为空",
          duration: 2000,
        });
      }
    },
    remove() {
      (this.job_id = ""), (this.password = "");
    },
  },
};
</script>

<style lang="scss">
.page {
  width: 100%;
  // height: 100%;
  overflow: hidden;
  background-color: #eea8a6;
  .bgImg {
    padding-top: 150px;
    width: 1300px;
    margin: 0 auto;
    height: 750px;
    background-image: url("../../public/images/girs2.png");
    background-size: contain;
  }
}

.login {
  width: 350px;
  height: 500px;
  margin: 0 auto;
  display: block;
  .median {
    width: 100%;
    height: 350px;
    h3 {
      padding-top: 10px;
      text-align: center;
    }
    .user {
      outline: none;
      width: 300px;
      height: 50px;
      // padding-left: 10px;
      margin: 15px 25px;
    }
    .btn {
      width: 300px;
      height: 50px;
      margin: 15px 25px;
    }
  }
  .bottom {
    width: 100%;
    .forget {
      float: left;
      margin-left: 25px;
      color: rgb(1, 1, 250);
      cursor: pointer;
    }
  }
}
</style>