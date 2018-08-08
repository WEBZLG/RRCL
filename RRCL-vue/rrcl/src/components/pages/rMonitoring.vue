<template>
    <div class="main">
        <div>
            <Row>
                <Col :span="24">
                    <div id="nodes"></div>
                </Col>
            </Row>
        </div>
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
                        <div class="blockList" v-for="item in blocks">
                            <div class="indexItem">
                                <div class="blockBox">
                                    <span>Blcok：<strong>{{item.number}}</strong></span>
                                    <p>区块大小：<strong>{{item.size}}</strong></p>
                                    <p>{{new Date(item.timestamp*1000).toLocaleString()}}</p>
                                </div>
                                <div class="blockText">
                                    <p>交易数量：<em>{{item.transactions.length}}</em></p>
                                    <p>打包节点：<em>{{item.signer}}</em></p>
                                    <p>区块Hash：<em>{{item.hash}}</em></p>
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
                        <div class="tradeList" v-for="item in transactions">
                            <div class="blockNumber">
                               <p>区块号：<em>{{item.blockNumber}}</em>&nbsp&nbsp合约标志分区：<em v-if="item.contractAddress===null">不是合约标志分区</em><em v-else>{{item.contractAddress}}</em></p>
                            </div>
                            <p>交易Hash：<em>{{item.hash}}</em>&nbsp&nbsp交易状态：
                                <em v-if="item.status===true">
                                    <Icon type="md-git-compare" color="#28d2ac"/>
                                </em>
                                <em v-else-if="item.status===false">
                                    <Icon type="md-warning" color="#ff0000"/>
                                </em>
                                <!-- <em v-else="item.status===pending">
                                    <Icon type="md-git-compare" color="orange"/>
                                </em> -->
                            </p>
                            <p>发起者：<em>{{item.from}}</em>&nbsp&nbsp受益者：<em>{{item.to}}</em></p>
                            <p>交易编号：<em>{{item.transactionIndex}}</em>&nbsp&nbsp交易额：<em>{{item.value}}</em></p>
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
                blocks:'',
                transactions:''
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
            view_blocks: function(val){
                this.blocks = val.msg
            },
            view_txpoolStatus: function(val){
                this.pendingNum = val.msg.pending
                this.queuedNum = val.msg.queued
            },
            view_transactions: function(val){
                this.transactions = val.msg
            },
        },
        mounted() {
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
            var nodeOption= {
                title: {
                    text: '节点监控',
                    textStyle:{
                        color:'#2d8cf0'
                    }
                },
                tooltip: {},
                animationDurationUpdate: 1500,
                animationEasingUpdate: 'quinticInOut',
                series : [
                    {
                        type: 'graph',
                        layout: 'none',
                        symbol:'rect',
                        color:'#28d2ac',
                        symbolSize: 50,
                        roam: false,
                        legendHoverLink:true, 
                        label: {
                            normal: {
                                show: true
                            }
                        },
                        edgeSymbol: ['circle', 'arrow'],
                        edgeSymbolSize: [4, 10],
                        edgeLabel: {
                            normal: {
                                textStyle: {
                                    fontSize: 20
                                }
                            }
                        },
                        data: [{
                            name: '节点1',
                            x: 300,
                            y: 100, 
                            itemStyle: {
                                color: 'red'
                            }
                        }, {
                            name: '节点2',
                            x: 800,
                            y: 100
                        }, {
                            name: '节点3',
                            x: 550,
                            y: 50
                        }],
                        // links: [],
                        links: [ {
                            source: '节点2',
                            target: '节点1',
                        }, {
                            source: '节点1',
                            target: '节点3'
                        }, {
                            source: '节点2',
                            target: '节点3'
                        }, {
                            source: '节点2',
                            target: '节点1'
                        }
                        , {
                            source: '节点3',
                            target: '节点1'
                        }
                        , {
                            source: '节点3',
                            target: '节点2'
                        }
                        , {
                            source: '节点1',
                            target: '节点2'
                        }],
                        lineStyle: {
                            normal: {
                                opacity: 0.9,
                                width: 2,
                                curveness: 0
                            }
                        }

                    }
                ]
            };
            var chart = echarts.init(document.getElementById('chart'));
            chart.setOption(option);  
            window.addEventListener('resize', function () {
                chart.resize();	//自适应
            });
            var nodeChart = echarts.init(document.getElementById('nodes'));
            nodeChart.setOption(nodeOption);  
            window.addEventListener('resize', function () {
                nodeChart.resize();	//自适应
            })
            this.$options.sockets.view_peerStatus = (data) => {
                console.log(data)
            }
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
#chart,
#nodes{
    margin-top: 10px;
    height: 290px;
    width: 100%;
}
#nodes{
    height: 150px;
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
    height: 72px;
    width: 135px;
    background-color: #2d8cf0;
    padding: 4px;
    text-align: center;
    line-height: 22px;
    color: #fff;
}
.blockList,
.tradeList{
    margin: 4px 0;
}
.blockText em,
.tradeList em{
    display: inline-block;
    vertical-align: middle;
    width: 260px;
    color: #1000ff;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 24px;
}
.tradeList em{
    width: 170px;
}
.indexItem,
.tradeList{
    position: relative;
    color:#2d8cf0;
    border-bottom: 2px solid #2d8cf0;
}
.blockNumber{
    position: absolute;
    bottom: 0;
    background: #2d8cf0;
    color: #fff;
    display: none;
}
.tradeList:hover .blockNumber{
    display: block;
}
.blockNumber em{
    color: #fff;
}
</style>