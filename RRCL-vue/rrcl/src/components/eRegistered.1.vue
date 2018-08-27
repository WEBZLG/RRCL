<template>
    <div>
        <Form ref="ruleForm" :model="ruleForm" :rules="rules">
            <transition name="fade">
                <div class="loginBox registerBox" >
                <h2>滚石唱片影音授权系统</h2>
                <FormItem prop="username">
                    <Input v-model="ruleForm.username" type="text" placeholder="用户名">
                    <Icon type="ios-contact" slot="prepend"/>
                    </Input>
                </FormItem>
                <FormItem prop="emailnum">
                    <Input v-model="ruleForm.emailnum" type="text" placeholder="E-mail">
                    <Icon type="md-mail" slot="prepend"/>
                    </Input>
                </FormItem>

                <FormItem prop="password">
                    <Input v-model="ruleForm.password"  type="password"  placeholder="设置密码">
                    <Icon type="ios-lock-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="surepassword">
                    <Input v-model="ruleForm.surepassword" type="password"  placeholder="确认密码">
                    <Icon type="ios-lock-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="validateCode" class="codeNum">
                    <Row>
                        <Col :span="17">
                            <Input v-model="ruleForm.validateCode" type="text" placeholder="请输入验证码"></Input>
                        </Col>
                        <Col :span="6" :offset="1">
                            <Button type="primary" @click="getValidate('ruleForm')">{{validateName}}</Button>
                        </Col>
                    </Row>
                </FormItem>
                <Checkbox v-model="single">同意滚石产品协议</Checkbox>
                <Row :gutter="12">
                    <Col :span="12">
                    <Button type="success" long @click="jump()">返回登录</Button>
                    </Col>
                    <Col :span="12">
                    <Button type="primary" long @click="handleSubmit('ruleForm')">注册</Button>
                    </Col>
                </Row>
                </div>
            </transition>
        </Form> 
    </div>
</template>
<script>
export default {
  data() {
    var usernameCheck = function(rule, value, callback) {
                if (value === '') {
                    callback(new Error('请输入用户名'));
                } else if(!/^[a-zA-Z0-9_]{4,16}$/.test(value)){
                    return callback(new Error("用户名由4到16位（字母，数字，下划线）组成"))
                } else{
                callback();
                }
            };
    var passwordCheck =function(rule, value, callback) {
                // if (value === '') {
                //     callback(new Error('请输入密码'));
                // } else if(!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(value)){
                //     return callback(new Error("密码由6-16字母和数字组成，不能是纯数字或纯英文"))
                // } else{
                // callback();
                // }
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.ruleForm.surepassword !== '') {
                this.$refs.ruleForm.validateField('surepassword');
                }
                callback();
            }
            };
    var surepasswordCheck = function(rule, value, callback){
                if (value === '') {
                    return callback(new Error('请再次输入密码'));
                } else if(value != this.ruleForm.password) {
                    return callback(new Error("密码不一致"))
                } else {
                    callback();
                }
            }
    var emailnumCheck =function(rule, value, callback){
                if (value === '') {
                    callback(new Error('请输入邮箱'));
                } else if(!/^((([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})[; ,])*(([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})))$/.test(value)){
                    return callback(new Error("请输入邮箱"))
                } else{
                callback();
                }
            };
    var validateCodeCheck =function(rule, value, callback){
                if (value === '') {
                    callback(new Error('请输入验证码'));
                } else if(!/^[0-9]*$/.test(value)){
                    return callback(new Error("请输入正确验证码"))
                } else{
                callback();
                }
            };
    return {
      validateName: '获取验证码',
      single: true,   
      ruleForm: {
        password: "",
        surepassword: "",
        emailnum:"",
        validateCode:"",
        username:""
      },
      rules: {
        username:[{
            validator:usernameCheck,
            required: true,
            trigger: "blur",
            // message:'请输入4到16位（字母，数字，下划线）用户名' 
        }],
        password: [
          {
            validator:passwordCheck,
            required: true,
            trigger: "blur",
            min:6,
            // message:'请输入由6-16字母和数字组成的密码'
          }
        ],
        surepassword: [
          {
            validator:surepasswordCheck,
            required: true,
            trigger: "blur",
            // message:'请输入由6-16字母和数字组成的密码'
          }
        ],
        emailnum: [
          {
            validator:emailnumCheck,
            required: true,
            trigger: "blur",
            // message:'请输入正确格式的邮箱'
          }
        ],
        validateCode: [
          {
            validator:validateCodeCheck,
            required: true,
            trigger: "blur",
            // message:'请输入验证码'
          }
        ]
      }
    }

  },
  methods: {
      jump:function(){
        this.$router.push({ path: '/userLogin'})
      },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("注册成功");
          this.$router.replace('/Information')
        } else {
          this.$Message.error("注册失败！请填入正确信息！");
        }
      });
    },
    // 验证码定时器
    setTimeDown() {
      if (countDown === 0) {
        this.validateDisabled = false
        this.validateName = '重新获取'
        countDown = 60
        return
      } else {
        this.validateDisabled = true
        this.validateName = countDown + 's'
        countDown--
      }
      const _self = this
      this.timer = setTimeout(() => {
        _self.setTimeDown()
      }, 1000)
    },
    getValidate () {
        if (this.validateDisabled) {
            return
        }
            if (countDown >= 60) {
                const _self = this
                this.$http.get(`/v1/sms/` + this.loginForm.phone, null).then(data => {
                _self.$message({
                    showClose: true,
                    message: '发送验证码成功',
                    type: 'sucess'
                })
                }).catch(errMsg => {
                _self.$message({
                    showClose: true,
                    message: errMsg,
                    type: 'error'
                })
                })
            }
            this.setTimeDown()
    }
  }
};
</script>
<style>
.codeNum.ivu-form-item{
    margin-bottom: 0
}
.codeNum .ivu-form-item-error-tip{
    top: 63%;
}
</style>
