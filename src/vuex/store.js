import Vue from 'vue';
import Vuex from 'vuex'
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        username: localStorage.getItem('username') || '',
        token: localStorage.getItem('token') || null
    }
});
export default store;