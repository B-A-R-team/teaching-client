<template>
    <v-app>
        <div class="mesBox">
            <div class="listBox">
                <v-list class="meslist">
                    <h1>个人信息修改</h1>
                    <v-list-item>
                        <label>头像：</label>
                        <!-- 默认头像 -->
                        <v-avatar color="primary" size="60">
                            <img src="https://cdn.vuetifyjs.com/images/john.jpg" >
                        </v-avatar>
                        <!-- 上传头像 不能就删-->
                        <v-file-input class="upCam" label="File input" hide-input filled
                            prepend-icon="mdi-camera"> 
                        </v-file-input>

                    </v-list-item>
                    <v-list-item>
                        <label>姓名：</label>
                        <v-text-field label="Name" v-model="name"></v-text-field>
                    </v-list-item>
                    <v-list-item>
                        <label>性别：</label>
                        <v-radio-group row>
                            <v-radio value="male" label="男"></v-radio>
                            <v-radio value="female" label="女"></v-radio>
                        </v-radio-group>
                    </v-list-item>
                    <v-list-item>
                        <label>工号：</label>
                        <v-text-field label="StudentID" v-model="job_id"></v-text-field>
                    </v-list-item>
                    <v-list-item>
                        <label>电话：</label>
                        <v-text-field label="PhoneNumber" v-model="phone"></v-text-field>
                    </v-list-item>
                </v-list>
                <v-btn class="btn" elevation="2" large medium >保存</v-btn>
                <v-btn class="btn" elevation="2" large medium >重置</v-btn>
            </div>
        </div>
    </v-app>
</template>

<script>
export default {
    data(){
        return {
            avatar:'',
            name:'',
            phone:'',
            job_id:''
        }
    },
    methods:{
        getUserMessage(){
            const myUserInfo = JSON.parse(
            window.localStorage.getItem("userInfo") || "{}"
             );
            this.name = myUserInfo.name;
            this.avatar = myUserInfo.avatar;
            this.phone = myUserInfo.phone;
            this.job_id = myUserInfo.job_id;
        }
    }
}
</script>

<style lang="scss">
.mesBox{
    width: 1200px;
    margin: 0 auto;
    .listBox{
        width: 800px;
        margin: 0 auto;
        .meslist{
            h1{
                margin: 20px;
            }
            .upCam{
                margin-left: 10px;
            }
        }
        .btn{
            width: 100px;
            height: 40px; 
            margin: 15px 25px;
        }
    }
}
</style>