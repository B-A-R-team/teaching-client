<template>
  <v-app>
    <div class="page">
      <div class="login mx-auto">
        <div class="top_title">
          <h2>教务管理系统</h2>
        </div>
        <div class="median">
          <span class="subtitle mx-auto">工号密码登录</span>
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
          <div class="other mx-auto">
            <span>
              <input type="checkbox" checked />
              自动登录
            </span>
            <a class="forget">忘记密码？</a>
          </div>
          <v-btn class="btn" elevation="3" large medium @click="postCommit">
            登录
          </v-btn>
          <!-- <v-btn class="btn" elevation="3" large medium @click="register"
              >注册</v-btn> -->
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>
import { resLogin } from '../../api/user';
import { setToken } from '../../utils/auth';
import NProgress from 'nprogress';

export default {
  data() {
    return {
      job_id: '',
      password: '',
    };
  },
  //调用父组件的数据
  inject: ['changeLoginState'],
  methods: {
    async postCommit() {
      NProgress.start();
      const { job_id, password } = this;
      if (job_id.length > 0 || password.length > 0) {
        const res = await resLogin({ job_id, password });
        if (res.code === 200 && res.data.msg) {
          return this.$message({
            type: 'error',
            message: res.data.msg,
            duration: 2000,
          });
        }
        //存储用户信息
        window.localStorage.setItem('userInfo', JSON.stringify(res.data));
        setToken(res.data.token);
        this.$message({ type: 'success', message: '登录成功', duration: 2000 });
        //改变登录状态
        this.changeLoginState();
        this.$router.push('/');
      } else {
        this.$message({
          type: 'error',
          message: '帐号，密码不能为空',
          duration: 2000,
        });
      }
      NProgress.done();
    },
    register() {
      // this.$router.push("/register");
    },
  },
};
</script>

<style lang="scss">
.page {
  width: 100%;
  height: 480px;
  overflow: hidden;
  background: url(https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg);
  background-repeat: no-repeat;
  margin-top: 20px;
}
.login {
  width: 400px;
  height: 360px;
  margin-top: 20px;
  .top_title {
    margin: 20px 0;
  }
  .median {
    .subtitle {
      cursor: default;
      display: block;
      height: 40px;
      width: 300px;
      line-height: 40px;
      color: #40a9ff;
    }
    width: 350px;
    height: 380px;
    margin: 0 auto;
    padding-top: 20px;
    input {
      //取消输入框的背景
      -webkit-box-shadow: none;
    }
    .user {
      outline: none;
      width: 300px;
      height: 50px;
      margin: 15px 25px;
      background: transparent;
    }
    .other {
      display: inline-block;
      width: 300px;
      height: 50px;
      line-height: 50px;
      span {
        float: left;
      }
      a {
        float: right;
      }
    }
    .btn {
      width: 300px;
      height: 30px;
      margin: 15px 25px;
      background-color: #40a9ff;
      color: #fff;
    }
  }
  .bottom {
    width: 100%;

    .forget {
      float: left;
      margin-left: 25px;
      cursor: pointer;
    }
  }
}
</style>
