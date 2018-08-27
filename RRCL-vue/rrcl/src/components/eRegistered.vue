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
                <FormItem prop="email">
                    <Input v-model="ruleForm.email" type="text" placeholder="E-mail">
                    <Icon type="md-mail" slot="prepend"/>
                    </Input>
                </FormItem>

                <FormItem prop="pass">
                    <Input v-model="ruleForm.pass"  type="password"  placeholder="设置密码">
                    <Icon type="ios-lock-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="checkPass">
                    <Input v-model="ruleForm.checkPass" type="password"  placeholder="确认密码">
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
    var username = (rule, value, callback)=> {
                if (value === '') {
                    callback(new Error('请输入用户名'));
                } else if(!/^[a-zA-Z0-9_]{4,16}$/.test(value)){
                    return callback(new Error("用户名由4到16位（字母，数字，下划线）组成"))
                } else{
                callback();
                }
            };
    var pass =(rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }else if(!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(value)){
                        return callback(new Error("密码由6-16字母和数字组成，不能是纯数字或纯英文"))
                    }else{
                        callback();
                        }
                    }
                };
    var checkPass = (rule, value, callback)=> {
                if (value === '') {
                    return callback(new Error('请再次输入密码'));
                } else if(value !== this.ruleForm.pass) {
                    return callback(new Error("密码不一致"))
                } else {
                    callback();
                }
            };
    var email =(rule, value, callback)=> {
                if (value === '') {
                    callback(new Error('请输入邮箱'));
                } else if(!/^((([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})[; ,])*(([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})))$/.test(value)){
                    return callback(new Error("请输入邮箱"))
                } else{
                callback();
                }
            };
    var validateCode =(rule, value, callback)=> {
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
        pass: '',
        checkPass: '',
        email:'',
        validateCode:'',
        username:''
      },
      rules: {
        username:[{
            validator:username,
            required: true,
            trigger: "blur"
        }],
        pass: [
          {
            validator:pass,
            required: true,
            trigger: "blur",
            min:6
          }
        ],
        checkPass: [
          {
            validator:checkPass,
            required: true,
            trigger: "blur"
          }
        ],
        email: [
          {
            validator:email,
            required: true,
            trigger: "blur"
          }
        ],
        validateCode: [
          {
            validator:validateCode,
            required: true,
            trigger: "blur"
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
                axios.userRegister(this.ruleForm)
                .then(({}) => {
                    if (data.success) {
                        this.$message({
                        type: 'success',
                        message: '注册成功'
                        });
                    } else {
                        this.$message({
                        type: 'info',
                        message: '用户名已经存在'
                        });
                    }
                })
            }
        });
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
