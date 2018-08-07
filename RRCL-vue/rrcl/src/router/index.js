import Vue from 'vue'
import Router from 'vue-router'
import iView from 'iview';
import zh from 'iview/dist/locale/zh-CN';
import 'iview/dist/styles/iview.css';
import store from '../store/index'
Vue.use(iView, { zh });
Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [{ path: '/', redirect: '/Login' },
        {
            path: '/Login',
            name: 'Login',
            component: resolve => require(['../components/Login.vue'], resolve)
        },
        {
            path: '/Information',
            name: 'Information',
            component: resolve => require(['../components/pages/rInformation.vue'], resolve)
        },
        {
            path: '/Home',
            component: resolve => require(['../components/Home.vue'], resolve),
            children: [{
                    path: '',
                    component: resolve => require(['../components/pages/rUploading.vue'], resolve)
                },
                {
                    path: '/Uploading',
                    component: resolve => require(['../components/pages/rUploading.vue'], resolve)
                },
                {
                    path: '/Monitoring',
                    name: 'Monitoring',
                    component: resolve => require(['../components/pages/rMonitoring.vue'], resolve)
                },
                {
                    path: '/Impower',
                    component: resolve => require(['../components/pages/rImpower.vue'], resolve),
                    children: [{
                            path: '/Impowervideo',
                            component: resolve => require(['../components/details/rImpowervideo.vue'], resolve)
                        },
                        {
                            path: '/Myvideo',
                            component: resolve => require(['../components/details/rMyvideo.vue'], resolve)
                        },
                        {
                            path: '',
                            component: resolve => require(['../components/details/rMyvideo.vue'], resolve)
                        }
                    ]
                },
                {
                    path: '/Chain',
                    name: 'Chain',
                    component: resolve => require(['../components/pages/rChain.vue'], resolve)
                },
                {
                    path: '/Record',
                    name: 'Record',
                    component: resolve => require(['../components/pages/rRecord.vue'], resolve)
                },
                {
                    path: '/Behavior',
                    name: 'Behavior',
                    component: resolve => require(['../components/pages/rBehavior.vue'], resolve)
                },
                {
                    path: '/ChainDetails',
                    name: 'ChainDetails',
                    component: resolve => require(['../components/pages/rChainDetails.vue'], resolve)
                }
            ]
        },
        {
            path: '/Main',
            name: 'Main',
            component: resolve => require(['../components/Main.vue'], resolve)
        }
    ]
});
//注册全局钩子用来拦截导航
router.beforeEach((to, from, next) => {
    //获取store里面的token
    let token = store.state.token;
    console.log(token)
        //判断要去的路由有没有requiresAuth
    if (to.meta.requiresAuth) {
        if (token) {
            next();
        } else {
            next({
                path: '/Login',
                query: { redirect: to.fullPath } // 将刚刚要去的路由path作为参数，方便登录成功后直接跳转到该路由
            });
        }
    } else {
        next();
    }
});
export default router;