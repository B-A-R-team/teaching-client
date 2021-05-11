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
        <v-card :style="{ minHeight: '600px', height: '100%' }" :loading="willLoading">
          <v-card-title>近期开展活动</v-card-title>
          <!-- 以下为vuetify list组件官方示例 -->
          <v-list three-line v-if="willTotal > 1">
            <template v-for="(item, index) in willItems">
              <v-subheader v-if="item.header" :key="index" v-text="item.header"></v-subheader>
              <v-divider v-else-if="item.divider" :key="index" :inset="item.inset"></v-divider>
              <v-list-item v-else :key="index" style="cursor: pointer" @click="enterDetail(item)">
                <v-list-item-avatar>
                  <v-img :src="BASE_URL + item.avatar"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title v-html="item.title"></v-list-item-title>
                  <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-list-item-action-text v-text="item.action"></v-list-item-action-text>
                </v-list-item-action>
              </v-list-item>
            </template>
          </v-list>
          <div v-else style="height:461px;line-height:461px;text-align:center">暂无数据</div>
          <div class="px-3 py-1">
            <v-pagination
              v-model="willPage"
              class="my-4 page-posi"
              :length="totalPage('will')"
              @input="changePage(donePage, 'will')"
            ></v-pagination>
          </div>
        </v-card>
      </v-col>
      <v-col :lg="6" :md="12" :sm="12">
        <v-card :style="{ minHeight: '500px', height: '100%' }" :loading="doneLoading">
          <v-card-title>已结束活动</v-card-title>
          <!-- 以下为vuetify list组件官方示例 -->
          <v-list three-line v-if="doneTotal > 1">
            <template v-for="(item, index) in doneItems">
              <v-subheader v-if="item.header" :key="index" v-text="item.header"></v-subheader>

              <v-divider v-else-if="item.divider" :key="index" :inset="item.inset"></v-divider>

              <v-list-item v-else :key="index" @click="enterDetail(item)">
                <v-list-item-avatar>
                  <v-img :src="BASE_URL + item.avatar"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title v-html="item.title"></v-list-item-title>
                  <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-list-item-action-text v-text="item.action"></v-list-item-action-text>
                </v-list-item-action>
              </v-list-item>
            </template>
          </v-list>
          <div v-else style="height:461px;line-height:461px;text-align:center">暂无数据</div>
          <div class="px-3 py-1">
            <v-pagination
              v-model="donePage"
              class="my-4 page-posi"
              :length="totalPage('done')"
              @input="changePage(donePage, 'done')"
            ></v-pagination>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { fetchAllActiveList, fetchActiveListByType } from "@/api/active";
import { BASE_URL } from "../utils/constant";
export default {
  data() {
    return {
      BASE_URL,
      willItems: [],
      doneItems: [],
      willTotal: 0,
      doneTotal: 0,
      willPage: 1,
      donePage: 1,
      page_size: 5,
      doneLoading: true,
      willLoading: true,
    };
  },
  methods: {
    async getActiveList() {
      const [
        { data: willActive },
        { data: doneActive }
      ] = await fetchAllActiveList({ current_page: 1, page_size: this.page_size })
      this.willItems = willActive.act
      this.doneItems = doneActive.act
      this.willTotal = willActive.total || 1
      this.doneTotal = doneActive.total || 1
    },
    enterDetail(item) {
      this.$router.push("/activeDetail?act_id=" + item.id);
    },
    async changePage(e, type) {
      const { page_size } = this;
      console.log(e, type)
      switch (type) {
        case 'will':
          {
            this.willLoading = true;
            const res = await fetchActiveListByType({ type, page_size, current_page: e })
            console.log(res)
            if (res.code === 200) {
              this.willItems = res.data.act
              this.willTotal = res.data.total
              this.willLoading = false;

            }
          }
          break;
        case 'done':
          {
            this.doneLoading = true;
            const res = await fetchActiveListByType({ type, page_size, current_page: e })
            console.log(res)
            if (res.code === 200) {
              this.doneItems = res.data.act
              this.doneTotal = res.data.total
              this.doneLoading = false;
            }
          }
          break;
        default:
          break;
      }
    }
  },
  mounted() {
    this.getActiveList();
    this.doneLoading = false;
    this.willLoading = false;
  },
  computed: {
    totalPage() {
      return (type) => {
        return type === 'done' ? Math.ceil(this.doneTotal / 5) : Math.ceil(this.willTotal / 5)
      }
    }
  }
};
</script>

<style lang="scss">
#index_list_container {
  margin: 0;
  padding: 0;
  .page-posi {
    padding-right: 20px;
    position: absolute;
    bottom: 0;
    display: flex;
    width: 100%;
    justify-content: center;
  }
}
</style>
