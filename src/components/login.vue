<!--
 * @Author: lts
 * @Date: 2021-04-08 11:28:06
 * @LastEditTime: 2021-04-13 20:08:22
 * @FilePath: \teaching-client\src\components\login.vue
-->
<template>
    <v-app>
       <div class="login">
           <div class="title">
                <span class="tleft">教务管理系统</span>
                <span class="tright">×</span>
            </div>
            <div class="median">
                <h3>用户名密码登录</h3>
                <v-text-field class="user" label="请输入用户名"></v-text-field>
                <v-text-field class="user" :type="'password'" label="请输入密码"></v-text-field>
                <v-btn class="btn"
                 elevation="2" large medium >登录</v-btn>
            </div>
            <div class="bottom">
                <span class="forget">忘记密码？</span>
            </div>
       </div>    
    </v-app>
</template>

<script>
export default {}
</script>

<style >
.login {
  width: 350px;
  height: 380px;
  margin: 200px auto;
  border-radius: 5px;
  box-shadow: 5px 5px 5px 5px #888888;
}
.login .title {
  width: 100%;
  height: 50px;
}
.login .title .tleft {
  font-size: 16px;
  margin-top: 10px;
  margin-left: 10px;
  float: left;
}
.login .title .tright {
  width: 32px;
  margin-top: 10px;
  text-align: center;
  margin-right: 10px;
  font-size: 20px;
  float: right;
  cursor: pointer;
}
.login .median {
  width: 100%;
  height: 280px;
}
.login .median h3 {
  padding-top: 10px;
  text-align: center;
}
.login .median .user {
  outline: none;
  width: 300px;
  height: 50px;
  margin: 15px 25px;
}
.login .median .btn {
  width: 300px;
  height: 50px;
  margin: 15px 25px;
}
.login .bottom {
  width: 100%;
}
.login .bottom .forget {
  float: left;
  margin-left: 25px;
  color: #0101fa;
  cursor: pointer;
}


</style>