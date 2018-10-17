<template>
	<div class="main">
		<h3>想获得更多权限，请完善个人信息==><a href="#" @click="jumpInformation()">完善信息</a></h3>
	</div>
</template>

<script>
export default {
	data(){
		return{

		}
	},
	methods:{
		jumpInformation(){
			this.$router.push({ path: "/Information" });
		}
	}
}
</script>

<style>
</style>