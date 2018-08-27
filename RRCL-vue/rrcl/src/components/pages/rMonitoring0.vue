<template>
    <div class="main">
        <div class="monitorDate">
            <Row class="row">
                <Col :span="4" class="item">
                    <Icon type="md-cube"></Icon>
                    <div>
                        <h4>区块数量</h4>
                        <!-- <p>{{chainNum}}</p> -->
                        <p id="dataNums1" class="digits"></p>
                    </div>
                </Col>
                <Col :span="4" class="item">
                    <Icon type="ios-cube" />
                    <div>
                        <h4>叔块数量</h4>
                        <!-- <p>{{uncleNum}}</p> -->
                        <p id="dataNums2" class="digits"></p>
                    </div>
                </Col>
                <Col :span="4" class="item">
                    <Icon type="logo-usd" />
                    <div>
                        <h4>交易数量</h4>
                        <!-- <p>{{tradeNum}}</p> -->
                        <p id="dataNums3" class="digits"></p>
                    </div>
                </Col>
                <Col :span="4" class="item">
                    <Icon type="ios-locate"/>
                    <div>
                        <h4>地址数量</h4>
                        <!-- <p>{{addressNum}}</p> -->
                        <p id="dataNums4" class="digits"></p>
                    </div>
                </Col>
                <Col :span="4" class="item">
                    <Icon type="logo-buffer"/>
                    <div>
                        <h4>挂起交易数量</h4>
                        <p id="dataNums5" class="digits"></p>

                        <!-- <p>{{pendingNum}}</p> -->
                    </div>
                </Col>
                <Col :span="4" class="item">
                    <Icon type="ios-time" />
                    <div>
                        <h4>列队交易数量</h4>
                        <!-- <p>{{queuedNum}}</p> -->
                        <p id="dataNums6" class="digits"></p>
                    </div>
                </Col>
            </Row>
        </div>
        <div>
            <Row :gutter="14">
                <Col :span="12">
                <h3 class="nodeTitle">节点监控</h3>
                    <div v-for="item in peerStatus">
                        <div class="component server">
                            <div class="round">
                                <div class="circle" :class='item.status==="normal"?"normal":"padding"'><a></a></div>
                                <div class="circle_bottom animation" :class='item.status==="normal"?"normal":"padding"'></div>
                                <div class="circle_bottom2 animation2" :class='item.status==="normal"?"normal":"padding"'></div>
                            </div>
                            <div class="slot"></div>
                            <div class="slot"></div>
                            <div class="button"></div>
                            <div class="button"></div>
                            <p>{{item.peer}}</p>
                        </div>
                    </div>
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
                            <!-- <Button type="primary" @click="viewAll()" ghost>View All</Button> -->
                        </div>
                        <transition-group name="zoom" tag="div">
                            <div class="blockList" v-for="item in blocks" :key="item.number">
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
                        </transition-group>
                    </div>
                </Col>
                <Col :span="12">
                    <div class="transactions">
                        <div class="title">
                            <Icon type="logo-usd" />
                            <h3>Transactions</h3>
                            <!-- <Button type="primary" ghost>View All</Button> -->
                        </div>
                        <transition-group name="zoom" tag="div">
                            <div class="tradeList" v-for="item in transactions"  :key="item.blockNumber" :class="item.status===false?'active':''" >
                                <div class="blockNumber">
                                    <p>区块号：<em>{{item.blockNumber}}</em>&nbsp&nbsp合约标志分区：<em v-if="item.contractAddress===null">不是合约标志分区</em><em v-else>{{item.contractAddress}}</em></p>
                                </div>
                                <p>交易Hash：<em>{{item.hash}}</em>&nbsp&nbsp交易节点：<em>{{item.peer}}</em></p>
                                <p>发起者：<em>{{item.from}}</em>&nbsp&nbsp受益者：<em>{{item.to}}</em></p>
                                <p>交易编号：<em>{{item.transactionIndex}}</em>&nbsp&nbsp交易额：<em>{{item.value}}</em></p>
                            </div>
                        </transition-group>
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
import '../../assets/js/number.css'
Vue.use(VueSocketio, socketio('http://172.16.201.189:8000/mio'));
    export default {
        data () {
            return {
                status:'',
                blocks:'',
                transactions:'',
                nodeData:[],
                peerStatus:[],
            }
        },
        methods: {
            viewAll:function(){
                this.$router.push('/ChainDetails');
            },
            setNumber:function(dom, number) {
                var n = String(number),
                    len = n.length;

                //如果新的数字短于当前的，要移除多余的i
                if (dom.find("i").length > len) {
                    dom.find("i:gt(" + (len - 1) + ")").remove();
                }

                //移除千分位分隔符
                dom.find("b").remove();

                //开始填充每一位
                for (var i = 0; i < len; ++i) {
                    //位数不足要补
                    if (dom.find("i").length < len) {
                        dom.append("<i></i>");
                    }
                    var obj = dom.find("i").eq(i);
                    var y = -40 * parseInt(n.charAt(i), 10);

                    //加分隔符
                    if (i < len - 1 && (len - i - 1) % 3 == 0)
                        $("<b></b>").insertAfter(obj);

                    //利用动画变换数字
                    obj.animate({
                        backgroundPositionY: y + "px"
                    }, 350);
                }
            }
        },
        sockets:{ //将（socket.on）绑定事件放在sockets中
            connect: function(val){
                console.log("已链接")
            },
            connect_error:function(error){
                this.$router.push({path:'/Error'})
                this.$socket.disconnect();
            },
            // 区块链信息
            view_chainInfo: function(val){
                this.setNumber($("#dataNums1"), val.msg.blockNumber);
                this.setNumber($("#dataNums2"), val.msg.uncleCount);
                this.setNumber($("#dataNums3"), val.msg.transactionCount);
                this.setNumber($("#dataNums4"), val.msg.addressCount);
            },
            // 节点状态
            view_peerStatus: function(val){
                this.peerStatus = [];
                for (let i in val) {
                    this.peerStatus.push(val[i]);
                }
            },
            // 多个块信息
            view_blocks: function(val){
                this.blocks = val.msg
            },
            // 单个块信息及交易信息
            view_block: function(val){
                this.blocks.pop();
                this.transactions.pop();
                this.blocks.unshift(val.msg.block);
                for(var i in val.msg.txs){
                    this.transactions.unshift(val.msg.txs[i]);
                }
            },
            // 交易池状态
            view_txpoolStatus: function(val){
                this.setNumber($("#dataNums5"), val.msg.pending);
                this.setNumber($("#dataNums6"), val.msg.queued);
            },
            // 多个交易信息
            view_transactions: function(val){
                this.transactions = val.msg
            },
            // 挂起交易数量
            view_pendingTransactions: function(val){
                this.pendingNum = this.pendingNum+1 
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

            var chart = echarts.init(document.getElementById('chart'));
            chart.setOption(option);  
            window.onresize = function () {
                //重置容器高宽
                chart.resize();
            };
            // 节点监控
            this.$nextTick(function() {
            })
        },
        created(){
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
    font-size: 50px;
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
.item p{
    font-size: 16px;
    transform: translateZ(0);
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
    font-size: 14px;
}
#chart,
#nodes{
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
    border-bottom: 2px dotted #2d8cf0;
}
.tradeList{
    /* border: none; */
    border-left: 2px solid #28d2ac;
    padding-left: 10px;
}
.tradeList.active{
    border-left: 2px solid orange;
}
.nodeTitle{
    padding: 12px 0;
    font-size: 18px;
    color: #2d8cf0;
    font-weight: bold;
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
.server{
    width: 12%;
    height: 130px;
    border: 5px solid #55b4f0;
    border-radius: 5px;
    position: relative;
    margin-top: 50px;
    margin-left: 86px;
    float: left;
}
.server p{
    position: absolute;
    left: -14px;
    bottom: -30px;
    color: #ce3b3b;
}
.round {
    position: absolute;
    padding: 13px;
    left: 0px;
    top: -2px;
}
.round div {
	background:#80e7ae;
}
.round div:first-child {
	width:20px;
	height:20px;
}
.round div:first-child a {
	/* line-height:99px; */
}
.round div:nth-child(2) {
	width:20px;
	height:20px;
}
.round div:last-child {
	width:30px;
	height:30px;
}
.circle a {
	font-size:18px;
	line-height:100px;
	color:#000735;
	font-weight:bold;
}
.circle {
	background:#3a96e1;
	border-radius:100%;
	width:20px;
	height:20px;
	z-index:999;
	text-align:center;
	top:18px;
	left:18px;
	position:absolute;
}
.circle_bottom {
	background:rgba(58,150,225,0.4);
	border-radius:100%;
	width:20px;
	height:20px;
	filter:alpha(opacity=40);
	position:absolute;
	top:18px;
	left:18px;
}
.circle_bottom2 {
	background:rgba(58,150,225,0.2);
	border-radius:100%;
	width:30px;
	height:30px;
	filter:alpha(opacity=20);
	position:relative;
}
.animation {
	-webkit-animation:twinkling 2.1s infinite ease-in-out;
	animation:twinkling 2.1s infinite ease-in-out;
	-webkit-animation-fill-mode:both;
	animation-fill-mode:both;
}
.animation2 {
	-webkit-animation:twinkling 2.1s infinite ease-in-out;
	animation:twinkling 2.1s infinite ease-in-out;
	-webkit-animation-fill-mode:both;
	animation-fill-mode:both;
}
@-webkit-keyframes twinkling {
	0% {
	opacity:0.2;
	filter:alpha(opacity=20);
	-webkit-transform:scale(1);
}
50% {
	opacity:0.5;
	filter:alpha(opacity=50);
	-webkit-transform:scale(1.12);
}
100% {
	opacity:0.2;
	filter:alpha(opacity=20);
	-webkit-transform:scale(1);
}
}
@keyframes twinkling {
	0% {
	opacity:0.2;
	filter:alpha(opacity=20);
	-webkit-transform:scale(1);
}
50% {
	opacity:0.5;
	filter:alpha(opacity=50);
	-webkit-transform:scale(1.12);
}
100% {
	opacity:0.2;
	filter:alpha(opacity=20);
	-webkit-transform:scale(1);
}
}
.server .slot{
  display: block;
  background: #7fe7c9;
  width: 90%;
  height: 8%;
  margin: 10% 5%;
  position: relative;
  top: 55%;
  border-radius: 2px;
}

.server .button{
  width: 6px;
  height: 6px;
  background:#2d8cf0;
  display: inline-block;
  border-radius: 50%;
  position: absolute;
  right: 20%;
  bottom: 5%;
}
.server .button:last-of-type{
  height: 8px;
  width: 8px;
  right: 5%;
}
.server .normal{
    background-color: #28d2ac;
}
.server .pedding{
    background-color: #ffd60d;
}

</style>