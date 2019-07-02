import axios from 'axios' // axios引用
import qs from "qs";

axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

axios.interceptors.request.use(function(config) {
    // 在发送请求之前做些什么
    if (config.method === 'post') {
        config.data = qs.stringify(config.data)
    }
    return config;
}, function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
export default axios;