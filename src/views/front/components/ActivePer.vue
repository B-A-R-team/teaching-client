<template>
  <v-container id="index_list_container" fluid>
    <v-row justify="center">
      <v-col :lg="6" :md="12" :sm="12">
        <v-card :style="{ minHeight: '500px' }">
          <v-card-title id="card_title">待办</v-card-title>
          <v-list-item three-line v-for="(item, i) in perItems" :key="i">
            <v-list-item-content>
              <v-list-item-title v-text="item.title">
                活动标题
              </v-list-item-title>
              <v-list-item-subtitle v-text="item.content">
                活动内容
              </v-list-item-subtitle>
              <v-list-item-subtitle v-text="item.action">
                活动时间，地点
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-btn-toggle v-model="text" tile color="teal accent-4" group>
              <v-btn
                id="agree_btn"
                value="yes"
                @click="getAgreeActive(item.active_id, true)"
              >
                同意
              </v-btn>
              <v-btn
                id="agree_btn"
                value="no"
                @click="getAgreeActive(item.active_id, false)"
              >
                不同意
              </v-btn>
            </v-btn-toggle>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { fetchPerActive } from '@/api/perActive';
import { returnAgreeActive } from '@/api/perActive';
export default {
  data() {
    return {
      perItems: [],
      userInfo: {},
    };
  },
  methods: {
    async getPerActiveList() {
      this.userInfo = JSON.parse(
        window.localStorage.getItem('userInfo') || '{}'
      );
      const user_id = this.userInfo.id;
      const room_id = this.userInfo.room.id;
      this.perItems = await fetchPerActive(user_id, room_id);
    },
    async getAgreeActive(active_id, is_agree) {
      const user_id = this.userInfo.id;
      const { code, data } = await returnAgreeActive(
        user_id,
        active_id,
        is_agree
      );
      if (code === 200) {
        this.$message({ type: 'success', message: data.msg });
      }
    },
  },
  mounted() {
    this.getPerActiveList();
  },
};
</script>
<style lang="scss">
#index_list_container {
  margin: 0;
  padding: 0;
  text-align: left;
  #card_title {
    border-bottom: 0.0125rem solid rgba(0, 0, 0, 0.12);
  }
}
</style>
