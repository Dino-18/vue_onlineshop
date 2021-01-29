import Vue from 'vue'
import App from './App.vue' //导入根组件
import router from './router' //导入路由组件
//导入全局样式表
import './assets/css/global.css'
import './plugins/element.js'
//导入字体图标
import './assets/fonts/iconfont.css'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
//配置请求的根路径
axios.defaults.baseURL = `http://vueshop.pixiv.download/api/private/v1`
Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  router,//将路由挂载到vue实例
  render: h => h(App) //通过render将app根组件渲染到页面
}).$mount('#app')