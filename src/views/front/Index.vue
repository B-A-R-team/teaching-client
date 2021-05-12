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
          :avatar="renderImg(userInfo.avatar)"
          :nickname="userInfo.name"
          :role="userInfo.role.name"
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
import getImgFullPath from "../../utils/getImgFullPath";
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
          text: "我的待办",
          icon: "mdi-account",
          click: () => {
            this.$router.push("/perActive");
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
        name: "",
        avatar: "",
        role: "",
      },
    };
  },
  methods: {
    renderImg(filePath) {
      return getImgFullPath(filePath);
    },
    exit() {
      window.localStorage.clear();
      removeToken();
      this.isLogin = false;
      this.$router.replace("/login");
    },
    changeLoginState() {
      this.isLogin = true;
      const myUserInfo = JSON.parse(
        window.localStorage.getItem("userInfo") || "{}"
      );
      this.userInfo = myUserInfo;
    },
  },
  mounted() {
    const token = getToken();
    const myUserInfo = JSON.parse(
      window.localStorage.getItem("userInfo") || "{}"
    );
    this.userInfo = myUserInfo;
    token && (this.isLogin = true);
  },
};
</script>

<style lang="scss" scoped>
#app {
  min-height:100%;
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
    background-image: linear-gradient(141deg, #1f8dda 0%, #1f8dda 71%);
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
  margin: 0 !important;
}
@media (min-width: 700px) {
  .container {
    max-width: 100%;
  }
}
</style>
