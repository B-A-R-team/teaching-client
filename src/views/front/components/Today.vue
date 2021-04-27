<!--
 * @Author: lts
 * @Date: 2021-04-08 09:26:37
 * @LastEditTime: 2021-04-21 10:05:15
 * @FilePath: \teaching-client\src\components\Today.vue
-->
<template>
  <v-card class="doing">
    <v-card-title>
      今日活动
    </v-card-title>
    <v-list two-line>
      <v-list-item
        v-for="(item, index) in list"
        :key="index"
        :to="'/activeDetail?act_id=' + item.id"
      >
        <v-list-item-avatar>
          <v-img :src="item.avatar"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-text="item.title" />
          <v-list-item-subtitle>
            {{ item.start_time }} - {{ item.end_time }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import { fetchActiveListToday } from '../../../api/active';
import { getImgFullPath } from '../../../utils';
export default {
  data() {
    return {
      list: [
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: '如何处理挂科学生',
          time: '2020.1.1',
        },
      ],
    };
  },
  methods: {
    async getTodayEvents() {
      const { data } = await fetchActiveListToday(Date.now());
      console.log(data);
      this.list = data.map((item) => {
        return {
          title: item.title,
          avatar: getImgFullPath(item.avatar),
          start_time: item.start_time.split(' ')[0],
          end_time: item.end_time.split(' ')[0],
          id: item.id,
        };
      });
    },
  },
  mounted() {
    this.getTodayEvents();
  },
};
</script>

<style>
.doing {
  margin-top: 20px;
}

.doing .v-card__title {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

.doing .v-list {
  overflow-y: scroll;
  height: 140px;
}
</style>
