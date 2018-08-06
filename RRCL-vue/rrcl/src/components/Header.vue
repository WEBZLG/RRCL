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
									<DropdownItem>个人信息</DropdownItem>
									<DropdownItem>退出登录</DropdownItem>
							</DropdownMenu>
					</Dropdown>
				</div>
			</Col>
		</Row>
	</div>
</template>

<script>

</script>

<style scoped>
.header{
	position: relative;
	z-index: 999;
}
img{
	width: 100%;
}
.logo{
	width: 50px;
    height: 41px;
	display: inline-block;
	vertical-align: middle;
}
 .ivu-dropdown-rel a{
	color: #fff;
}
h3{
	display: inline-block;
	vertical-align: middle;
	font-size: 20px;
}
</style>