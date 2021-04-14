<!--
 * @Author: lts
 * @Date: 2021-04-08 11:28:06
 * @LastEditTime: 2021-04-14 10:03:19
 * @FilePath: \teaching-client\src\components\login.vue
-->
<template>
    <v-app>
       <div class="login">
           <div class="title">
                <span class="tleft">教务管理系统</span>
                <span class="tright">×</span>
            </div>
            <div class="median">
                <h3>用户名密码登录</h3>
                <v-text-field class="user" label="请输入用户名"></v-text-field>
                <v-text-field class="user" :type="'password'" label="请输入密码"></v-text-field>
                <v-btn class="btn"
                 elevation="2" large medium >登录</v-btn>
            </div>
            <div class="bottom">
                <span class="forget">忘记密码？</span>
            </div>
       </div>    
    </v-app>
</template>

<script>
export default {}
</script>

<style lang="scss">
.login{
    width: 350px;
    height: 380px;
    margin: 200px auto;
    border-radius: 5px;
    box-shadow: 5px 5px 5px 5px #888888;
    .title{
        width: 100%;
        height: 50px;
        .tleft{
            font-size: 16px;
            margin-top: 10px;
            margin-left: 10px;
            float: left;
        }
        .tright{
            width: 32px;
            margin-top: 10px;
            text-align: center;
            margin-right: 10px;
            font-size: 20px;
            // margin-right: 10px;
            float: right;
            cursor:pointer;
        }
    }
    .median{
        width: 100%;
        height: 280px;
        // background-color: skyblue;
        h3{
            padding-top: 10px;
            text-align: center;
        }
        .user{
            outline: none;
            width: 300px;
            height: 50px;
            // padding-left: 10px;
            margin: 15px 25px;
            // border: 1px solid #777777;
            // border-radius: 5px;
        }
        .btn{
            width: 300px;
            height: 50px; 
            margin: 15px 25px;
        }
    }
    .bottom{
        width: 100%;
        .forget{
            float: left;
            margin-left: 25px;
            color: rgb(1, 1, 250);
            cursor: pointer;
        }
    }
}

</style>