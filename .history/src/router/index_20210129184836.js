import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
Vue.use(VueRouter)

const routes = [
]
//路由规则
const router = new VueRouter({
  routes: [
    { path: '/', redirect:'/login'},
    { path: '/login', component: Login},
    { path: '/home', component: Home}
  ]
})

//挂载路由导航首位，为router对象挂载beforeEach函数，接收回调函数
router.beforeEach((to, from, next)=>{
  //to将要访问的页面
  //from从哪个页面跳转的
  //next是一个函数，表示放行：（1）next()放行；（2）next('/login')强制跳转
  if(to.path=='/login') return next();
  //获取token
  const tokenStr = window.sessionStorage.getItem('token');
  if(!tokenStr) return next('/login')
  next()
})
export default router
