import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './vuex/store'
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
import './registerServiceWorker'
import axios from 'axios';
import VueAxios from 'vue-axios';
import Vuex from "vuex"

Vue.config.productionTip = false
Vue.use(Mint);

new Vue({
    router,
    store,
    axios,
    VueAxios,
    Vuex,
    render: h => h(App)
}).$mount('#app');