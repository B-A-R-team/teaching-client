<template>
  <v-app id="app">
    <v-app-bar id="header" app flat>
      <div class="header-logo">
        <router-link to="/"> 教研活动中心 </router-link>
      </div>
      <v-spacer />
      <div id="nav">
        <info-card
          v-if="isLogin"
          avatar="https://cdn.jsdelivr.net/gh/Tuzilow/blog-image/img/teamlogo.jpg"
          :nickname="userInfo.name"
          :role="userInfo.role"
          :list="list"
          @exit="exit"
        />

        <div v-if="isLogin">Hi，{{ userInfo.name }}</div>
        <div class="header-login" v-if="!isLogin">
          <router-link to="/login"> 登录 </router-link>
        </div>
      </div>
    </v-app-bar>
    <v-main>
      <v-container class="main-content" fluid>
        <router-view />
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Footer from "@/components/Footer.vue";
import InfoCard from "@/components/InfoCard.vue";
import { getToken, removeToken } from "@/utils/auth";

export default {
  components: { InfoCard, Footer },
  provide() {
    return {
      changeLoginState: this.changeLoginState,
    };
  },
  data() {
    return {
      list: [
        {
          text: "个人信息",
          icon: "mdi-account",
          click: () => {
            console.log("个人信息");
          },
        },
        {
          text: "我的空间",
          icon: "mdi-clock",
          click: () => {
            this.$router.push("/person");
          },
        },
        {
          text: "我的代办",
          icon: "mdi-account",
          click: () => {
            console.log("我的代办");
          },
        },
        {
          text: "发布活动",
          icon: "mdi-account",
          click: () => {
            console.log("发布活动");
          },
        },
      ],
      isLogin: false,
      userInfo: {
        name: "小李",
        avatar: "",
        role: "主任",
      },
    };
  },
  methods: {
    exit() {
      window.localStorage.clear();
      removeToken();
      this.isLogin = false;
      this.$router.replace('/login')
    },
    changeLoginState() {
      this.isLogin = true;
      const myUserInfo = JSON.parse(
        window.localStorage.getItem("userInfo") || "{}"
      );
      this.userInfo.name = myUserInfo.name;
      this.userInfo.avatar = myUserInfo.avatar;
    },
  },
  mounted() {
    const token = getToken();
    const myUserInfo = JSON.parse(
      window.localStorage.getItem("userInfo") || "{}"
    );
    this.userInfo.name = myUserInfo.name;
    this.userInfo.avatar = myUserInfo.avatar;
    token && (this.isLogin = true);
  },
};
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  overflow-y: hidden;
  background-color: rgb(252, 252, 252);
  #header {
    .v-toolbar__content,
    .v-toolbar__extension {
      justify-content: space-between;
    }
    .header-logo {
      a {
        color: rgb(255, 248, 235);
        text-decoration: none;
      }
    }
    font-size: 25px;
    color: rgb(255, 248, 235);
    background-image: linear-gradient(
      141deg,
      #1F8DDA 0%,
      #1F8DDA 71%
    );
    .header-login a {
      font-weight: normal;
      color: rgb(255, 248, 235);
    }
  }
}

#nav {
  display: block;
  font-size: 23px;
  padding: 30px;
  a {
    text-decoration: none;
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }

  display: flex;
  align-items: center;
  > * {
    margin: 0 0.5rem;
  }
}
.main-content {
  padding-left: 3rem !important;
  padding-right: 3rem !important;
}
.container {
  margin: 0!important;
}
@media (min-width: 700px){
  .container {
    max-width: 1900px!important;
  }
}
</style>
