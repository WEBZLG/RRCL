<template>
    <div class="personInfro">
       <div>
           <div class="personHeader">
               <Avatar src="http://www.qqzhi.com/uploadpic/2015-01-15/202249542.jpg" />
                <div>
                    <h3>数字驿站</h3>
                    <h4>数字驿站网络科技有限公司</h4>
                </div>
           </div>
           <div class="personDetails">
               <div>
                    <label for="personNickname">
                        用户昵称：<span>数字驿站</span>
                    </label>
               </div>
               <div>
                    <label for="personNickname">
                        性别：<span>男</span>
                    </label>
               </div>
               <div>
                    <label for="personNickname">
                        职位级别：<span>高管</span>
                    </label>
               </div>
               <div>
                    <label for="personNickname">
                        生日：<span>2018-08-08</span>
                    </label>
               </div>
               <div>
                    <label for="personNickname">
                        手机/电话：<span>18888888888</span>
                    </label>
               </div>
                <div>
                    <label for="personNickname">
                        邮箱：<span>18888888888@sina.com</span>
                    </label>
               </div>
            
           </div>
       </div>
    </div>
</template>
<script>
export default {
  name: "add",
  data() {
    return {
      value: ""
    };
  },
  methods: {
    valueChange: function() {
      var obj = this;
      this.$emit("value", obj.value);
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
