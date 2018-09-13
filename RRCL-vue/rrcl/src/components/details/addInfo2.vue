<template>
    <div class="addInfo">
        <Form ref="formValidate" :model="formValidate" label-position="left" :label-width="100" :rules="ruleValidate">
            <FormItem label="姓名" prop="name">
                <Input v-model="formValidate.name"></Input>
            </FormItem>
            <FormItem label="身份证号" prop="idcard">
                <Input v-model="formValidate.idcard"></Input>
            </FormItem>
            <FormItem label="证件照" prop="idcardimg">
                <div>
                    <Upload
                        :before-upload="handleUpload"
                        action="//">
                        <Button icon="ios-cloud-upload-outline">上传身份证照片</Button>
                    </Upload>
                    <div v-if="file !== null">Upload file: {{ file.name }} <Button type="text" @click="upload" :loading="loadingStatus">{{ loadingStatus ? 'Uploading' : '上传文件' }}</Button></div>
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
    </div>
</template>
<script>
    export default {
        data () {
            return {
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
                    call:'',
                    email:'',
                    // qq:'',
                    // weixin:'',
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
                    // param.append('level',this.formValidate.level)
                    param.append('companyInfo.name',this.formValidate.company)
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
                    } else {
                        this.$Message.error('请填写完整信息!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            handleUpload (file) {
                this.file = file;
                return false;
            },
            upload () {
                this.loadingStatus = true;
                setTimeout(() => {
                    this.file = null;
                    this.loadingStatus = false;
                    this.$Message.success('Success')
                }, 1500);
            }
        } 
    }
</script>
<style>
.btns{
    text-align: right;
}
</style>
