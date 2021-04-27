<template>
  <div>
    <v-subheader>
      我的活动
      <v-spacer />
    </v-subheader>
    <v-row v-if="actives.length === 0" class="px-4 py-14">
      <v-spacer />
      暂无数据
      <v-spacer />
    </v-row>
    <v-row v-else class="px-4 pb-4">
      <v-col v-for="(item, i) in actives" :key="i" cols="3">
        <active-card :data="item" />
      </v-col>
    </v-row>
    <v-subheader>
      预发布活动
      <v-spacer />
    </v-subheader>
    <v-row v-if="preActives.length === 0" class="px-4 py-14">
      <v-spacer />
      暂无数据
      <v-spacer />
    </v-row>
    <v-row v-else class="px-4 pb-4">
      <v-col v-for="(item, i) in preActives" :key="i" cols="3">
        <active-card :data="item" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ActiveCard from './components/ActiveCard.vue';
import { fetchActiveWithConcurrent } from '../../api/active';

export default {
  components: { ActiveCard },
  inject: ['changeLoading'],
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
      this.changeLoading(true);
      const user = this.getUserInfo();
      const [
        { data: actives },
        { data: preActives },
      ] = await fetchActiveWithConcurrent(user.id, user.room?.id ?? 0);

      this.actives = actives;
      this.preActives = preActives;
      this.changeLoading(false);
    },
  },
  mounted() {
    this.getActiveList();
  },
};
</script>

<style></style>
