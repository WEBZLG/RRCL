<template>
    <div class="personInfro">
       <div>
           <div class="personHeader">
               <Avatar src="http://www.qqzhi.com/uploadpic/2015-01-15/202249542.jpg" />
                <div>
                    <h3>{{this.userName}}</h3>
                </div>
           </div>
           <div class="personDetails">
               <div>
                    <label for="personNickname">
                        性别：<span>{{this.sex}}</span>
                    </label>
               </div>
               <div>
                    <label for="personNickname">
                        身份证号码：<span>{{this.idCard}}</span>
                    </label>
               </div>
               <div>
                    <label for="personNickname">
                        职位级别：<span>{{this.level}}</span>
                    </label>
               </div>
               <div>
                    <label for="personNickname">
                        手机/电话：<span>{{this.phone}}</span>
                    </label>
               </div>
                <div>
                    <label for="personNickname">
                        邮箱：<span>{{this.email}}</span>
                    </label>
               </div>
               <div>
                    <label for="personNickname">
                        账户认证状态：<span>{{this.status}}</span>
                    </label>
               </div>
            
           </div>
       </div>
    </div>
</template>
<script>
import Vue from 'vue'
export default {
  name: "add",
  data() {
    return {
      value: "",
      userName:'',
      idCard:'',
      email:'',
      phone:'',
      sex:'',
      level:'',
      status:''
    };
  },
  created(){
      this.userName = this.$store.state.user
      this.getPersonInformation();
  },
  methods: {
    valueChange: function() {
      var obj = this;
      this.$emit("value", obj.value);
    },
    getPersonInformation:function(){
        var param = new URLSearchParams()
        param.append('userName',this.userName)
        this.$axios.post('http://172.16.201.189:8083/rock/user/getUserInfo.action',param,{
            xhrFields: {
                withCredentials: true
            }          
        })
        .then((res)=> {
            console.log(res)
           this.idCard = res.data.userInfo.idcard
           this.email = res.data.userInfo.email
           this.phone = res.data.userInfo.phone
           this.level = res.data.userInfo.level
           if(res.data.userInfo.sex ===1){
              this.sex = "男"
           }else{
              this.sex = "女"
           };
           switch (res.data.userInfo.status)
                {
                case 0:
                this.status = "未认证";
                break;
                case 1:
                this.status = "审核中";
                break;
                case 2:
                this.status = "通过";
                break;
                case 3:
                this.status = "未通过";
                break;
                }
        })
        .catch(function(error) {
            Vue.prototype.$Message.error('获取消息失败！');
            }); 
    }
  }
};
</script>
<style scoped>
h4 {
  margin-bottom: 15px;
}
.personHeader{
    width: 50%;
    margin: 0 auto;
    text-align: center;
}
.personDetails{
    width: 50%;
    margin: 0 auto;
}
</style>
