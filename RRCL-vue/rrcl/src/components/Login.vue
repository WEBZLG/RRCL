<template>
  <div class="login">
        <vue-particles
        color="#fff"
        :particleOpacity="0.7"
        :particlesNumber="60"
        shapeType="circle"
        :particleSize="4"
        linesColor="#fff"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="2"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
        class="lizi"
      >
      </vue-particles>
      <Form ref="loginformValidate" :model="loginformValidate" :rules="loginRules">
        <transition name="fade">
          <div class="loginBox" v-show="boxShow">
            <h2>滚石唱片影音授权系统</h2>
            <FormItem  prop="loginusername">
              <Input v-model="loginformValidate.loginusername"  type="text" icon="card" placeholder="身份证号码"></Input>
            </FormItem>
            <FormItem  prop="loginpassword">
              <Input v-model="loginformValidate.loginpassword"  type="password" icon="locked" placeholder="密码"></Input>
            </FormItem>
            <Button type="primary" long @click="loginSubmit('loginformValidate')">登录</Button>
            <Row>
              <Col :span="12">
                <a href="#" class="register" @click="toggle">还没有账号?马上注册</a>
              </Col>
              <Col :span="12">
                <a href="#" class="forger">忘记密码?</a>
              </Col>
            </Row>
          </div>
        </transition>
      </Form>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate">
        <transition name="fade">
          <div class="loginBox registerBox" v-show="!boxShow">
            <h2>滚石唱片影音授权系统</h2>
            <FormItem prop="idcard">
              <Input v-model="formValidate.idcard" type="text" icon="card" placeholder="身份证号"></Input>
            </FormItem>
            <!-- <FormItem prop="username">
              <Input v-model="formValidate.username" type="text" icon="person" placeholder="用户名"></Input>
            </FormItem> -->
            <FormItem prop="password">
              <Input v-model="formValidate.password"  type="password" icon="locked" placeholder="设置密码"></Input>
            </FormItem>
            <FormItem prop="surepassword">
              <Input v-model="formValidate.surepassword" type="password" icon="locked" placeholder="确认密码"></Input>
            </FormItem>
            <FormItem prop="phonenum">
              <Input v-model="formValidate.phonenum" type="text" icon="ios-contact" placeholder="手机号"></Input>
            </FormItem>
            <FormItem prop="validateCode">
              <Row>
                <Col :span="17">
                  <Input v-model="formValidate.validateCode" type="text" placeholder="请输入收到的验证码"></Input>
                </Col>
              <Col :span="6" :offset="1">
                  <Button type="primary" @click="getValidate()">{{validateName}}</Button>
                </Col>
              </Row>
            </FormItem>
            <Checkbox v-model="single">同意滚石产品协议</Checkbox>
            <Row :gutter="12">
              <Col :span="12">
                <Button type="success" long @click="toggle">返回登录</Button>
              </Col>
              <Col :span="12">
                <Button type="primary" long @click="handleSubmit('formValidate')">注册</Button>
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
    var  userid = function(rule, value, callback){
        if(!value){
            return callback(new Error("请输入用户ID"));
        }else if(!/^[\w\_]{3,8}$/u.test(value)){
            return callback(new Error("以英文开头、数字、下划线3-8位字符"))
        }else{
            callback();
        }
    };
    // var  username = function(rule, value, callback){
    //     if(!value){
    //         return callback(new Error("请输入用户名称"));
    //     }else if(!/^[\w\_]{3,8}$/u.test(value)){
    //         return callback(new Error("以英文开头、数字、下划线3-8位字符"))
    //     }else{
    //         callback();
    //     }
    // };
    var  loginusername = function(rule, value, callback){
      var carddl = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|31)|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}([0-9]|x|X)$/;
      var cardtw =/[A-Z][0-9]{9}/;
      var cardam =/^[1|5|7][0-9]{6}\([0-9Aa]\)/;
      var cardxg =/[A-Z]{1,2}[0-9]{6}([0-9A])/;
        if (value === '') {
            callback(new Error('请输入身份证号'));
        } else if(carddl.test(value)||cardtw.test(value)||cardam.test(value)||cardxg.test(value)){
          callback();
          } else{
            return callback(new Error("请输入正确证件号码"))
        }
    };
    var loginpassword = function(rule, value, callback) {
        if (value === '') {
            callback(new Error('请输入密码'));
        } else if(!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(value)){
            return callback(new Error("密码由6-16字母和数字组成，不能是纯数字或纯英文"))
        } else{
          callback();
        }
    };
    var pwd = '';
    var password = function(rule, value, callback) {
        if (value === '') {
            callback(new Error('请输入密码'));
        } else if(!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(value)){
            return callback(new Error("密码由6-16字母和数字组成，不能是纯数字或纯英文"))
        } else{
          pwd=value;
          callback();
        }
    };
    var surepassword = function(rule, value, callback){
        if (value === '') {
            return callback(new Error('请再次输入密码'));
        } else if(value !== pwd) {
            return callback(new Error("密码不一致"))
        } else {
            callback();
        }
    };
    var idcard = function(rule, value, callback){
      var carddl = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|31)|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}([0-9]|x|X)$/;
      var cardtw =/[A-Z][0-9]{9}/;
      var cardam =/^[1|5|7][0-9]{6}\([0-9Aa]\)/;
      var cardxg =/[A-Z]{1,2}[0-9]{6}([0-9A])/;
        if (value === '') {
            callback(new Error('请输入身份证号'));
        } else if(carddl.test(value)||cardtw.test(value)||cardam.test(value)||cardxg.test(value)){
          callback();
          } else{
            return callback(new Error("请输入正确证件号码"))
        }
    };
    var phonenum = function(rule, value, callback){
        if (value === '') {
            callback(new Error('请输入手机号'));
        } else if(!/^1[3-8][0-9]{9}$/.test(value)){
            return callback(new Error("请输入正确手机号码"))
        } else{
          callback();
        }
    };

    return {
      validateName: '获取验证码',
      single: true,
      boxShow: true,
      loginformValidate: {
        loginusername: "",
        loginpassword: "",
      },
      formValidate: {
        // username: "",
        userid: "",
        password: "",
        surepassword: "",
        idcard:"",
        phonenum:"",
        validateCode: ''
      },
      loginRules:{
        loginusername: [
          {
            validator:loginusername,
            required: true,
            trigger: "blur"
          }
        ],
        loginpassword: [
          {
            validator:loginpassword,
            required: true,
            trigger: "blur",
            min:6,
            message:'请输入由6-16字母和数字组成的密码'
          }
        ]
      },
      ruleValidate: {
        // username: [
        //   {
        //     validator:username,
        //     required: true,
        //     trigger: "blur"
        //   }
        // ],
        userid: [
          {
            validator:userid,
            required: true,
            trigger: "blur"
          }
        ],
        password: [
          {
            validator:password,
            required: true,
            trigger: "blur",
            min:6,
            message:'请输入由6-16字母和数字组成的密码'
          }
        ],
        surepassword: [
          {
            validator:surepassword,
            required: true,
            trigger: "blur"
          }
        ],
        idcard: [
          {
            validator:idcard,
            required: true,
            trigger: "blur"
          }
        ],
        phonenum: [
          {
            validator:phonenum,
            required: true,
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    toggle: function() {
      this.boxShow = !this.boxShow;
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
    loginSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("登录成功！");
          this.$router.replace('/Home')
        } else {
          this.$Message.error("登录失败！请填写正确信息！");
        }
      });
    },
       // 手机验证码定时器
    setTimeDown () {
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
      if (this.loginForm.phone === null || this.loginForm.phone === '') {
        const _self = this
        _self.$message({
          showClose: true,
          message: '手机号不能为空',
          type: 'error'
        })
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
h2{
  text-align: center;
  color: #fff;
  padding-bottom: 15px;  
}
.login{
  height: 100%;
  overflow: hidden;
  background-color: #000;
}
.loginBox {
  width: 30%;
  position: absolute;
  top: 20%;
  left: 35%;
  padding: 20px;
  background-color:rgba(255, 255, 255, 0.3);
}

.loginBox button {
  margin-bottom: 15px;
}
.register,.forger {
  display: block;
  color:#fff;
  text-align: left;
}
.forger{
  text-align: right;
}
.ivu-input-type .ivu-input-icon {
  left: 0;
}
.ivu-input-type .ivu-input-icon-normal + .ivu-input {
  padding-left: 32px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.05s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.ivu-checkbox-wrapper {
  margin-bottom: 10px;
  color: #fff;
}
.ivu-input-type .ivu-input-icon-normal + .ivu-input,.ivu-input{
  background-color: inherit;
  color: #fff;
}

</style>
