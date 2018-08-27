<template>
    <Row>
        <div class="wrapper">
            <h4 class="modelTitle">
                <Icon type="university"></Icon>&nbsp;账户授权
            </h4>
        </div>
        <div class="wrapper">
            <Row>
                <Col :span="6">
                    <label for="">管理员账户</label>
                </Col>
                <Col :span="18">
                    <Input v-model="value1" @on-change="value1Change" disabled></Input>
                </Col>
            </Row>
        </div>
        <div class="wrapper">
            <Row>
                <Col :span="6">
                    <label for="">被授予账户</label>
                </Col>
                <Col :span="18">
                    <Select v-model="model1">
                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </Col>
            </Row>
        </div>
        <div class="wrapper">
            <Row>
                <Col :span="6">
                    <label for="">被授予账户</label>
                </Col>
                <Col :span="18">
                    <CheckboxGroup v-model="limits">
                        <Checkbox label="可播放"></Checkbox>
                        <Checkbox label="可下载"></Checkbox>
                        <Checkbox label="可授权"></Checkbox>
                    </CheckboxGroup>
                </Col>
            </Row>
        </div>
        <div class="wrapper">
            <Row>
                <Col :span="6">
                    <label for="">授予播放时间</label>
                </Col>
                <Col :span="18">
                    <Input v-model="value2" @on-change="value2Change"></Input>
                </Col>
            </Row>
        </div>
        <div class="wrapper">
            <Row>
                <Col :span="6">
                    <label for="">授予播放次数</label>
                </Col>
                <Col :span="18">
                    <Input v-model="value3" @on-change="value3Change"></Input>
                </Col>
            </Row>
        </div>
    </Row>
</template>
<script>
    export default {  
        name: 'add',
        data() {
            return {
                value1:'',
                value2:'',
                value3:'',
                limits:[],
                cityList: [
                    {
                        value: 'beijing',
                        label: '北京市'
                    },
                    {
                        value: 'shanghai',
                        label: '上海市'
                    },
                    {
                        value: 'shenzhen',
                        label: '深圳市'
                    },
                    {
                        value: 'hangzhou',
                        label: '杭州市'
                    },
                    {
                        value: 'nanjing',
                        label: '南京市'
                    },
                    {
                        value: 'chongqing',
                        label: '重庆市'
                    }
                ],
                model1: ''
            }
        },
        methods:{
            value1Change:function() {
                var obj = this
                this.$emit('value1', obj.value1)
            },
            value2Change:function() {
                var obj = this
                this.$emit('value2', obj.value2)
            },
            value3Change:function() {
                var obj = this
                this.$emit('value3', obj.value3)
            }
        } 
    }
</script>
<style scoped>
.modelTitle{
    position: absolute;
    top: -26px;
    left: 0;
    color: #2d8cf0;
    display: none;
}
.wrapper{
    margin-top: 15px;
}

</style>
