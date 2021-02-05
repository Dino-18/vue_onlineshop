import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/user/Users.vue'
import Rights from '../components/power/Rights.vue'
import Roles from '../components/power/Roles.vue'
import Cate from '../components/goods/Cate.vue'
import Params from '../components/goods/Params.vue'
import GoodsList from '../components/goods/List.vue'
// Welcome是Home的子路由，以子路由的形式存在在home路由中
Vue.use(VueRouter)

const routes = [
]
//路由规则
const router = new VueRouter({
  routes: [
    { path: '/', redirect:'/login'},
    { path: '/login', component: Login},
    { 
      path: '/home', 
      component: Home, 
      redirect: '/welcome',
      children: [
      { path: '/welcome', component: Welcome},
      { path:'/users', component: Users},
      { path:'/rights', component: Rights},
      { path:'/roles', component: Roles},
      { path:'/categories', component: Cate},
      { path:'/params', component: Params },
      { path:'/goods', component: List}
    ]},
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
