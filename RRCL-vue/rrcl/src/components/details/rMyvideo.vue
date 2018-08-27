<template>
    <div>
        <Table border :columns="columns" :data="data"></Table>
        <Page :total="100" show-elevator></Page>
    </div>
</template>
<script>
import axios from 'axios'
import Add from './rAdd.vue'

    export default {
        data () {
            return {
                v1:'',
                v2:'',
                columns: [
                    {
                        title: 'Name',
                        key: 'name',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', params.row.name)
                            ]);
                        }
                    },
                    {
                        title: 'Age',
                        key: 'age'
                    },
                    {
                        title: 'Address',
                        key: 'address'
                    },
                    {
                        title: 'Action',
                        key: 'action',
                        width: 250,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, '查看'),
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, '播放'),
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.getDownload(params.index)
                                        }
                                    }
                                }, '下载'),
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                           this.openModal()
                                        }
                                    }
                                }, '授权')
                            ]);
                        }
                    }
                ],
                data: [
                    {
                        name: 'John Brown',
                        age: 28,
                        address: 'New York No. 1 Lake Park'
                    },
                    {
                        name: 'Jim Green',
                        age: 27,
                        address: 'London No. 1 Lake Park'
                    },
                    {
                        name: 'Joe Black',
                        age: 26,
                        address: 'Sydney No. 1 Lake Park'
                    },
                    {
                        name: 'Jon Snow',
                        age: 25,
                        address: 'Ottawa No. 2 Lake Park'
                    }
                ]
            }
        },
        components:{
            Add
        },
        mounted(){
            this.getData()
        },
        methods: {
            // 详情
            show (index) {
                this.$Modal.info({
                    title: 'User Info',
                    content: `Name：${this.data[index].name}<br>Age：${this.data[index].age}<br>Address：${this.data[index].address}`
                })
            },
            // 下载
            getDownload (index) {
                axios({
                    method: 'post',
                    url: 'api/user/',
                    data: {
                        id:index
                    },
                    responseType: 'blob'
                }).then(response => {
                    this.download(response)
                }).catch((error) => {

                })
            },
                // 下载文件
            download (data) {
                if (!data) {
                    return
                }
                let url = window.URL.createObjectURL(new Blob([data]))
                let link = document.createElement('a')
                link.style.display = 'none'
                link.href = url
                link.setAttribute('download', 'excel.xlsx')
                document.body.appendChild(link)
                link.click()
            },
            // 获取列表数据
            getData (){
                axios.get('/user', {
                    params: {
                    ID: 12345
                    }
                })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
            // 授权弹窗
            openModal() {
                this.$Modal.confirm({
                    scrollable:true,
                    okText:'保存',
                    render: (h) => {
                        return h(Add, {
                            props: {
                                
                            },
                            on: {
                                value1: (value1) => {
                                    this.v1 = value1
                                },
                                value2: (value2) => {
                                    this.v2 = value2
                                },
                                value3: (value2) => {
                                    this.v3 = value3
                                }
                            }
                        })
                    },
                    onOk: () => {
                        if (this.v1 == '' || this.v2 == '') {
                            this.$Message.error('信息填写不完整!')
                        }else{
                            console.log(this.v1,this.v2)
                            const msg = this.$Message.loading({
                                content: '正在保存..',
                                duration: 0
                            })
                        }
                        // this.saveLink(msg)
                    }                        
                })
            } 
        }
    }
</script>
<style scoped>
.ivu-page{
    text-align: center;
    margin: 15px 0;
}
</style>
