<template>
  <v-app id="app">
    <v-app-bar app flat>
      <div>教研活动中心</div>
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
        <info-card
          avatar="https://cdn.jsdelivr.net/gh/Tuzilow/blog-image/img/teamlogo.jpg"
          nickname="某某人"
          role="老板"
          :list="list"
          @exit="exit"
        />
      </div>
    </v-app-bar>
    <v-main>
      <v-container class="main-content" fluid>
        <router-view />
      </v-container>
    </v-main>
    <v-footer absolute app>
      版权信息
    </v-footer>
  </v-app>
</template>

<script>
import InfoCard from '@/components/InfoCard.vue';

export default {
  components: { InfoCard },
  data: () => ({
    list: [
      {
        text: '个人信息',
        icon: 'mdi-account',
        click: () => {
          console.log('个人信息');
        },
      },
      {
        text: '我的空间',
        icon: 'mdi-clock',
      },
    ],
  }),
  methods: {
    exit() {
      console.log(1);
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow-y: hidden;
}

#nav {
  padding: 30px;

  a {
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
</style>
