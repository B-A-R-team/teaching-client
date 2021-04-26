<template>
  <div class="home">
    <v-row>
      <v-col cols="8">
        <v-card>
          <v-carousel>
            <v-carousel-item
              v-for="(item, i) in items"
              :key="i"
              :src="baseUrl + item.swiper.filePath"
            >
              <router-link
                :to="{ path: '/activeDetail', query: { act_id: item.id } }"
                class="swiper-title"
              >
                <div class="active-info">主题：{{ item.title }}</div>
              </router-link>
            </v-carousel-item>
          </v-carousel>
        </v-card>
      </v-col>
      <v-col cols="4">
        <active-calendar />
        <today />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <active-list />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ActiveCalendar from "./components/ActiveCalendar.vue";
import ActiveList from "../../components/ActiveList.vue";
import Today from "../../components/Today.vue";
const baseUrl = "http://www.zxyc.xyz:3450";
import { fetchSwiper } from "../../api/swiper";
export default {
  name: "Home",
  components: { ActiveCalendar, Today, ActiveList },
  data() {
    return {
      baseUrl,
      items: [],
    };
  },
  methods: {
    async getSwiper() {
      const res = await fetchSwiper();
      if (res.code === 200) {
        this.items = res.data;
        console.log(res.data[0]);
        console.log(this.baseUrl + res.data[0].swiper.filePath);
      }
    },
  },
  mounted: async function () {
    this.getSwiper();
  },
};
</script>

<style lang="scss">
.home .v-card__title {
  padding-top: 8px;
  padding-bottom: 8px;
}
.home .v-list-item__content {
  text-align: left;
}
.swiper-title {
  text-decoration: none;
  .active-info {
    background: rgba(0, 0, 0, 0.3);
    padding: 5px;
    color: white;
  }
}
</style>
