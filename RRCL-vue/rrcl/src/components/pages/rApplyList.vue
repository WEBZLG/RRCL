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
        <Table border :columns="columns" :data="data"></Table>
        <Page :total="100" show-elevator></Page>
    </div>
</template>
<script>
import Vue from 'vue'
export default {
  data() {
    return {
      modal: false,
      modal1: false,
      postuserId: "",
      dataList: [],
      columns: [
        {
          title: "用户ID",
          key: "userId"
        },
        {
          title: "用户名",
          key: "userName"
        },
        {
          title: "姓名",
          key: "realName"
        },
        {
          title: "联系地址",
          key: "addr"
        },
        {
          title: "所属公司",
          key: "companyInfo.id"
        },
        {
          title: "Action",
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
      data: [
        {
          realName: "John",
          userName: "John Brown",
          userId: 28,
          addr: "New York No. 1 Lake Park"
        },
        {
          realName: "John",
          userName: "Jim Green",
          userId: 27,
          addr: "London No. 1 Lake Park"
        },
        {
          realName: "John",
          userName: "Joe Black",
          userId: 26,
          addr: "Sydney No. 1 Lake Park"
        },
        {
          realName: "John",
          userName: "Jon Snow",
          userId: 25,
          addr: "Ottawa No. 2 Lake Park"
        }
      ]
    };
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
      this.$axios.get("/rock/auth/authList.action").then(res => {
        console.log(res);
        if (res.data.code === 0) {
          this.dataList = [];
        } else if (res.data.code === -1) {
          this.$Message.error("获取数据失败!" + res.data.msg);
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
      this.$axios.post("/rock/auth/auditing.action", param).then(function(res) {
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
      this.$axios.post("/rock/auth/auditing.action", param).then(function(res) {
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
