<template>
  <v-card>
    <v-img :src="renderImg(data.img[0].filePath)" height="100px" />
    <v-card-title class="text-subtitle-1">
      <span
      class="text-subtitle-1"
        style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;height:30px;font-size:22px"
      >
        {{ data.title }}</span
      >
    </v-card-title>
    <v-card-subtitle class="pb-0 content" style="text-align: left">
      <v-list-item-title class="text-body-2">
        {{ data.content }}
      </v-list-item-title>
    </v-card-subtitle>
    <v-card-actions>
      <v-btn color="primary" text block :to="'/activeDetail?act_id=' + data.id">
        查看
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import getImgFullPath from "../../../utils/getImgFullPath";

export default {
  props: {
    data: Object,
  },
  methods: {
    renderImg(filePath) {
      return getImgFullPath(filePath);
    },
  },
};
</script>
