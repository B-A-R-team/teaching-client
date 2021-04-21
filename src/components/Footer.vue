<!--
 * @Author: lts
 * @Date: 2021-04-14 11:22:03
 * @LastEditTime: 2021-04-20 17:49:34
 * @FilePath: \teaching-client\src\components\Footer.vue
-->
<template>
  <v-footer absolute app style="width:100%;border-top:2px solid #eee;">
    <div id="footer-content">
      <div id="footer_center">
        <div id="about_website">
          <p id="footer_title">关于网站</p>
          <p>安阳师范学院软件学院-教研活动网站</p>
          <p>学校地址-河南省安阳师文明大道265号</p>
        </div>
        <div id="antdivder"></div>
        <div id="maintain">
          <p id="footer_title">维护支持</p>
          <p>版权所有：BAR团队</p>
          <p>管理维护：BAR团队</p>
          <p>技术支持：BAR团队</p>
        </div>
        <div id="antdivder"></div>
        <div id="qrcod">
          <div id="qrcod_content">
            <img src="../../image/weixin.350e35ef.jpg" alt="" />
            <p>安阳师范学院微信</p>
          </div>
        </div>
        <div id="archival_information">
          <span>Copyright © 备案信息：豫ICP备xxxxxx号-x</span>
          <span id="ar_span2">联系我们邮箱：xxxxxxxx</span>
        </div>
      </div>
    </div>
  </v-footer>
</template>
<script>
export default {
  name: 'Footer',
};
</script>
<style lang="scss">
#footer-content {
  padding-top: 8px;
  background-color: #fff;
  width: 100%;
  height: 250px;
  #footer_center {
    margin-top: 8px;
    position: absolute;
    width: 70%;
    margin-left: 15%;
    margin-right: 15%;
    #about_website,
    #maintain,
    #qrcod {
      width: 21%;
      margin: 0 1%;
      float: left;
      font-size: 14px;
      text-align: left;
      #footer_title {
        font-size: 18px;
        font-weight: bold;
      }
      #qrcod_content {
        width: 125px;
        text-align: center;
        img {
          width: 123px;
        }
      }
    }
    #qrcod {
      width: 50%;
    }
    #antdivder {
      width: 0.2%;
      height: 150px;
      float: left;
      margin: 0 0.4%;
      background-color: rgb(245, 245, 245);
    }
    #archival_information {
      float: left;
      margin: 20px 0;
      width: 100%;
      text-align: left;
      #ar_span2 {
        position: absolute;
        left: 50%;
      }
    }
  }
}
</style>
