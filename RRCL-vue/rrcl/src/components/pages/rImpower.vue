<template>
    <div class="impower">
        <div class="navImpower">
            <Menu mode="horizontal" :active-name="Active" active-name="myVideo" @on-select="routeTo">
                <MenuItem name="myVideo">
                    <Icon type="ios-paper"></Icon>
                    我的视频
                </MenuItem>
                <MenuItem name="impowerVideo">
                    <Icon type="ios-people"></Icon>
                    授权的视频
                </MenuItem>
            </Menu>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return {
                page: ['Myvideo','Impowervideo']
            }
        },
        computed:{
            Active(){
                return this.$route.path.replace('/','');
            }
        },
        methods:{
            routeTo(e) {
                // console.log(e);
                this.$router.push(e);
            }
        }
    }    
</script>

<style>
.myVideo,
impowerVideo{
    background-color: #2288dd;
}
</style>