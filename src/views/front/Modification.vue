<template>
    <v-app>
        <v-card class="mesBox" elevation="5">
            <v-card-title>
                <h2 class="mx-auto">个人信息修改</h2>
            </v-card-title>
            <div class="listBox mx-auto">
                <v-list class="meslist">
                    <v-list-item>
                        <v-avatar class="avater mx-auto" color="primary" size="60" @click="updateAvt">
                            <img :src="avatar" >
                        </v-avatar>
                    </v-list-item>
                    <v-list-item>
                        <p class="name mx-auto">{{name}}</p>
                    </v-list-item>
                    <v-list-item width="400px">
                        <div class="unMod">
                            <div class="fl">
                                <label>工号：</label>
                                <span>{{job_id}}</span>
                            </div>
                            <div class="fr">
                                <label>ID：</label>
                                <span>{{id}}</span>
                            </div>
                        </div>
                    </v-list-item>
                    <v-list-item>
                        <label>性别：</label>
                        <v-radio-group row v-model="gender" mandatory>
                            <v-radio value="0" label="男" ></v-radio>
                            <v-radio value="1" label="女" ></v-radio>
                        </v-radio-group>
                    </v-list-item>
                    <v-list-item>
                        <label>电话：</label>
                        <v-text-field label="PhoneNumber" v-model="phone"></v-text-field>
                    </v-list-item>
                </v-list>
                <v-btn class="btn" elevation="2" large medium @click='upDateMes'>保存</v-btn>
                <v-btn class="btn" elevation="2" large medium >重置</v-btn>
            </div>
        </v-card>
    </v-app>
</template>

<script>
import { getToken } from "@/utils/auth";
import { request } from '@/utils';
export default {
    data(){
        return {
            name:'',
            avatar:'',
            job_id:'',
            id:'',
            phone:'',
            gender:'',
            token:'',
            myUserInfo:{}
        }
    },
    inject: ["changeLoginState"],
    created(){
        this.getUserMessage()
    },
    methods:{
        getUserMessage(){
            this.myUserInfo = JSON.parse(
            window.localStorage.getItem("userInfo") || "{}"
             );
            const myUserInfo = this.myUserInfo;
            this.token = getToken('vue_teaching_token');
            this.name = myUserInfo.name;
            this.job_id = myUserInfo.job_id;
            this.avatar = myUserInfo.avatar;
            this.phone = myUserInfo.phone;
            this.id = myUserInfo.id;

        },
        async upDateMes() {
            const { id, phone,avatar,gender} = this;
            this.myUserInfo.phone = phone;
            this.myUserInfo.avatar = avatar;
            this.myUserInfo.gender = gender;
            
            const res = await request({
                url: '/user/update',
                method: 'put',
                data: { id,phone,avatar,gender },
            });
            console.log(res);
            if (res.code === 200 && res.data.msg) {

                //更新localStorage中数据
                // window.localStorage.setItem("userInfo", JSON.stringify(this.myUserInfo));
                //更新登录状态
                // this.changeLoginState();

                this.$router.push("/");
                
                return this.$message({
                    type: "success",
                    message: res.data.msg,
                    duration: 2000,
                });
            }else{
                return this.$message({
                    type: "error",
                    message: "更新失败",
                    duration: 2000,
                });
            }
        },
        updateAvt(){
            //创建input
            const upload = document.createElement("input");
            //设置type为file
            upload.type = "file";
            //类型
            upload.accept = "image/png, image/jpeg";
            //添加onchange事件
            upload.onchange = this.setFile;
            //模拟点击
            upload.click();
            
        },
        setFile(e) {
            //获取文件
            const file = e.path[0].files[0];
            //将其放入formdata中方便上传
            const formData = new FormData();
            formData.append("imgFile", file);
            const ImgUrl = window.URL.createObjectURL(file);
            this.avatar = ImgUrl;
            // console.log(this.avatar);
        }
    }
}
</script>

<style lang="scss">
.mesBox{
    width: 800px;
    height:600px;
    margin: 0 auto;
    background: url(https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg);
    background-size:100%;
    .listBox{
        width: 400px;
        .avater{
            margin-top: 10px;
        }
        .unMod{
            width: 400px;
            .fl{
                float: left;
            }
            .fr{
                float: right;
            }
        }
        
        .name{
            line-height: 40px;
            font-size: 20px;
            // display: inline-block;
            margin-left: 30px;
            
        }
        .btn{
            width: 370px;
            height: 30px;
            margin: 15px auto;
            background-color: #40a9ff;
            color: #fff;
        }
        
    }
}
</style>