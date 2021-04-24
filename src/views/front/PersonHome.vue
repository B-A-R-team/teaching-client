<template>
  <div>
    <v-subheader>
      我的活动
      <v-spacer />
      <v-btn color="primary" outlined small class="pr-1">
        更多<v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-subheader>
    <v-row class="px-4 pb-4">
      <v-col v-for="(item, i) in actives" :key="i" cols="3">
        <active-card :data="item" />
      </v-col>
    </v-row>
    <v-subheader>
      预发布活动
      <v-spacer />
      <v-btn color="primary" outlined small class="pr-1">
        更多<v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-subheader>
    <v-row class="px-4 pb-4">
      <v-col v-for="(item, i) in preActives" :key="i" cols="3">
        <active-card :data="item" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ActiveCard from './components/ActiveCard.vue';
import { fetchActiveByUserId } from '../../api/active';

export default {
  components: { ActiveCard },
  data() {
    return {
      actives: [],
      preActives: [],
    };
  },
  methods: {
    getUserInfo() {
      const userInfo = localStorage.getItem('userInfo');
      if (userInfo) {
        return JSON.parse(userInfo);
      } else {
        return null;
      }
    },
    async getActiveList() {
      const user = this.getUserInfo();
      const { data: activeList } = await fetchActiveByUserId(
        user.id,
        user.room.id
      );

      activeList.forEach((active) => {
        active.img = 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg';
        if (active['advance'] === 0) {
          this.preActives.push(active);
        } else {
          this.actives.push(active);
        }
      });
    },
  },
  mounted() {
    this.getActiveList();
  },
};
</script>

<style></style>
