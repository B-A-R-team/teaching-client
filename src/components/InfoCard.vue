<template>
  <div
    class="infocard-container"
    @mouseover="handleMouseover"
    @mouseout="handleMouseout"
  >
    <v-avatar
      :class="['info-card__avatar', open ? 'active' : '']"
      color="primary"
      :size="36"
    >
      <v-img :src="avatar" />
    </v-avatar>
    <div :class="['info-card__content', open ? 'active' : '']">
      <v-card class="wrapper">
        <v-card-title class="nickname">{{ nickname }}</v-card-title>
        <v-card-subtitle class="role">
          <v-chip small label color="primary" text-color="white">
            {{ role }}
          </v-chip>
        </v-card-subtitle>
        <v-divider />

        <v-list dense>
          <v-list-item-group v-model="selectedItem" color="primary">
            <v-list-item
              v-for="(item, i) in list"
              :key="i"
              @click="handleItemClick(item.click)"
            >
              <v-list-item-icon>
                <v-icon v-text="item.icon" />
              </v-list-item-icon>
              <v-list-item-content>
                {{ item.text }}
              </v-list-item-content>
            </v-list-item>
            <v-divider style="margin-top: 5px; margin-bottom: 5px" />
            <v-list-item @click="handleExit">
              <v-list-item-icon>
                <v-icon>mdi-exit-to-app</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                退出
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'info-card',
  props: {
    avatar: String,
    nickname: String,
    role: String,
    list: Array,
  },
  emits: ['exit', 'mouseover', 'mouseout'],
  data: () => ({
    open: false,
    selectedItem: -1,
  }),
  methods: {
    handleMouseover(e) {
      this.open = true;
      this.$emit('mouseover', e);
    },
    handleMouseout(e) {
      this.open = false;
      this.$emit('mouseout', e);
    },
    handleExit(e) {
      this.$emit('exit', e);
    },
    handleItemClick(callback) {
      if (typeof callback === 'function') {
        callback();
      }
    },
  },
};
</script>

<style lang="scss">
$primary-color: #fb7299;
$animate-during: 0.4s;

.infocard-container {
  position: relative;
  .info-card__avatar {
    z-index: 9999;
    transition: all $animate-during;
    transform-origin: 50% 0 0;
  }

  .info-card__avatar.active {
    transform: translateY(50%) scale(2);
  }

  .info-card__content {
    visibility: hidden;
    opacity: 0;
    transition: all $animate-during;

    position: absolute;
    top: 60px;
    left: -102px;

    width: 240px;
    .wrapper {
      padding-top: 1rem;
      .nickname {
        display: flex;
        justify-content: center;
        color: $primary-color;
      }

      .role {
        padding-top: 10px;
      }
    }
  }
  .info-card__content.active {
    visibility: visible;
    opacity: 1;
    transition: all $animate-during;
  }
}
</style>
