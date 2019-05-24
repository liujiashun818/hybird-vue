import Vue from "vue";
import App from "./App";
import router from "./router/index";
import store from './store'
import * as filters from 'src/filters/base'
import axios from 'src/axios/http'
import BScroll from 'better-scroll'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import './stylus/reset.styl'
import './stylus/base.styl'

// promise等全局工具解析器
import 'babel-polyfill'
// 适配方案 
import 'amfe-flexible'

Vue.prototype.$axios = axios;
Vue.prototype.$BScroll = BScroll
Vue.prototype.$url = '//sxzwapi.sxrbw.com' // 政务接口域名 正式环境
// Vue.prototype.$url = '//testsxappzwapi.peopletech.cn' // 政务接口域名 4.1测试

Object.keys(filters).map(key => {
  Vue.filter(key, filters[key])
})

Vue.use(MintUI)
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")


