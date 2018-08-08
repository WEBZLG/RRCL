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
html, body, #app, .layout, .ivu-layout{height: 100%;}
</style>
