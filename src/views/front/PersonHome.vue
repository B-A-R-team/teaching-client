<template>
  <div>
    <v-subheader>我的活动</v-subheader>
    <v-row class="px-4 pb-4">
      <v-col v-for="(item, i) in actives" :key="i" cols="3">
        <active-card :data="item" />
      </v-col>
    </v-row>
    <v-subheader>预发布活动</v-subheader>
    <v-row class="px-4 pb-4">
      <v-col v-for="(item, i) in actives" :key="i" cols="3">
        <active-card :data="item" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ActiveCard from './components/ActiveCard.vue';
export default {
  components: { ActiveCard },
  data() {
    return {
      actives: [
        {
          img: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg',
          title: '营造美丽安师',
          abstract:
            '这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要',
          link: '',
        },
        {
          img: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg',
          title: '123123123',
          abstract:
            '这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要',
          link: '',
        },
        {
          img: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg',
          title: '处分',
          abstract:
            '这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要',
          link: '',
        },
        {
          img: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg',
          title: '营造美丽安师',
          abstract:
            '这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要',
          link: '',
        },
        {
          img: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg',
          title: '123123123',
          abstract:
            '这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要',
          link: '',
        },
        {
          img: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg',
          title: '处分',
          abstract:
            '这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要',
          link: '',
        },
      ],
    };
  },
};
</script>

<style></style>
