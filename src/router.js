import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
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
        }, {
            path: '/ate',
            name: 'ate',
            component: () =>
                import ('./views/ate.vue'),
        }, {
            path: '/me',
            name: 'me',
            component: () =>
                import ('./views/me.vue'),
        }
    ]
})