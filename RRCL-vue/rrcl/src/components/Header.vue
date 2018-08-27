<template>
	<div class="header">
		<Row>
			<Col span="10">
				<div class="logo">
					<img src="../assets/timg.png" alt="加载失败" >
				</div>
				<h3>滚石国际音乐有限公司</h3>	
			</Col>
			<Col span="3" offset="11">
				<div class="headLogo">
					<Avatar src="http://www.qqzhi.com/uploadpic/2015-01-15/202249542.jpg" />
					<Dropdown trigger="click" style="margin-left: 20px">
							<a href="javascript:void(0)">
									欢迎管理员！
									<Icon type="arrow-down-b"></Icon>
							</a>
							<DropdownMenu slot="list">
									<DropdownItem>
										<a href="javascript:void(0)">
											个人信息
										</a>
									</DropdownItem>
									<DropdownItem>
										<a href="javascript:void(0)" @click="logout">
											退出登录
										</a>
									</DropdownItem>
							</DropdownMenu>
					</Dropdown>
				</div>
			</Col>
		</Row>
	</div>
</template>

<script>
import Vue from 'vue'
import axios from "../axios.js";
export default {
  name: "HelloWorld",
  data() {
    return {
      users: ""
    };
  },
  created() {
    // axios.getUser().then(response => {
	// 	console.log(123)
    //   if (response.status === 401) {
    //     //不成功跳转回登录页
    //     this.$router.push("/Login");
    //     //并且清除掉这个token
    //     this.$store.dispatch("UserLogout");
    //   } else {
    //     //成功了就把data.result里的数据放入users，在页面展示
    //     this.users = response.data.result;
    //   }
    // });
  },
  methods: {
    logout() {
	  //清除token
      this.$store.dispatch("UserLogout");
      if (!this.$store.state.token) {
        this.$router.push("/Login");
        this.$message({
          type: "success",
          message: "注销成功"
        });
      } else {
        this.$message({
          type: "info",
          message: "注销失败"
        });
      }
    }
  }
};
</script>

<style scoped>
.header {
  position: relative;
  z-index: 999;
}
img {
  width: 100%;
}
.logo {
  width: 50px;
  height: 41px;
  display: inline-block;
  vertical-align: middle;
}
.ivu-dropdown-rel a {
  color: #fff;
}
h3 {
  display: inline-block;
  vertical-align: middle;
  font-size: 20px;
}
</style>