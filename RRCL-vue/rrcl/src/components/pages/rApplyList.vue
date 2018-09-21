<template>
    <div>
        <Modal
            v-model="modal"
            title="提示"
            @on-ok="approve()">
            <p>请确认是否通过申请</p>
        </Modal>
        <Modal
            v-model="modal1"
            title="提示"
            @on-ok="reject()">
            <p>请确认是否驳回申请</p>
        </Modal>
        <Table :loading="loading" :columns="columns" :data="data" stripe></Table>
        <Page :total="100" show-elevator></Page>
    </div>
</template>
<script>
import Vue from 'vue'
export default {
  data() {
    return {
      loading: true,
      modal: false,
      modal1: false,
      postuserId: "",
      columns: [
        // {
        //   title: "用户ID",
        //   key: "userId",
        //   width:100
        // },
        {
          title: "用户名",
          key: "userName",
          width:120
        },
        {
          title: "姓名",
          key: "realName",
          width:120
        },
        {
          title: "性别",
          key: "sex",
          width:70
        },
        {
          title: "用户级别",
          key: "level",
          width:120
        },
        {
          title: "审核状态",
          key: "level",
          width:100
        },
        {
          title: "联系电话",
          key: "phone"
        },
        {
          title: "Email",
          key: "email"
        },
        {
          title: "联系地址",
          key: "addr"
        },
        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.show(params.row.userId);
                    }
                  }
                },
                "通过"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.show1(params.row.userId);
                    }
                  }
                },
                "驳回"
              )
            ]);
          }
        }
      ],
      data:[]
    }
  },
  created() {
    this.getDate();
  },
  methods: {
    show(index) {
      this.postuserId = index;
      this.modal = true;
    },
    show1(index) {
      this.postuserId = index;
      this.modal1 = true;
    },
    remove(index) {
      this.data.splice(index, 1);
    },
    getDate() {
      var that = this
      this.$axios.get("http://172.16.201.189:8083/rock/auth/authList.action",{},{
            xhrFields: {
                withCredentials: true
            }          
        })
        .then(res => {
        console.log(res);
        if (res.data.code === 0) {
          that.data = res.data.users;
          that.loading = false;
        } else if (res.data.code === -1) {
          that.$Message.error("获取数据失败!" + res.data.msg);
        }
      })
      .catch(function(error) {
        Vue.prototype.$Message.error('数据加载失败！');
      });
    },
    approve() {
      console.log("通过");
      var param = new URLSearchParams();
      param.append("userId", this.postuserId);
      param.append("status", 2);
      this.$axios.post("http://172.16.201.189:8083/rock/auth/auditing.action", param,{
            xhrFields: {
                withCredentials: true
            }          
        }).then(function(res) {
        if (res.data.code === 0) {
          Vue.prototype.$Message.info("提交成功");
        } else if (res.data.code === -1) {
          Vue.prototype.$Message.error("提交失败!" + res.data.msg);
        }
      })
      .catch(function(error) {
        Vue.prototype.$Message.error('提交失败！');
      });
    },
    reject() {
      console.log("驳回");
      var param = new URLSearchParams();
      param.append("userId", this.postuserId);
      param.append("status", 3);
      this.$axios.post("http://172.16.201.189:8083/rock/auth/auditing.action", param,{
            xhrFields: {
                withCredentials: true
            }          
        }).then(function(res) {
        if (res.data.code === 0) {
          Vue.prototype.$Message.info("提交成功");
        } else if (res.data.code === -1) {
          Vue.prototype.$Message.error("提交失败!" + res.data.msg);
        }
      })
      .catch(function(error) {
        Vue.prototype.$Message.error('提交失败！');
      });
    }
  }
};
</script>
<style>
.ivu-page {
  text-align: center;
  margin: 15px 0;
}
</style>
