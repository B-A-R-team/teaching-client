<template>
  <v-card>
    <v-img :src="data.img" height="100px" />
    <v-card-title class="text-subtitle-1">
      {{ data.title }}
    </v-card-title>
    <v-card-subtitle class="pb-0 content" style="text-align:left">
      <v-list-item-title class="text-body-2">
        {{ data.content }}
      </v-list-item-title>
    </v-card-subtitle>
    <v-card-actions>
      <v-btn color="primary" text block :to="data.link">查看</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    data: Object,
  },
};
</script>
