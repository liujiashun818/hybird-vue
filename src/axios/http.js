import axios from "axios";
import {Toast} from "mint-ui";
import BASE_URL from '@/config/index';

// 为axios配置公共路径
axios.defaults.baseURL = BASE_URL; // 测试

// ajax请求统一增加请求头
axios.interceptors.request.use(config => {
    config.headers.common = {
        'Content-Type': "application/x-www-form-urlencoded"
    }
    config.timeout = 12000
    return config
}, err => {
    return null
})

// 拦截响应response，并做一些错误处理
axios.interceptors.response.use((response) => {
    const data = response.data;

    return data;
}, (err) => {
    // 这里是返回状态码不为200时候的错误处理
    if (err.toString().indexOf("timeout") != -1) {
        console.log(err);
    }
    if (err && err.response) {
        switch (err.response.status) {
            case 400:
                err.message = '请求错误'
                break

            case 401:
                err.message = '未授权，请登录'
                break

            case 403:
                err.message = '拒绝访问'
                break

            case 404:
                err.message = `请求地址出错: ${err.response.config.url}`
                break
            case 405:
                err.message = `请求地址出错:`
                break
            case 408:
                err.message = '请求超时'
                break

            case 500:
                err.message = '服务器开个小差，请稍后再试'
                break

            case 501:
                err.message = '服务器开个小差，请稍后再试'
                break

            case 502:
                err.message = '服务器开个小差，请稍后再试'
                break

            case 503:
                err.message = '服务器开个小差，请稍后再试'
                break

            case 504:
                err.message = '服务器开个小差，请稍后再试'
                break

            case 505:
                err.message = 'HTTP版本不受支持'
                break

            default:
        }

        if (err.response.data.message) {
            err.message = err.response.data.message
        }

        Toast({
            message: err.message
        });
    }

    return Promise.reject(err)
})


export default axios;
