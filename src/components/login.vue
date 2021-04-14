<template>
    <v-app>
        <div class="page">
            <div class="bgImg">
                <div class="login">
                    <div class="median">
                        <h3>工号密码登录</h3>
                        <v-text-field class="user" label="请输入工号" v-model="job_id"></v-text-field>
                        <v-text-field class="user" :type="'password'" label="请输入密码" v-model="password"></v-text-field>
                        <v-btn class="btn"
                        elevation="2" large medium @click="postComment">登录</v-btn>
                        <v-btn class="btn"
                        elevation="2" large medium  @click="remove">重置</v-btn>
                    </div>
                    <div class="bottom">
                        <span class="forget">忘记密码？</span>
                    </div>
                </div>    
            </div>
        </div>
    </v-app>
</template>

<script>
import Cookies from 'js-cookie'

export default {
    data(){
        return{
            job_id:"",
            password:""

        }
    },
    methods:{
        postComment(){
            if(this.job_id.length > 0 || this.password.length > 0){
                this.$http({
                    method:'post',
                    url:'http://www.zxyc.xyz:3450/user/login',
                    data:{
                        job_id:this.job_id,
                        password:this.password
                    }
                }).then((res) => {
                    var data=res.data;
                    console.log(data);
                    if(data.data.msg){
                        alert(data.data.msg);
                        sessionStorage.setItem("msg",data.data.msg);
                    }
                    else{
                        alert("登录成功");
                        sessionStorage.setItem("name",data.data.name);
                        sessionStorage.setItem("job_id",data.data.job_id);
                        sessionStorage.setItem("phone",data.data.phone);
                        sessionStorage.setItem("avatar",data.data.avatar);
                        sessionStorage.setItem("role_id",data.data.role_id);
                        sessionStorage.setItem("id",data.data.id);
                        Cookies.set("token",data.data.token);
                        
                    }
                    
                })
            }else{
                alert("请输入完整的工号和密码");
            }
    },
    remove(){
        this.job_id = "",
        this.password = ""
    }
    }
    

}
</script>

<style lang="less">
.page{
    width: 100%;
    // height: 100%;
    overflow: hidden;
    background-color: #eea8a6;
    .bgImg{
        padding-top: 150px;
        width: 1300px;
        margin: 0 auto;
        height: 750px;
        background-image: url('../../public/images/girs2.png');
        background-size:contain;
    }
   
}

.login{
    width: 350px;
    height: 500px;
    margin: 0 auto;
    display: block;
    .median{
        width: 100%;
        height: 350px;
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