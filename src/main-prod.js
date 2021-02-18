import Vue from 'vue'
import App from './App.vue' // 导入根组件
import router from './router' // 导入路由组件
import TreeTable from 'vue-table-with-tree-grid'
// 导入全局样式表
import './assets/css/global.css'
// import './plugins/element.js'
// 导入字体图标
import './assets/fonts/iconfont.css'
// import 'element-ui/lib/theme-chalk/index.css'
//导入NPprogress对应的JS和CSS
import NProgress from 'nprogress'

import axios from 'axios'
//导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'

// 配置请求的根路径
axios.defaults.baseURL = `http://vueshop.pixiv.download/api/private/v1`
//在request拦截器中展示进度条 NProgress.start()
axios.interceptors.request.use(config =>{
  NProgress.start()
  // 最后必须return config
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
//在response拦截器中，隐藏进度条 NProgress.done()
axios.interceptors.response.use(config =>{
  NProgress.done()
  return config
}) 
Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.component('tree-table', TreeTable)//注册为全局可见的组件
//将富文本编辑器注册为全局可用组件
Vue.use(VueQuillEditor)
Vue.filter('dateFormat', function(originVal) {
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0') //月份不足两位首位填充0
  const d = (dt.getDate() + '').padStart(2, '0')
  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
}) 

new Vue({
  router,// 将路由挂载到vue实例
  render: h => h(App) // 通过render将app根组件渲染到页面
}).$mount('#app')