<template>
    <v-app>
        <div class="mesBox">
            <div class="listBox">
                <v-list class="meslist">
                    <h1>个人信息修改</h1>
                    <v-list-item>
                        <!-- <v-list-item-content>
                            <v-list-item-title>
                                
                                
                            </v-list-item-title>
                            <v-list-item-subtitle> </v-list-item-subtitle>
                        </v-list-item-content> -->
                        <label>头像：</label>
                        <v-avatar color="primary" size="60">
                            <img src="https://cdn.vuetifyjs.com/images/john.jpg" >
                        </v-avatar>
                        <v-file-input class="upCam" label="File input" hide-input filled
                            prepend-icon="mdi-camera"> 
                        </v-file-input>

                    </v-list-item>
                    <v-list-item>
                        <label>姓名：</label>
                        <v-text-field label="Name" v-model="job_id"></v-text-field>
                    </v-list-item>
                    <v-list-item>
                        <label>性别：</label>
                        <v-radio-group row>
                            <v-radio value="male" label="男"></v-radio>
                            <v-radio value="female" label="女"></v-radio>
                        </v-radio-group>
                    </v-list-item>
                    <v-list-item>
                        <label>年龄：</label>
                        <v-text-field label="Age" v-model="job_id"></v-text-field>
                    </v-list-item>
                    <v-list-item>
                        <label>学号：</label>
                        <v-text-field label="StudentID" v-model="job_id"></v-text-field>
                    </v-list-item>
                    <v-list-item>
                        <label>电话：</label>
                        <v-text-field label="PhoneNumber" v-model="job_id"></v-text-field>
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
            selected:['male'],
        }
        
    }
}
</script>

<style lang="less">
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
            height: 50px; 
            margin: 15px 25px;
        }
    }
}
</style>