<template>
  <v-card>
    <v-img :src="data.img" height="100px" />
    <v-card-title class="text-subtitle-1">
      {{ data.title }}
    </v-card-title>
    <v-card-subtitle class="pb-0" style="text-align:left">
      {{ data.abstract }}
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

<style></style>
