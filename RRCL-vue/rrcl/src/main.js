// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import zh from 'iview/dist/locale/zh-CN'
import 'iview/dist/styles/iview.css'
import store from './store'
import VueParticles from 'vue-particles'
Vue.use(VueParticles)

Vue.use(iView, { zh });
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})