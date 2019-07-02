import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)


const router = new Router({
    base: process.env.BASE_URL,
    routes: [{
            path: '/',
            name: 'login',
            component: () =>
                import ('./views/Login.vue')

        },
        {
            path: '/regist',
            name: 'regist',
            component: () =>
                import ('./views/Regist.vue')
        },
        // {
        //     path: '/home',
        //     name: 'home',
        //     component: () =>
        //         import ('./views/Home.vue'),
        //     children: [{
        //         path: 'justclick',
        //         name: 'justclick',
        //         component: () =>
        //             import ('./views/justclick.vue'),
        //     }, {
        //         path: 'ate',
        //         name: 'ate',
        //         component: () =>
        //             import ('./views/ate.vue'),
        //     }, {
        //         path: 'me',
        //         name: 'me',
        //         component: () =>
        //             import ('./views/me.vue'),
        //     }]
        // },
        {
            path: '/justclick',
            name: 'justclick',
            component: () =>
                import ('./views/justclick.vue'),
            meta: {
                auth: true
            },
        }, {
            path: '/ate',
            name: 'ate',
            component: () =>
                import ('./views/ate.vue'),
            meta: {
                auth: true
            },
        }, {
            path: '/me',
            name: 'me',
            component: () =>
                import ('./views/me.vue'),
            meta: {
                auth: true
            },
        }
    ]
});
router.beforeEach((to, from, next) => {
    if (to.meta.auth) { //权限判断
        if (localStorage.getItem('token')) { //读取token值
            //  成功
            next()
        } else {
            next({ path: '/' })
        }
    } else {
        // 没有meta.auth 不用管
        next()
    }
});
export default router;