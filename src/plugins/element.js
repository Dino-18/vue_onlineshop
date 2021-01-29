import Vue from 'vue'
import { Button, Form, FormItem, Input, Message } from 'element-ui'
//导入弹框提示组件
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.prototype.$message = Message //将弹框组件挂载到弹框对象上
