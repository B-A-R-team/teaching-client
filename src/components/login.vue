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
            <v-btn class="btn" elevation="3" large medium @click="postCommit"
              >登录</v-btn
            >
            <v-btn class="btn" elevation="3" large medium @click="remove"
              >重置</v-btn
            >
          </div>
          <!-- <div class="bottom">
            <span class="forget">忘记密码？</span>
          </div> -->
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>
import { resLogin } from "../api/user";
import { setToken } from "../utils/auth";
import NProgress from 'nprogress';
export default {
  data() {
    return {
      job_id: "",
      password: "",
    };
  },
  //调用父组件的数据
  inject: ["changeLoginState"],
  methods: {
    async postCommit() {
      NProgress.start()
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
        //存储用户信息
        window.localStorage.setItem("userInfo", JSON.stringify(res.data));
        setToken(res.data.token);
        this.$message({ type: "success", message: "登录成功", duration: 2000 });
        //改变登录状态
        this.changeLoginState(); 
        this.$router.push("/");
      } else {
        this.$message({
          type: "error",
          message: "帐号，密码不能为空",
          duration: 2000,
        });
      }
      NProgress.done()
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
  height: 750px;
  overflow: hidden;
  background-image: linear-gradient(
      141deg,
      #1fc8db 0%,
      #7acad3 50%,
      pink 71%
    );
  .bgImg {
    padding-top: 140px;
    width: 600px;
    margin: 0 auto;
    height: 500px;
    // background-image: url("../../public/images/girs2.png");
    background-size: contain;
  }
}
.login {
  width: 400px;
  height: 360px;
  margin: 0 auto;
  margin-top: 20px;
  border-radius: 5px;
  display: block;
  background-color: rgb(240,255,255,0.4);
  .median {
    width: 350px;
    height: 350px;
    margin: 0 auto;
    padding-top: 20px;
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
      height: 30px;
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