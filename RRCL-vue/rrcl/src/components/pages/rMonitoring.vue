<template>
    <div class="main">
        <div>
            <Row :gutter="14">
                <Col :span="12">
                    <div class="status">
                        状态：normal
                    </div>
                    <Row class="row">
                        <Col :span="12" class="item">
                            <Icon type="social-bitcoin"></Icon>
                            <div>
                                <h4>区块数量</h4>
                                <p>222</p>
                            </div>
                        </Col>
                        <Col :span="12" class="item">
                            <Icon type="social-euro"></Icon>
                            <div>
                                <h4>叔块数量</h4>
                                <p>222</p>
                            </div>
                        </Col>
                    </Row>
                    <Row class="row">
                        <Col :span="12" class="item">
                            <Icon type="android-people"></Icon>
                            <div>
                                <h4>交易数量</h4>
                                <p>222</p>
                            </div>
                        </Col>
                        <Col :span="12" class="item">
                            <Icon type="android-locate"></Icon>
                            <div>
                                <h4>地址数量</h4>
                                <p>222</p>
                            </div>
                        </Col>
                    </Row>
                    <Row class="row">
                        <Col :span="12" class="item">
                            <Icon type="social-buffer"></Icon>
                            <div>
                                <h4>挂起交易数量</h4>
                                <p>222</p>
                            </div>
                        </Col>
                        <Col :span="12" class="item">
                            <Icon type="android-list"></Icon>
                            <div>
                                <h4>列队交易数量</h4>
                                <p>222</p>
                            </div>
                        </Col>
                    </Row>

                </Col>
                <Col :span="12">
                    <!-- <div id="chart" ref="myEchart"></div> -->
                    <div id="chart"></div>
                </Col>
            </Row>
        </div>
        <div>
            <Row :gutter="14">
                <Col :span="12">
                    <Table border :columns="columns" :data="data"></Table>
                </Col>
                <Col :span="12">
                    <Table border :columns="columns7" :data="data6"></Table>
                </Col>
            </Row>
        </div>
    </div>
</template>

<script>
import echarts from 'echarts'
// import socket from 'socket.io'

    export default {
        data () {
            return {
                columns7: [
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
                        width: 100,
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
                            ]);
                        }
                    }
                ],
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
                        width: 100,
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
                            ]);
                        }
                    }
                ],
                data6: [
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
        mounted() {
            var chart = echarts.init(document.getElementById('chart'), null, {});
            var data = [["10：46",116],["2000-06-06",129],["2000-06-07",135],["2000-06-08",86],["2000-06-09",73],["2000-06-10",85],["2000-06-11",73],["2000-06-12",68],["2000-06-13",92],["2000-06-14",130],["2000-06-15",245],["2000-06-16",139],["2000-06-17",115],["2000-06-18",111],["2000-06-19",309],["2000-06-20",206],["2000-06-21",137],["2000-06-22",128],["2000-06-23",85],["2000-06-24",94],["2000-06-25",71],["2000-06-26",106],["2000-06-27",84],["2000-06-28",93],["2000-06-29",85],["2000-06-30",73],["2000-07-01",83],["2000-07-02",125],["2000-07-03",107],["2000-07-04",82],["2000-07-05",44],["2000-07-06",72],["2000-07-07",106],["2000-07-08",107],["2000-07-09",66],["2000-07-10",91],["2000-07-11",92],["2000-07-12",113],["2000-07-13",107],["2000-07-14",131],["2000-07-15",111],["2000-07-16",64],["2000-07-17",69],["2000-07-18",88],["2000-07-19",77],["2000-07-20",83],["2000-07-21",111],["2000-07-22",57],["2000-07-23",55],["2000-07-24",60]];
            
            var dateList = data.map(function (item) {
                return item[0];
            });
            var valueList = data.map(function (item) {
                return item[1];
            });
            
            var option = {
            
                // Make gradient line here
                visualMap: [{
                    show: false,
                    type: 'continuous',
                    seriesIndex: 0,
                    min: 0,
                    max: 400
                }, {
                    show: false,
                    type: 'continuous',
                    seriesIndex: 1,
                    dimension: 0,
                    min: 0,
                    max: dateList.length - 1
                }],
            
            
                title: [{
                    left: 'center',
                    text: 'Gradient along the y axis'
                }, {
                    top: '50%',
                    left: 'center',
                    text: 'Gradient along the x axis'
                }],
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: [{
                    data: dateList
                }, {
                    data: dateList,
                    gridIndex: 1
                }],
                yAxis: [{
                    splitLine: {show: false}
                }, {
                    splitLine: {show: false},
                    gridIndex: 1
                }],
                grid: [{
                    bottom: '60%'
                }, {
                    top: '60%'
                }],
                series: [{
                    type: 'line',
                    showSymbol: false,
                    data: valueList
                }, {
                    type: 'line',
                    showSymbol: false,
                    data: valueList,
                    xAxisIndex: 1,
                    yAxisIndex: 1
                }]
            };
            chart.setOption(option);            
        },

        created(){
            this.ChainAxios();
        },
        methods: {
            show (index) {
                this.$Modal.info({
                    title: 'User Info',
                    content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
                })
            },
            remove (index) {
                this.data6.splice(index, 1);
            },
            // ChainAxios(){
            //         var mio =this.io.connect('http://192.168.103.211:8080/mio');
            //         mio.on('view_block', function (data) {
            //         console.log(data);
            //     });
            // }
        },
    }
</script>

<style scoped>

.item i,
.item div{
    display: inline-block;
    vertical-align: middle;
}
.item i{
    font-size: 60px;
    padding: 4px;
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
}
</style>