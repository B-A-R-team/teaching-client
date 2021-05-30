<template>
  <v-app id="app">
    <v-app-bar id="header" app flat>
      <div class="header-logo">
        <router-link to="/"> 教研活动中心 </router-link>
      </div>
      <v-spacer />
      <div id="nav">
        <div
         class="my-pointer"
          @click="
            () => {
              $router.push('/person');
            }
          "
        >
          <v-icon style="font-size: 27px" color="white">mdi-home</v-icon>
          <span class="ml-2 my-pointer">个人空间</span>
        </div>
        <span style="height:25px" class="my-divider"></span>
        <div v-if="isLogin" class="header-login-info">
          <span> Hi，{{ userInfo.name }}</span>
          <span class="my-divider"></span>
          <span @click="exit" class="my-pointer">退出</span>
        </div>
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
import { getToken, removeToken } from "@/utils/auth";
import getImgFullPath from "../../utils/getImgFullPath";
// eslint-disable-next-line no-unused-vars
import getRoutes from "../../router/diff";
export default {
  components: { Footer },
  provide() {
    return {
      changeLoginState: this.changeLoginState,
    };
  },
  data() {
    return {
      list: [
        {
          text: "我的空间",
          icon: "mdi-home",
          click: () => {
            this.$router.push("/person");
          },
        },
        {
          text: "设置",
          icon: "mdi-clipboard-edit-outline",
          click: () => {
            this.$router.push("/person/settings");
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
  min-height: 100%;
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
  font-size: 22px;
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
  .header-login-info > * {
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
.my-divider {
  border-left: 1px solid rgba(0, 0, 0, 0.12);
  min-height: 100%;
  max-height: 100%;
}
.my-pointer {
  cursor: pointer;
}
</style>
