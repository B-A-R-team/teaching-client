<!--
 * @Author: lts
 * @Date: 2021-04-14 17:52:25
 * @LastEditTime: 2021-04-14 21:57:40
 * @FilePath: \teaching-client\src\views\Person.vue
-->
<template>
  <div class="personal">
    <div class="personal-info">
      <div class="person-msg">
        <div class="person-avatar">
          <v-avatar color="primary" size="64">
            <v-img
              alt="Avatar"
              src="https://cdn.jsdelivr.net/gh/Tuzilow/blog-image/img/teamlogo.jpg"
          /></v-avatar>
        </div>
        <div class="person-name">
          <p>王二狗</p>
          <v-chip small color="#4ed6ff" text-color="white" class="ma-2">
            主任
          </v-chip>
        </div>
      </div>
    </div>
    <div class="personal-tab">主页</div>
    <div class="personal-body">456</div>
  </div>
</template>
<script>
export default {
  name: "Person",
};
</script>
<style lang="scss" scoped>
.personal {
  width: 100%;
  min-height: 300px;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  > * {
    width: 75%;
    min-height: 200px;
    border: 1px solid red;
    &.personal-info {
      background-image: url("../../image/person.webp");
      background-size: 100% 100%;
      position: relative;
      > .person-msg {
        width: 180px;
        height: 90px;
        position: absolute;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        .person-name {
          margin-left: 20px;
          p:first-child {
            font-size: 18px;
            color: white;
            font-weight: 600;
          }
        }
        p {
          margin-bottom: 0;
        }
      }
    }
    &.personal-body {
      margin-top: 20px;
    }
    &.personal-tab {
      min-height: 50px;
    }
  }
}
</style>