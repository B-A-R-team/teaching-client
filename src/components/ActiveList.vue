<!--
 * @Author: lts
 * @Date: 2021-04-08 09:26:37
 * @LastEditTime: 2021-04-21 09:59:36
 * @FilePath: \teaching-client\src\components\ActiveList.vue
-->
<template>
  <v-container id="index_list_container" fluid>
    <v-row justify="center">
      <v-col :lg="6" :md="12" :sm="12">
        <v-card :style="{ minHeight: '500px' }">
          <v-card-title>近期开展活动</v-card-title>
          <!-- 以下为vuetify list组件官方示例 -->
          <v-list three-line>
            <template v-for="(item, index) in doingItems">
              <v-subheader
                v-if="item.header"
                :key="index"
                v-text="item.header"
              ></v-subheader>
              <v-divider
                v-else-if="item.divider"
                :key="index"
                :inset="item.inset"
              ></v-divider>

              <v-list-item
                v-else
                :key="index"
                style="cursor: pointer"
                @click="enterDetail(item)"
              >
                <v-list-item-avatar>
                  <v-img :src="BASE_URL + item.avatar"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title v-html="item.title"></v-list-item-title>
                  <v-list-item-subtitle
                    v-html="item.subtitle"
                  ></v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-list-item-action-text
                    v-text="item.action"
                  ></v-list-item-action-text>
                </v-list-item-action>
              </v-list-item>
            </template>
          </v-list>
        </v-card>
      </v-col>
      <v-col :lg="6" :md="12" :sm="12">
        <v-card :style="{ minHeight: '500px' }">
          <v-card-title>已结束活动</v-card-title>
          <!-- 以下为vuetify list组件官方示例 -->
          <v-list three-line>
            <template v-for="(item, index) in doneItems">
              <v-subheader
                v-if="item.header"
                :key="index"
                v-text="item.header"
              ></v-subheader>

              <v-divider
                v-else-if="item.divider"
                :key="index"
                :inset="item.inset"
              ></v-divider>

              <v-list-item v-else :key="index" @click="enterDetail(item)">
                <v-list-item-avatar>
                  <v-img :src="BASE_URL + item.avatar"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title v-html="item.title"></v-list-item-title>
                  <v-list-item-subtitle
                    v-html="item.subtitle"
                  ></v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-list-item-action-text
                    v-text="item.action"
                  ></v-list-item-action-text>
                </v-list-item-action>
              </v-list-item>
            </template>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { fetchActiveListByType } from "@/api/active";
import { BASE_URL } from "../utils/constant";
export default {
  data() {
    return {
      BASE_URL,
      doingItems: [],
      doneItems: [],
    };
  },
  methods: {
    async getActiveList() {
      this.doingItems = await fetchActiveListByType("doing");
      this.doneItems = await fetchActiveListByType("done");
    },
    enterDetail(item) {
      // console.log(this.$router.replace);
      this.$router.push("/activeDetail?act_id=" + item.id);
    },
  },
  mounted() {
    this.getActiveList();
  },
};
</script>

<style lang="scss">
#index_list_container {
  margin: 0;
  padding: 0;
}
</style>
