<template>
    <div class="main">
        <div>
            <Row :gutter="14">
                <Col :span="12">
                    <div class="status">
                        状态：{{status}}
                    </div>
                    <Row class="row">
                        <Col :span="12" class="item">
                            <Icon type="md-cube"></Icon>
                            <div>
                                <h4>区块数量</h4>
                                <p>{{chainNum}}</p>
                            </div>
                        </Col>
                        <Col :span="12" class="item">
                            <Icon type="ios-cube" />
                            <div>
                                <h4>叔块数量</h4>
                                <p>{{uncleNum}}</p>
                            </div>
                        </Col>
                    </Row>
                    <Row class="row">
                        <Col :span="12" class="item">
                            <Icon type="logo-usd" />
                            <div>
                                <h4>交易数量</h4>
                                <p>{{tradeNum}}</p>
                            </div>
                        </Col>
                        <Col :span="12" class="item">
                            <Icon type="ios-locate"/>
                            <div>
                                <h4>地址数量</h4>
                                <p>{{addressNum}}</p>
                            </div>
                        </Col>
                    </Row>
                    <Row class="row">
                        <Col :span="12" class="item">
                            <Icon type="logo-buffer"/>
                            <div>
                                <h4>挂起交易数量</h4>
                                <p>{{pendingNum}}</p>
                            </div>
                        </Col>
                        <Col :span="12" class="item">
                            <Icon type="ios-time" />
                            <div>
                                <h4>列队交易数量</h4>
                                <p>{{queuedNum}}</p>
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col :span="12">
                    <div id="chart"></div>
                </Col>
            </Row>
        </div>
        <div class="dataList">
            <Row :gutter="14">
                <Col :span="12">
                    <div class="blocks">
                        <div class="title">
                            <Icon type="md-cube"/>
                            <h3>Blocks</h3>
                            <Button type="primary" ghost>View All</Button>
                        </div>
                        <div class="blockList">
                            <div class="indexItem">
                                <div class="blockBox">
                                    <span>Blcok<strong>6666</strong></span>
                                    <p>000000</p>
                                </div>
                                <div class="blockText">
                                    <p>666</p>
                                    <p>666</p>
                                    <p>666</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col :span="12">
                    <div class="transactions">
                        <div class="title">
                            <Icon type="logo-usd" />
                            <h3>Transactions</h3>
                            <Button type="primary" ghost>View All</Button>
                        </div>
                        <div class="tradeList">

                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import echarts from 'echarts'
import VueSocketio from 'vue-socket.io';
import socketio from 'socket.io-client';

Vue.use(VueSocketio, socketio('http://172.16.201.189:8000/mio'));

    export default {
        data () {
            return {
                status:'',
                chainNum:'',
                tradeNum:'',
                addressNum:'',
                pendingNum:'',
                queuedNum:'',
                uncleNum:'',
            }
        },
        sockets:{ //将（socket.on）绑定事件放在sockets中
            connect: function(){
                console.log('socket connected')
            },
            view_chainInfo: function(val){
                this.chainNum = val.msg.blockNumber
                this.tradeNum = val.msg.transactionCount
                this.addressNum = val.msg.addressCount
                this.uncleNum = val.msg.uncleCount
            },
            view_peerStatus: function(val){
                this.status = val.msg.status
            },
            view_txpoolStatus: function(val){
                this.pendingNum = val.msg.pending
                this.queuedNum = val.msg.queued
            },
        },
        mounted() {
            var chart = echarts.init(document.getElementById('chart'));       
            var option = {
                tooltip : {
	                trigger: 'axis',
	                axisPointer : {            // 坐标轴指示器，坐标轴触发有效(鼠标放在柱子上的阴影效果)
	                    type : 'line',       // 默认为直线，可选为：'line' | 'shadow'
	                	lineStyle:{
	                		color:'#fff',
	                		type:'dashed',
	                		opacity:0.9
	                	},
	                	label:{
	                		show:true,
	                		formatter:null
	                	}
	                }
	            },
                title:{
                    text:'交易走势图',
                    textStyle:{
                        color:'#2d8cf0'
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    axisLine:{
                        lineStyle: {
                            color: '#2d8cf0',//左边线的颜色
                            width:'1'//坐标线的宽度
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#2d8cf0',//坐标值得具体的颜色
                        }
                    }
                },
                yAxis: {
                    type: 'value',
                    name:'单位：单',
                    splitLine:{
                        show:true,
                        lineStyle:{
                            color:["#2d8cf0"]
                        }
                    },
                    nameTextStyle:{
                        color:["#2d8cf0"]
                    },
                    axisLine:{
                        lineStyle:{
                        color: '#2d8cf0',//左边线的颜色
                        width:'1'//坐标线的宽度 
                        }
                    }
                },
                series: [{
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                    type: 'line',
                    areaStyle: {
                        normal:{
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 1,
                                x2: 0,
                                y2: 0,
                                colorStops: [{
                                    offset: 0, color: '#48debe' // 0% 处的颜色
                                }, {
                                    offset: 1, color: '#48ceff' // 100% 处的颜色
                                }],
                                globalCoord: true 
                            }
                       } 
                    },
                    itemStyle: {
                        normal: {
                            color: "#fff",
                            lineStyle: {
                                color: "#2d8cf0"
                            }
                        }
                    },
                }]
            };
            chart.setOption(option);  
            // this.$options.sockets.view_transactions = (data) => {
            //     console.log(data)
            // }
        },
        created(){
            this.ChainAxios();
        },
        methods: {
            ChainAxios: function(val){
                // this.$socket.emit('view_peerStatus', val);
            }
        }
    }
</script>

<style scoped>

.item i,
.item div,
.dataList i,
.dataList h3{
    display: inline-block;
    vertical-align: middle;
    color: #2d8cf0;
}
.item i{
    font-size: 60px;
    padding: 4px;
    width: 60px;
    text-align: center;
}
.item{
    border: 1px solid #2d8cf0;
    color: #2d8cf0;
    border-bottom: none;
    border-right: none;
}
.row:last-child .item{
    border-bottom: 1px solid #2d8cf0;
}
.row .item:last-child{
    border-right: 1px solid #2d8cf0;
}
.status{
    border: 1px solid #2d8cf0;
    border-bottom: none;
    color: #2d8cf0;
    height: 40px;
    line-height: 40px;
    margin-top: 15px;
    text-indent: 4px;
}
h4{
    font-size: 18px;
}
#chart{
    margin-top: 10px;
    height: 290px;
    width: 100%;
}
.dataList button{
    position: absolute;
    right: 6px;
    top: 0;
}
.dataList .title{
    line-height: 32px;
}
.blockBox,
.blockText{
    display: inline-block;
    vertical-align: middle;
}
.blockBox{
    height: 60px;
    width: 100px;
    background-color: #00ffff;
    padding: 4px;
    text-align: center;
    line-height: 26px;
}
</style>