<template>
    <div class="error">
        <h1>哎呀！出错了！</h1>
        <button type="button" @click="goHome()">返回首页</button>
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    methods:{
        goHome:function(){
            this.$router.replace({path:'/Uploading',redirect:{name:"Uploading"}})
        }
    }
}
</script>
<style scoped>
    .error{
        text-align: center;
    }
</style>

