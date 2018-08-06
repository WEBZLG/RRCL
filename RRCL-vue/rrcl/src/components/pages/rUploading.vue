<template>
    <div class="fileUploading">
        <div class="encrypt">
            <Button type="primary">视频加密</Button>
        </div>
        <div class="fileInput">
            <Upload
                multiple
                type="drag"
                action="//jsonplaceholder.typicode.com/posts/"
                :before-upload="handleUpload">
                <div style="padding: 20px 0">
                    <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                    <p>Click or drag files here to upload</p>
                </div>
            </Upload>
        </div>                     
    </div>
</template>

<script>
    export default{
        data(){
            return{

            }
        },
        methods:{
            handleUpload(){
                confirm("确定上传此文件？")
            }
        }
    }    
</script>

<style scoped>
.encrypt,
.fileInput{
    margin-top: 15px;
}
</style>