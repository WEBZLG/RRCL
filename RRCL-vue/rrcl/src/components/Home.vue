<template>
	<div class="layout">
	    <Layout>
	        <Header>
	        	<v-head></v-head>
	        </Header>
				<Layout>
					<Sider ref="side1" hide-trigger collapsible :collapsed-width="78">
						<v-Sider></v-Sider>
					</Sider>
					<Layout>
					<Content>
						<!-- <keep-alive> -->
							<router-view></router-view>
						<!-- </keep-alive> -->
					</Content>
					<!-- <Footer>
						<v-foot></v-foot>
					</Footer> -->
				</Layout>
			</Layout>
	    </Layout>
	</div>
</template>

<script>
import vHead from "./Header";
import vSider from "./Sider.vue";
import vFoot from "./Footer.vue";

export default {
  name: "Home",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  components: {
    vHead,
    vFoot,
    vSider
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ivu-layout .ivu-layout-header {
  background-color: #2d8cf0;
  color: #ffffff;
  height: 60px;
  line-height: 60px;
  padding: 0 25px;
}
.layout {
  height: 100%;
  min-width: 1210px;
}
.ivu-layout-content {
  padding: 15px;
}
.ivu-layout {
  height: 100%;
  background-color: inherit;
}
.ivu-layout .ivu-layout-sider {
  background: inherit;
}
.ivu-menu-light {
  background: inherit !important;
}
</style>
