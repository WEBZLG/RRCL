<template>
	<div class="sider">
        <Menu :active-name="setActive" theme="primary"  @on-select="routeTo" accordion width="auto">
            <Submenu name="navUploading">
                <template slot="title">
                        <Icon type="stats-bars"></Icon>
                        文件上传/加密
                </template>
                <MenuItem name="Uploading">
                    <Icon type="ios-paper"></Icon>
                    文件上传/加密
                </MenuItem>
            </Submenu>
            <Submenu name="navImpower">
                <template slot="title">
                        <Icon type="stats-bars"></Icon>
                        账户授权
                </template>
                <MenuItem name="Impower">
                    <Icon type="ios-people"></Icon>
                    账户授权
                </MenuItem>
            </Submenu>
            <Submenu name="navRecord">
                <template slot="title">
                        <Icon type="stats-bars"></Icon>
                        授权记录
                </template>
                <MenuItem name="Record">
                        <Icon type="settings"></Icon>
                        授权记录
                </MenuItem>
            </Submenu>
            <Submenu name="navBehavior">
                <template slot="title">
                        <Icon type="stats-bars"></Icon>
                        行为追踪
                </template>
                <MenuItem name="Behavior">
                        <Icon type="settings"></Icon>
                        行为追踪
                </MenuItem>
            </Submenu>
            <Submenu name="Chain">
                <template slot="title">
                        <Icon type="stats-bars"></Icon>
                        区块链管理
                </template>
                <!-- <MenuGroup> -->
                <MenuItem name="Monitoring">监控信息</MenuItem>
                <MenuItem name="ChainDetails">区块/交易信息</MenuItem>
                <!-- </MenuGroup> -->
            </Submenu>
        </Menu>
	</div>
</template>

<script>
export default{
	data(){
		return {
			page: ['Uploading','Monitoring','Behavior','Chain','Impower','Record'],
			setActive:'Uploading'
		}
	},
	computed:{
		// setActive(){
		// 	return this.$route.path.replace('/','Uploading');
		// }
	},
	mounted(){
		this.menuList()
	},
	methods:{
		routeTo(e) {
			// console.log(e);
			this.$router.push(e);
		},
		menuList(){  // 这个方法里定义好，高亮和路由
		  let path = this.$route.matched[1].path  // 获取到地址拦上#号后面的url地址
		  if(path.indexOf('/Uploading') != -1){  // 是否包含，-1是包含，0不包含
                this.setActive = 'Uploading'
              } else
          if(path.indexOf('/Impower') != -1){ 
                this.setActive = 'Impower'
              } else
          if(path.indexOf('/Record') != -1){  
                this.setActive = 'Record'
              } else
          if(path.indexOf('/Behavior') != -1){  
                this.setActive = 'Behavior'
              } else
          if(path.indexOf('/Monitoring') != -1){  
                this.setActive = 'Monitoring'
              } else
          if(path.indexOf('/ChainDetails') != -1){  
                this.setActive = 'ChainDetails'
              } 
         }
	}
}
</script>

<style scoped>
.ivu-menu-light{
	background: inherit!important;
}
.sider,
.ivu-menu-vertical{
    height: 100%;
}
</style>