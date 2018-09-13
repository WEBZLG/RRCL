<template>
    <div class="information">
        <div class="infor">
            <h3>请您完善信息！提交后审核通过即可获得更多权限</h3>
            <Tabs>
                <TabPane label="企业/公司认证" icon="ios-people">
                    <Form ref="formValidate" :model="formValidate" label-position="left" :label-width="100" :rules="ruleValidate">
                        <FormItem label="姓名" prop="name">
                            <Input v-model="formValidate.name"></Input>
                        </FormItem>
                        <FormItem label="身份证号" prop="idcard">
                            <Input v-model="formValidate.idcard"></Input>
                        </FormItem>
                        <FormItem label="证件照" prop="idcardimg">
                            <div>
                                <!-- <Upload
                                    :before-upload="handleUploadCard"
                                    action="//">
                                    <Button icon="ios-cloud-upload-outline">上传身份证照片</Button>
                                </Upload>
                                <div v-if="fileCard !== null">Upload file: {{ fileCard.name }} <Button type="text" @click="uploadCard" :loading="loadingStatus">{{ loadingStatus ? 'Uploading' : '上传文件' }}</Button></div> -->
                            </div>
                        </FormItem>
                        <FormItem prop="birthdate" label="出生日期">
                            <DatePicker type="date" placeholder="选择日期" v-model="formValidate.birthdate"></DatePicker>
                        </FormItem>
                        <FormItem label="性别" prop="sex">
                            <RadioGroup v-model="formValidate.sex">
                                <Radio label="1">男</Radio>
                                <Radio label="2">女</Radio>
                            </RadioGroup>
                        </FormItem>
                        <FormItem label="年龄" prop="age">
                            <Input v-model="formValidate.age"></Input>
                        </FormItem>
                        <FormItem label="公司名称" prop="company">
                            <Input v-model="formValidate.company"></Input>
                        </FormItem>
                        <FormItem label="公司资质" prop="qualification">
                            <div>
                                <Upload
                                    ref="file"
                                    :before-upload="handleUploadCp"
                                    :on-success="uploadSuccess"
                                    :on-error="uploadError"
                                    name="file"
                                    action="http://172.16.201.189:8083/rock/file/upload.action"
                                    >
                                    <Button icon="ios-cloud-upload-outline">上传公司资质文件</Button>
                                </Upload>
                                <div v-if="file !== null">Upload file: {{ file.name }}</div>
                            </div>
                        </FormItem>
                        <FormItem label="联系电话" prop="call">
                            <Input v-model="formValidate.call"></Input>
                        </FormItem>
                        <FormItem label="Email" prop="email">
                            <Input v-model="formValidate.email"></Input>
                        </FormItem>
                        <!-- <FormItem label="QQ">
                            <Input v-model="formValidate.qq"></Input>
                        </FormItem>
                        <FormItem label="微信">
                            <Input v-model="formValidate.weixin"></Input>
                        </FormItem> -->
                    </Form>
                    <div class="btns">
                        <Button type="success" @click="handleReset('formValidate')">重置</Button>
                        <Button type="primary" @click="handleSubmit('formValidate')" :disabled='btnDis'>提交</Button>
                    </div>
                </TabPane>
                <TabPane label="企业/公司员工认证" icon="ios-person">
                    <add-info></add-info>
                </TabPane>
                <TabPane label="普通用户认证" icon="ios-person">
                    <add-info2></add-info2>
                </TabPane>
            </Tabs>
        </div>
    </div>
</template>
<script>
import addInfo from '../details/addInfo'
import addInfo2 from '../details/addInfo2'
    export default {
        data () {
            return {
                fileCard: null,
                file: null,
                loadingStatus: false,
                data:"",
                btnDis:false,
                formValidate: {
                    name: '',
                    sex: '',
                    idcard:'',
                    birthdate:'',
                    age: '',
                    company:'',
                    qualification:'',
                    call:'',
                    email:'',
                    // qq:'',
                    // weixin:'',
                    level:''
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '用户名不能为空', trigger: 'blur' }
                    ],
                    idcard: [
                        { required: true, message: '身份证号不能为空', trigger: 'blur' }
                    ],
                    birthdate: [
                        { required: true,  type: 'date', message: '出生日期不能为空', trigger: 'change' }
                    ],
                    age: [
                        { required: true, message: '年龄不能为空', trigger: 'blur' }
                    ],
                    sex: [
                        { required: true, message: '请选择性别', trigger: 'blur' }
                    ],
                    company: [
                        { required: true, message: '公司名称不能为空', trigger: 'blur' }
                    ],
                    qualification: [
                        { required: true, message: '公司资质不能为空', trigger: 'blur' },
                    ],
                    call: [
                        { required: true, message: '联系电话不能为空', trigger: 'blur' },
                    ],
                    email: [
                        { required: true, message: '邮箱不能为空', trigger: 'blur' }
                    ],
                    idcardimg: [
                        { required: true, message: '证件不能为空', trigger: 'blur' }
                    ]
                }
            }
        },
        components:{
            addInfo,addInfo2
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                     console.log(valid)
                    var param = new URLSearchParams()
                    param.append('userId',this.formValidate.name)
                    param.append('email',this.formValidate.email)
                    param.append('realName',this.formValidate.realName)
                    param.append('idcard',this.formValidate.idcard)
                    param.append('idcardPhoto',this.formValidate.idcardPhoto)
                    param.append('addr',this.formValidate.address)
                    param.append('birthday',this.formValidate.birthdate)
                    param.append('sex',this.formValidate.sex)
                    param.append('level',this.formValidate.level)
                    param.append('companyInfo.name',this.formValidate.company)
                    param.append('companyInfo.apt',this.formValidate.qualification)
                    this.$axios.post('/rock/auth/submitInfo',param)
                        .then(function(res) {
                        console.log(res)
                        if (res.data.code === 0) {
                            Vue.prototype.$Message.info('提交成功!请耐心等待审核，审核时间为1~3天！');
                            this.btnDis = true;
                        //跳到目标页
                        this.$router.push("/Home");
                        } else if (res.data.code === -1) {
                            Vue.prototype.$Message.error('提交失败!'+res.data.msg);
                        }
                        })
                        .catch(function(error) {
                        Vue.prototype.$Message.error('提交失败！');
                        });
                    } else {
                        this.$Message.error('请填写完整信息!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            handleUploadCard (file) {
                this.fileCard = file;
                return false;
            },
            handleUploadCp (file) {
                this.file = file;
                console.log(this.file.name)
                // return false;
            },
            uploadCard () {
                this.loadingStatus = true;
                console.log(this.file)
                setTimeout(() => {
                    this.fileCard = null;
                    this.loadingStatus = false;
                    this.$Message.success('Success')
                }, 1500);
            },
            uploadCp () {
                this.loadingStatus = true;
                console.log(this.file)
                setTimeout(() => {
                    this.file = null;
                    this.loadingStatus = false;
                    this.$Message.success('Success')
                }, 1500);
            },
            uploadSuccess(res, file){
                console.log(res,file)
                console.log("success")
            },
            uploadError(res, file){
                console.log(res,file)
                console.log("faile")
            }
        } 
    }
</script>
<style scoped>
.information{
    width: 48%;
    margin-left: 2%;
}
.btns{
    text-align: right;
}
h3{
    color: #ff0000;
}
.infor{
    width: 98%;
    margin:0 auto;
}
</style>
