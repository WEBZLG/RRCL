<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html,body,#app{
  height: 100%;
  width: 100%;
  background-color: #fffed0;
}
.ivu-table,
.ivu-table td{
  background-color: inherit ;
}
.ivu-table th {
    height: 40px;
    white-space: nowrap;
    overflow: hidden;
    background-color: #2d8cf0;
    color: #fff;
}
.ivu-table-row .ivu-table-cell {
    padding-left: 18px;
    padding-right: 18px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    box-sizing: border-box;
    word-break: inherit;
}
.ivu-menu-light {
    background: inherit;
}
.ivu-menu-horizontal {
    height: 35px;
    line-height: 22px;
}
.ivu-select-selection{
  background: inherit;
}
</style>
