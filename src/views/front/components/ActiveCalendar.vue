<template>
  <v-card class="active-calendar">
    <v-card-title>活动日历</v-card-title>
    <v-calendar short-months locale="zh-CN" :day-format="emptyFormat" :month-format="emptyFormat">
      <template slot="day" slot-scope="info">
        <v-tooltip left v-if="haveEvent(info)">
          <template v-slot:activator="{ on, attrs }">
            <div
              :class="[
                'custom-day',
                info.outside ? 'grey--text darken-1' : 'black--text',
                haveEvent(info) ? 'has-event' : '',
              ]"
              v-bind="attrs"
              v-on="on"
              @mouseover="getEventByTime(info)"
            >{{ info.day }}</div>
          </template>
          <v-list style="background: transparent;">
            <v-list-item color="transparent" v-if="showLoading">
              <span class="white--text">加载中...</span>
            </v-list-item>
            <v-list-item v-else v-for="(event, index) in showEvents" :key="index">
              <li class="white--text">{{ event.title }} - {{ event.room_name }}</li>
            </v-list-item>
          </v-list>
        </v-tooltip>
        <div
          v-else
          :class="[
            'custom-day',
            info.outside ? 'grey--text darken-1' : 'black--text',
            haveEvent(info) ? 'has-event' : '',
          ]"
        >{{ info.day }}</div>
      </template>
    </v-calendar>
  </v-card>
</template>

<script>
import {
  fetchActiveListBothDoingAndWillDo,
  fetchActiveListToday,
} from '../../../api/active';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

export default {
  data() {
    return {
      events: [],
      showEvents: [],
      showLoading: true,
    };
  },
  methods: {
    emptyFormat() {
      return '';
    },
    haveEvent(cur) {
      return this.events.some((event) => {
        const currentDate = `${cur.year}-${cur.month}-${cur.day}`;

        if (
          dayjs(currentDate).isBetween(
            event.start_time,
            event.end_time,
            null,
            '[]'
          )
        ) {
          return true;
        }
      });
    },
    async getEvent() {
      const [
        { data: doneActives },
        { data: willDoActives },
      ] = await fetchActiveListBothDoingAndWillDo({ current_page: 1, page_size: 6 });
      this.events = [...doneActives.act, ...willDoActives.act];
    },
    async getEventByTime(cur) {
      this.showLoading = true;
      const time = new Date(cur.date);
      const { data } = await fetchActiveListToday(time.getTime());
      this.showEvents = data;
      this.showLoading = false;
    },
  },
  mounted() {
    this.getEvent();
  },
};
</script>

<style lang="scss">
.active-calendar {
  .custom-day {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;
  }
  .custom-day:hover {
    transition: all 0.3s;
    // background-color: rgba(0, 0, 0, 0.089);
    cursor: pointer;
  }
  .custom-day.has-event::after {
    content: "";
    display: block;
    background-color: #186fad;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    position: absolute;
    top: 33px;
  }
}
</style>
