<template>
  <div>
    <v-subheader>
      已参加
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
    <v-row class="px-4 pb-4">
      <v-col>
        <v-pagination
          v-model="donePage"
          :length="Math.ceil(doneTotal / pageSize)"
        ></v-pagination>
      </v-col>
    </v-row>
    <v-subheader>
      待参加
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
    <v-row class="px-4 pb-4">
      <v-col>
        <v-pagination
          v-model="willPage"
          :length="Math.ceil(willTotal / pageSize)"
        ></v-pagination>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ActiveCard from './components/ActiveCard.vue';
import { fetchDoneActive, fetchWillActive } from '../../api/active';

export default {
  components: { ActiveCard },
  inject: ['changeLoading'],
  data() {
    return {
      actives: [],
      preActives: [],
      donePage: 1,
      doneTotal: 1,
      willPage: 1,
      willTotal: 1,
      pageSize: 8,
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

    async getDoneActiveList() {
      this.changeLoading(true);
      const user = this.getUserInfo();
      const { data } = await fetchDoneActive(user.id, user.room?.id ?? 0, {
        current_page: this.donePage,
        page_size: this.pageSize,
      });

      this.actives = data.act;
      this.doneTotal = data.length;
      this.changeLoading(false);
    },
    async getWillActiveList() {
      this.changeLoading(true);
      const user = this.getUserInfo();
      const { data } = await fetchWillActive(user.id, user.room?.id ?? 0, {
        current_page: this.donePage,
        page_size: this.pageSize,
      });

      this.preActives = data.act;
      this.willTotal = data.length;
      this.changeLoading(false);
    },
  },
  watch: {
    donePage() {
      this.getDoneActiveList();
    },
    willPage() {
      this.getWillActiveList();
    },
  },
  mounted() {
    this.getDoneActiveList();
    this.getWillActiveList();
  },
};
</script>

<style></style>
