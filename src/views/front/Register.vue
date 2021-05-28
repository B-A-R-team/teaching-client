<template>
  <v-app>
    <div class="page">
      <div class="login mx-auto">
        <div class="top_title"></div>
        <div class="median">
          <v-text-field
            autocomplete="off"
            class="user"
            label="请输入姓名"
            v-model="name"
          ></v-text-field>
          <v-text-field
            autocomplete="off"
            class="user"
            label="请输入工号"
            v-model="job_id"
          ></v-text-field>
          <v-text-field
            autocomplete="off"
            class="user"
            :type="'password'"
            label="请输入密码"
            v-model="password"
          ></v-text-field>
          <v-select
            autocomplete="off"
            class="user"
            :loading="selectLoading"
            label="选择新的教研室"
            v-model="selectedRoom"
            :items="rooms"
            item-value="id"
            item-text="name"
            :no-data-text="selectText"
          ></v-select>
          <v-btn class="btn" elevation="3" large medium @click="register"
            >注册</v-btn
          >
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>
import { fetchRoomList } from "../../api/room";
import { fetchRegister } from "../../api/user";
export default {
  data() {
    return {
      name: "",
      job_id: "",
      password: "",
      rooms: [],
      selectLoading: false,
      selectedRoom: "",
      selectText: "暂无",
    };
  },
  //调用父组件的数据
  methods: {
    async register() {
      const { name, job_id, password, selectedRoom } = this;
      console.log(name, job_id, password, selectedRoom);
      if (name && job_id && password && selectedRoom) {
        const res = await fetchRegister({
          username: name,
          password,
          job_id,
          room_id: selectedRoom,
        });
        if (res.data.id) {
          this.$message({
            type: "success",
            message: "注册成功",
            duration: 2000,
          });
          this.$router.replace("/login");
        }
      } else {
        this.$message({
          type: "error",
          message: "请填写每一项",
          duration: 2000,
        });
      }
    },
  },
  async mounted() {
    this.selectLoading = true;
    const res = await fetchRoomList(0, 999);
    this.rooms = res.data.rooms;
    this.selectLoading = false;
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
