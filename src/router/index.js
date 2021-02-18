import Vue from 'vue'
import VueRouter from 'vue-router'
// 懒加载: 登录——主页——欢迎页
const Login = () => import(/* webpackChunkName: "login_home_welcome" */ "../components/Login.vue")
const Home = () => import(/* webpackChunkName: "login_home_welcome" */ "../components/Home.vue")
const Welcome = () => import(/* webpackChunkName: "login_home_welcome" */ "../components/Welcome.vue")

// 用户管理, 权限管理
const Users = () => import(/* webpackChunkName: "users_rights_roles" */ "../components/user/Users.vue")
const Rights = () => import(/* webpackChunkName: "users_rights_roles" */ "../components/power/Rights.vue")
const Roles = () => import(/* webpackChunkName: "users_rights_roles" */ "../components/power/Roles.vue")

// 商品管理
const Cate = () => import(/* webpackChunkName: "goods" */ "../components/goods/Cate.vue")
const Params = () => import(/* webpackChunkName: "goods" */ "../components/goods/Params.vue")
const GoodsList = () => import(/* webpackChunkName: "goods" */ "../components/goods/List.vue")
const Add = () => import(/* webpackChunkName: "goods" */ "../components/goods/Add.vue")

// 订单管理// 数据可视化
const Order = () => import(/* webpackChunkName: "order_Report" */ "../components/order/Order.vue")
const Report = () => import(/* webpackChunkName: "order_Report" */ "../components/report/Report.vue")
// import Login from '../components/Login.vue'
// import Home from '../components/Home.vue'
// import Welcome from '../components/Welcome.vue'
// import Users from '../components/user/Users.vue'
// import Rights from '../components/power/Rights.vue'
// import Roles from '../components/power/Roles.vue'
// import Cate from '../components/goods/Cate.vue'
// import Params from '../components/goods/Params.vue'
// import GoodsList from '../components/goods/List.vue'
// import Add from '../components/goods/Add.vue' 
// import Order from '../components/order/Order.vue'
// import Report from '../components/report/Report.vue'
//Welcome是Home的子路由，以子路由的形式存在在home路由中
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
      { path:'/goods', component: GoodsList},
      { path:'/goods/add', component: Add},
      { path:'/orders', component: Order},
      { path:'/reports', component: Report}
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
