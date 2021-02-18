# 项目效果展示
#### 1. 登录界面
<img src="https://github.com/Dino-18/vue_onlineshop/blob/main/images/login.JPG" tittle="登录页面" width="800" height="400"/><br/>
#### 2. 主页
<img src="https://github.com/Dino-18/vue_onlineshop/blob/main/images/welcome.JPG" tittle="登录页面" width="800" height="400"/><br/>
#### 3. 用户列表
<img src="https://github.com/Dino-18/vue_onlineshop/blob/main/images/user_list.JPG" tittle="登录页面" width="800" height="400"/><br/>
#### 4. 用户权限管理
##### (1)用户添加角色，分配权限
<img src="https://github.com/Dino-18/vue_onlineshop/blob/main/images/rights.JPG" tittle="登录页面" width="800" height="400"/><br/>
##### （2）用户权限列表查看
<img src="https://github.com/Dino-18/vue_onlineshop/blob/main/images/roles.JPG" tittle="登录页面" width="800" height="400"/><br/>
#### 5. 商品管理
##### （1）商品列表
<img src="https://github.com/Dino-18/vue_onlineshop/blob/main/images/goods_list.JPG" tittle="登录页面" width="800" height="400"/><br/>
##### （1-1）添加商品
<img src="https://github.com/Dino-18/vue_onlineshop/blob/main/images/goods_add.JPG" tittle="登录页面" width="800" height="400"/><br/>
##### （2）商品参数
<img src="https://github.com/Dino-18/vue_onlineshop/blob/main/images/goods_paramset.JPG" tittle="登录页面" width="800" height="400"/><br/>
##### （3）商品分类
<img src="https://github.com/Dino-18/vue_onlineshop/blob/main/images/goods_cate.JPG" tittle="登录页面" width="800" height="400"/><br/>
#### 6. 订单管理
##### (1)订单列表
<img src="https://github.com/Dino-18/vue_onlineshop/blob/main/images/order.JPG" tittle="登录页面" width="800" height="400"/><br/>
##### (2)订单物流信息
<img src="https://github.com/Dino-18/vue_onlineshop/blob/main/images/order_route.JPG" tittle="登录页面" width="800" height="400"/><br/>
#### 7. 报表查看
<img src="https://github.com/Dino-18/vue_onlineshop/blob/main/images/report_charts.JPG" tittle="登录页面" width="800" height="400"/><br/>
# 一、概述和初始化
#### 概述
基本业务：PC后台管理项目
开发模式：
> 前端项目：基于Vue技术栈的单页面项目；

技术选型：
> 前端技术栈：Vue Vue-router Element-UI（组件库） Axios Echarts（绘制图形报表）
> 后端技术栈：Node.js Express Jwt（状态保持工具，实现登录记录） Mysql Sequelize（操作数据库的框架）

#### 前端初始化
（1）安装脚手架
（2）通过Vue脚手架创建项目
（3）配置Vue路由
（4）配置Element-UI（组件库）
（5）配置Axios库
（6）初始化git远程仓库
（7）本地项目托管到github中

#### 后台环境安装配置
（1）安装mysql数据库
（2）安装node.js
（3）配置项目相关信息
（4）启动项目
（5）使用Postman测试后台项目接口是否正常

# 二、登录/退出功能
（1）登录业务流程
登陆界面输入用户名密码->调用后台接口进行验证->通过验证后，根据后台像供应状态跳转到项目主页
（2）相关技术点
* http是无状态的
* 通过cookie在客户端记录状态（前端和接口之间不存在跨域问题）
* 通过session在服务端记录状态（前端和接口之间不存在跨域问题）
* 通过token方式维持状态（前端和接口之间存在跨域问题）

#### 登录-token原理分析
![fcd05dd4a3955f54879f9e94e1d4ecb2.png](en-resource://database/646:1)

#### （1）创建登陆组件
./components/Login.vue 包含div script和style
通过路由将登录组件渲染到页面中，使用路由重定向设置登录默认页面；
#### （2）登陆组件基本布局（在Login.vue中布局）
* 将body和html设置为100%（全局样式，生成一个单独的样式文件）
* 生成div登录框，居中对齐：
```
.login_box {
    position: absolute; //让盒子居中显示
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    left: 50%;
    top:50%;
    transform: translate(-50%, -50%);
}
```
* 设置登录小图标，同样实现居中对齐，以及常规的样式操作

* 设置登录密码框和小按钮，直接从element ui中导入即可。
> （1）遇到的小问题：无法引入样式；解决方案：在main.js中引入
import 'element-ui/lib/theme-chalk/index.css'；
> （2）使用了flex布局设置对齐方式；
> （3）让input表单向下对齐，并设置宽度100%，左右padding，此时会撑开盒子，可以使用怪异盒子模型：box-sizing: border-box；
> （4）输入框之前加上小图标方式：属性方式，slot方式

* 登陆组件表单数据绑定
> （1）为el-form添加: model绑定指向属性对象（双向绑定）
> （2）为每一个表单项通过v-model绑定到数据对象上对应的属性中

* 登录表单数据验证---鼠标离开时验证输入数据合法性
> （1）为el-form通过属性绑定到:rules校验对象；
> （2）在data数据中name定义校验规则，其中每个属性都是一项规则；
> （3）为每一项el-form-item通过prop="name"指定不同验证规则

* 实现表单重置
>（1）为表单添加ref引用名称'loginFormRef'，值就是组件的实例对象；
>（2）在方法定义中，通过this.$refs.loginFormRef即可获取表单引用对象；
>（3）通过ESUI里表单的resetFields方法清除表单元素

* 登陆前预验证---点击登录时调用表单validate函数验证，参数是一个回调函数。
该回调函数会在校验结束后被调用，并传入两个参数：是否校验成功和未通过校验的字段。若不传入回调函数，则会返回一个 promise
> 方式和表单重置类似，需要为登录按钮绑定点击事件，新增login方法。添加箭头函数获取返回的bool结果。

* 登陆组件根据预验证是否发起请求，配置登陆状态弹框提示
> 返回promise可以通过async和await简化

* 登陆之后的操作
> （1）将登陆后token保存在客户端的sessionStorage（会话期间保存，不是永久的）中；
> 项目中除了登录之外的其他API接口，必须在登录之后才能访问；
> token只在当前网页打开期间失效，所以将token保存在sessionStorage中；
> （2）通过编程式导航push方法跳转到后台主页，地址时是/home

#### （3）登录/退出功能
* 登录功能实现---路由导航守卫控制访问权限
特点：如果用户没有登陆，但是直接通过URL访问特定页面，需要重新导航到登陆页面。
路由导航守卫：为路由对象添加beforeEach导航守卫：
```
router.beforeEach((to, from, next)=>{
    //如果用户访问登录页直接放行，从sessionStorage中获取保存的token值。
const tokenStr = window.sessionStorage.getItem('token');
    //如果没有token，强制跳转到登录页，beforeEach接收回调函数
    //to将要访问的页面
    //from从哪个页面跳转的
    //next是一个函数，表示放行：（1）next()放行；（2）next('/login')强制跳转
})
```

* 退出功能---销毁本地token
> window.sessionStorage.clear()
> this.$router.push('/login')


# 三、主页布局
包含头部区域，侧边栏区域和右侧主体区域
#### （1）头部区域
* 布局--直接从element-ui中寻找合适的样式即可。注意要在element.js中引入相关组件，再使用height:100%让container充满页面；
* 样式：设置图片和标题的样式，为flex布局，保持靠左。
#### （2）侧边栏区域
* 布局：在element找到相应菜单模板
##### 通过接口获取菜单数据
除登录接口，其他接口都需要在api请求头中添加authorization字段提供的token令牌
方法：通过axios请求拦截器添加token，保证拥有获取数据的权限。为请求头对象挂载自定义属性，值为token
```
async getMenulist() {
      const {data: res} = await this.$http.get('/menus'); //通过get获取菜单内的数据
      // get返回的是promise，可以用awaite和async简化
      if(res.meta.status!==200) return this.$message.error()// 返回失败
      this.menulist = res.data// 获取左侧菜单数据，并保存到menulist中
      console.log(res)
    }
  }
```
#### 将侧边栏数据绘制到UI界面
> （1）一级菜单渲染item，使用v-for循环，需要加:key="item.id"。根据data里item的个数添加一级菜单个数。为submenu的index绑定item.id`: index="item.id"`，避免每一个选项栏的index相同
> 使用unique-opened保证每次只有一个菜单展开
> （2）二级菜单渲染：循环一级菜单的children属性
> （3）点击按钮菜单折叠，为按钮绑定点击事件添加toggleCollapse方法。为菜单添加collapse='isCollapse'属性（bool值），点击按钮时可以切换bool值。在data中添加isCollapse对象，初始化为false。并在toggleCollapse方法中设置`this.isCollapse = !this.isCollapse`

#### （3）首页路由重定向
* （1）welcome嵌套在首页中，因此属于Home的子路由，需要在router中导入Welcome页路由并在路由规则中：在原来的home路由中嵌套children路由规则，`children: [ {path: '/welcome', component: Welcome}]`
并使用redirect重定向到welcome页：默认打开Home页时就定向到welcome
* （2）在主体区域放置路由占位符
* （3）左侧菜单改造为路由链接
> 使用navmenu的router属性（而不是为侧边栏每一个子菜单定向），启用该模式会在激活导航时以 index 作为 path 进行路由跳转
> 使用data数据中的'/'+subItem.path作为跳转地址，保存为每一个子菜单的index
> 通过子菜单的index设置为:index = 'subItem.path'跳转到对应路由地址

# 四、用户管理功能
### 1. 用户列表
* [ ] 点击侧边栏小菜单高亮设计---每次点击时将路由地址保存在sessionStorage中，创建页面时取出该值，赋值给菜单的default-active默认高亮属性。为子菜单点击事件绑定该方法。
> 创建页面的标志：生命周期函数created()，在其中添加：
this.activePath = windows.sessionStorage.getItem('activePath')
同时，当链接切换时，也需要切换高亮，即重新对this.activePath赋值
* 新建users.vue文件，在router中导入该文件，并在home组件路由的子路由中添加该链接（服务器提供的接口链接）（都是在home主页嵌套显示渲染的）。
##### （1）用户列表组件UI结构
结构：头部---面包屑导航区域；卡片视图区域
改变原来的UI自带元素样式时由于覆盖了原来的样式，尽量都写到css/global.css文件中
分栏间隔等问题可以直接用element UI 中的layout布局（原理是栅格系统（grid systems））

#### （2）获取用户数据列表
请求方法：get
请求参数：query, pagenum, pagesize
script中定义：data，created（生命周期函数），methods
> 在created生命周期函数中发起当前组件的获取数据请求函数getUserList()函数，并在methods中定义发起ajax数据请求，相关参数在data中定义，get返回的同样是promise对象
```
created() {
        this.getUserList()
    },
    methods: {
        async getUserList() {
            const {data: res} = await this.$http.get('users', { params: this.queryInfo })
        }
    }
```
#### （3）渲染用户列表数据
> 使用table模板
并添加索引列：直接type='index'即可
* 状态列用开关效果显示（而不是原始数据bool值）---Switch开关
> 方法：作用域插槽
```
            <template slot-scope="scope">
                         {{scope.row}} //该对象就是这一用户的数据，根据该数据里面的具体状态属性bool值渲染结构
             </template>
```
使用v-model双向绑定让开关绑定到数据的状态

* 操作列渲染---作用域插槽

#### （4）数据分页效果
引入el-pagination组件
#### （5）用户状态更改
> 为switch绑定change事件（element-ui中），监听事件，状态发生变化时执行userStateChange()回调函数
> 拿到状态后，发起数据请求，调用API接口保存用户状态，修改方法为put，调用成功服务器返回200
```
 //监听开关状态函数
        async userStateChange(userinfo) {
            console.log(userinfo)
            const {data:res} = await this.$http.put(`users/${userinfo.id}/state/${userinfo.mg_state}`)
            if(res.meta.status !== 200) {
                //调用接口失败就把状态值重置回去
                userinfo.mg_state =! userinfo.mg_state
                return this.message.error('更新用户状态失败！')
            }
            this.$message.success('更新用户状态成功！')
        },
```
#### （6）实现搜索功能
> 为搜索文本框双向绑定返回数据，并给搜索按钮绑定点击事件
> 在事件处理函数中调用getUserList函数
 
 优化：当文本输入框清空时，所有用户信息自动出现
 >方法：使用clearable属性，并绑定clear事件，再重新发起请求

#### （7）添加用户功能
> 导入dianog对话框，并为按钮以及弹出框绑定点击事件控制弹出框显示与隐藏

##### 添加用户弹出框表单
> 添加el-form，添加数据绑定对象addForm和验证规则对象addFormRules，将数据双向绑定到data中，并定义校验规则
* 自定义校验规则（手机和邮箱）
> 定义一个箭头函数表示校验规则
> 在具体的规则中通过validator使用校验规则
* 重置操作
> 监听对话框关闭事件
```
addDialogClosed() {
            this.$refs.addFormRef.resetFields()
        }
```
* 点击确认前的表单预验证

#### （7）用户修改操作
> 绑定点击修改对话框弹出事件
> 对话框里显示用户原有属性：根据用户id查询用户信息；在按钮中`@click="showEditDialog(scope.row.id)`将用户id通过形参传入修改函数
> 接收到id后通过API接口调用用户信息保存在新建的editForm表单数据中
> 在data中数据绑定对象和验证规则对象

* 修改用户关闭后的操作
> 绑定close事件，重置表单
* 点击确认前的表单预验证
> 关闭前发出put请求，如果修改成功则关闭对话框，刷新数据列表，提示用户
```
//修改用户信息并提交
        editUserInfo() {
            this.$refs.editFormRef.validate(
                async valid => {//valid是否校验成功的bool值
                    if(!valid) return
                    //校验成功则可以添加用户的网络请求
                    const {data: res} = await this.$http.put('users/'+this.editForm.id, {email:this.editForm.email, mobile:this.editForm.mobile})
                    if(res.meta.status != 200){
                         this.message.error('更新用户失败！')
                    }
                    //隐藏添加用户对话框，并重新获取用户数据
                    this.editDialogVisible = false 
                    this.getUserList()
                    this.$message.success('更新用户成功！')
                })
            }
```
#### （8）用户删除操作
* 提示用户是否确认删除操作
> MessageBox弹框组件
```
//根据id删除用户
        async removeUserById(id) {
            //弹框询问确认
             const confirmResult = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).catch(err =>err)
            //如果用户确认删除则返回字符串confirm，取消则返回字符串cancel
            if(confirmResult!='confirm') {
                return this.$message.info('已经取消删除')
            }
            const {data:res} = await this.$http.delete('user/' + id)
            if(res.meta.status != 200){
                         this.message.error('删除用户失败！')
                    }
            this.$message.success('删除用户成功！')
            this.getUserList()
        }
```
#### （9）用户角色分配按钮
> 添加点击事件，弹出框。
> 弹出框之前要http请求获取角色列表数据；下拉菜单渲染到页面上：select选择器；
> 注意还需要监听关闭事件，保证每次弹出框关闭之后，下拉菜单的默认选项变成请选择。

# 五、权限管理
### 1、权限列表组件页面
首先通过路由形式，将子路由加载到主页中去。
请求权限列表数据，并渲染到页面中，以table的形式显示
el表格加竖线并隔行变色：`border stripe`
美化权限等级标签：
* 通过作用域插槽自定义插入形式
```
<el-table-column label="权限等级" prop="level">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.level==='0'">一级</el-tag>
                    <el-tag type="success" v-else-if="scope.row.level==='1'">二级</el-tag>
                    <el-tag type="warning" v-else>三级</el-tag>
                </template>
            </el-table-column>
```
### 2. 角色列表
首先通过路由形式，将子路由加载到主页中去。
请求角色列表数据，并渲染到页面中
##### 自主实现了用户的角色更新和删除操作
* 注意这里修改用户是根据用户的`editForm.roleId`确定的
* 删除用户同样是传入形参id，利用作用域插槽，绑定属性实现的
* 两个功能最后都需要通过`this.getRoleList()`重新刷新列表
##### 作用域插槽实现左侧分配权限渲染按钮
权限分配是一个多层嵌套对象，因此需要多个for循环来渲染
* 渲染多层结构，利用栅格系统渲染---组件el-row（每一行有24列）
* 三级权限可以触发点击删除事件
注意删除完毕之后如果使用`this.getRoleList();//这里会重新渲染整个权限表格，从而导致刚才的页面（权限查看页面）关闭`。因此直接使用`role.children = res.data`更新列表即可

#### 右侧分配权限按钮
*  引入dialog弹出框
*  在点击按钮显示弹出框前先获取所有的权限数据，使用树形形式
*  树形控件导入，优化
> 复选框设置show-checkbox 
> 选中复选框时对应id编号，node-key="id"
> 默认展开 default-expand-all
> 已有权限默认勾选：点击点击事件时获取对应三级权限，加入数组中
```
//通过递归形式，获取角色下所有的三级权限
    getLeafKeys(node, arr) {
        //判断是否为三级权限
        if(!node.children) {
            return arr.push(node.id)
        }
        //如果不是，则递归调用，寻找子节点
        node.children.forEach(item=>
        this.getLeafKeys(item,arr))
    }
    }
```
注意：对话框关闭时要清空数组

* 角色授权
> 获取树型结构中所有已选中和半选中id数组：使用tree控件getCheckedNodes和getHalfCheckedNodes方法
```
//点击为角色分配权限
    async allotRights() {
        const keys = [
            ...this.$refs.treeRef.getCheckedKeys(),//通过展开运算符加入数组
            ...this.$refs.treeRef.getHalfCheckedKeys(),
        ];
        const idStr = keys.join('.')//以字符串形式拼接权限id
        const {data: res} = await this.$http.post(`roles/${this.roleId}/rights`, { rids: idStr })
        // console.log(res)
        if(res.meta.status != 200){
            return this.$message.error('分配用户权限失败！')
            }
        this.$message.success('分配用户权限成功！')
        this.getRoleList()
        this.setRightdialogVisible = false
    }
```
  
 # 六、商品管理
 ## 1. 商品分类
 #### （1）获取数据
 #### （2）渲染树形列表
 * 安装vue-table-with-tree-grid依赖，在main.js中导入插件
 * 是否有效 自定义列表中显示形式：作用域插槽自定义模板列

```
 <!-- 表格 -->
<tree-table :data="catelist" :columns="columns" :selection-type='false' :expand-type='false' show-index index-text='#' border> 
    <template slot="isok" slot-scope="scope">
        <!-- 引入两个图标，按照scope的值按需渲染 -->
        <i class="el-icon-success" v-if="scope.row.cat_deleted === false" style="color:lightgreen"></i> 
        <i class="el-icon-error" v-else style="color:red"></i>
    </template>
</tree-table
            
//为树形表格指定列的定义
columns: [{
    label: '分类名称',
    prop: 'cat_name'
},{
    label: '是否有效',
    type:'template', //将当前列定义为模板列，使用template属性自定义
    template: 'isok', //当前这一列使用的模板名称
}]
```

* 排序和操作列
类似于上述作用于插槽

#### （3）分页区域
跟user里差不多
#### （4）添加分类
* 在点击添加分类按钮时，就需要将所有的分类等级加载出来（最多只有三级分类，因此父级分类只有两级）
*  级联选择器中，添加的分类名称要根据级联选择器选择的项目确定属于添加的几级分类，因此每次点击事件发生后都要立即获取当前级联选择器中的等级；如果没有选择则代表添加的是一级分类；
*  关闭后，重置表单
```
 <!-- 用户添加框分类表单主区域 -->
        <el-form :model="addCateForm" :rules="addCateFormRules" ref="addCateFormRef" label-width="100px">
            <el-form-item label="分类名称：" prop="cat_name">
                <el-input v-model="addCateForm.cat_name"></el-input>
            </el-form-item>
            <el-form-item label="父级分类：">
                <!-- 需要放入级联选择框 -->
                <!-- options用来指定数据源 -->
                <!-- props用来指定配置对象 -->
                <!-- v-model双向绑定选中的父子数组 -->
                <el-cascader   
                    v-model="selectedKeys"
                    :options="parentCateList"
                    :props="cascaderProps"
                    @change="parentCateChange"
                    clearable
                    change-on-select>
                </el-cascader>
            </el-form-item>
        </el-form>
```
```
//添加分类弹出框
        showAddCateDialog() {
            //先获取父级分类对话列表，在展示对话框
            this.getParentCateList()
            this.addCateDialogVisible = true
        },
        //获取父级分类的列表
        async getParentCateList() {
            const {data:res} = await this.$http.get('categories', { params:{ type: 2} })
        if(res.meta.status != 200) return this.$message.error('获取父级分类数据失败！')
        // console.log(res.data)    
        this.parentCateList = res.data
        },
        //选择项发生变化触发
        parentCateChange() {
            console.log(this.selectedKeys)
            //如果selectedKeys数组的length>0，代表选中了父级分类，否则没有
            if(this.selectedKeys.length>0) {
                //父级分类的id
                this.addCateForm.cat_pid = this.selectedKeys[this.selectedKeys.length-1]
                //当前添加的分类等级
                this.addCateForm.cat_level = this.selectedKeys.length
                return
            } else {
                //如果没有选中父级，证明想要添加的是0级分类
                this.addCateForm.cat_pid = 0
                this.addCateForm.cat_level = 0
            }
        }
```
* 添加完成后，将数据获取预验证后，post同步到网络

## 3. 参数管理
显示商品的固定特征信息：动态参数（供用户动态选择）、静态属性（用户只读，商品固定参数）
只允许为三级分类的商品设置特征信息参数
* 创建组件页面，导入路由信息
* 初始化面包屑导航区域和卡片视图区域，在卡片视图上方添加警告提示按钮
* get获取所有分类列表数据
* 利用element ui使用级联选择框渲染分类列表数据，并且需要双向绑定到一个数组中，每当选定分类后，数组获取选定的分类数据。
> 级联选择器只能选择三级分类，对此做出属性改变。方法：监听选择器的change事件，判断数组的长度只能为3
```
在监听选择器变化函数中：
//判断当前选中的是否为三级分类
    if(this.selectedCateKeys.length!=3) {
        this.selectedCateKeys = []
        return
    }
```

* 动态参数和静态属性页面渲染
> 引入页签组件Tabs和Tabplane绘制动态参数和静态属性选择区域
> 绘制添加参数和添加属性按钮，设置禁用方式：当级联选择器中未选择商品时禁用该按钮（根据数组中的长度确定） 将该函数的返回值动态绑定到按钮上
```
computed: {
        //如果按钮需要被禁用，返回true，否则返回false
        isBtnDisabled() {
            if(this.selectedCateKeys.length!=3) {
                return true
            }
            return false
        }
    }
```
* 选择完所需改变属性的商品后就发起数据请求，根据数组里的内容传入参数（是需要静态参数还是动态属性）
> 当切换面板时同样需要重新发起数据请求
> 直接将数据请求方法封装起来，上面两种情况分别调用即可。注意：封装后需要判断当前获取的是哪个属性（动态还是静态），再进行渲染
```
//级联选择框变化的时候会触发，获取数组里的数据
        handleChange() {
            this.getParamsData()
        },
        //tab页签点击事件处理函数
        handleTabClick() {
            console.log(this.activeName)
            this.getParamsData()
        },
        // 无论是选定了三级商品还是切换了当前需要获取的页签，都需要发起数据请求
        async getParamsData() {
            //判断当前选中的是否为三级分类
            if(this.selectedCateKeys.length!=3) {
                this.selectedCateKeys = []
                return
            }
            //当选中三级分类
            // console.log(this.selectedCateKeys)
            //根据所处面板和所取id获取参数
            const {data: res} = await this.$http.get(`categories/${this.cateId}/attributes`, {params: {sel: this.activeName}})
            if(res.meta.status != 200) return this.$message.error('获取参数列表失败！')
            console.log(res.data)         
            //需要先判断当前获取的数据属于哪个类别的参数再做对应的渲染
            if(this.activeName==="many") {
                this.manyTableData = res.data
            } else {
                this.onlyTableData = res.data
            }
        }
```
> 1> 动态参数列表渲染和静态参数渲染
> 2> 添加参数和属性，由于基本内容一样，也可以使用同一个弹出框，根据需要动态绑定属性
> 3> 修改和删除参数和属性
```
async removeParams(attr_id) {
        const confirmResult = await this.$confirm('此操作将永久删除该参数, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
        }).catch(err=>err)
        if(confirmResult!=='confirm') {
            return this.$message('已取消删除')
        }
        //删除
        const {data: res} = await this.$http.delete(`categories/${this.cateId}/attributes/${attr_id}`)
        if(res.meta.status != 200) return this.$message.error('删除参数失败！')
        this.$message.success('删除参数成功！')
        this.getParamsData()  
    }
```
* 左侧版式查看增加按钮渲染 attr_name 下的 attr_vals，都是字符串的数据，需要渲染为一个个的标签
> 思路：通过for循环将数组中的数据渲染成标签
```
//将字符串形式的属性数据改成数组
            res.data.forEach(item =>{ 
                item.attr_val = item.attr_val ?
                item.attr_vals = item.attr_vals.split(',') : []
            })
```
```
<!-- 展开行 -->
<el-table-column type="expand"> 
    <template slot-scope="scope">
        <el-tag v-for="(item, i) in scope.row.attr_vals" :key="i" closable>
            {{item}}
        </el-tag>
    </template>
</el-table-column>
```
> 添加按钮和文本输入框的切换---通过bool值控制切换：引入element ui的动态编辑标签
问题：每渲染一个展开行都共用一个inputVisible和inputValue会导致同一个商品的不同样式输入的文本，以及切换都相同：解决方法：为每一行数据提供唯一的inputValue
在分割样本时为每一个数据都添加唯一的：
```
res.data.forEach(item =>{
                item.attr_vals = item.attr_vals? item.attr_vals.split(','):[]
                //控制文本框的显示与隐藏
                item.inputVisible = false
                item.inputValue = ''
            })
            
 <!-- 输入文本框 -->
<el-input
    class="input-new-tag"
    v-if="scope.row.inputVisible"
    v-model="scope.row.inputValue"
    ref="saveTagInput"
    size="small"
    @keyup.enter.native="handleInputConfirm"
    @blur="handleInputConfirm"
>
</el-input>
```
> 文本框自动获得焦点的方法
```
//文本框自动获得焦点
            //$nextTick，当页面上的元素被重新渲染之后，才会指定回调函数中的代码
            this.$nextTick(_ => {
            this.$refs.saveTagInput.$refs.input.focus();
            });
```
> 失去焦点，添加参数
```
 async removeParams(attr_id) {
            const confirmResult = await this.$confirm('此操作将永久删除该参数, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).catch(err=>err)
            if(confirmResult!=='confirm') {
                return this.$message('已取消删除')
            }
            //删除
            const {data: res} = await this.$http.delete(`categories/${this.cateId}/attributes/${attr_id}`)
            if(res.meta.status != 200) return this.$message.error('删除参数失败！')
            this.$message.success('删除参数成功！')
            this.getParamsData()  
        },
        //文本框失去焦点或者按下enter键都会触发
        async handleInputConfirm(row) {
            console.log('OK')
            if(row.inputValue.trim().length===0) {
                row.inputValue = ''
                row.inputVisible = false //当失去焦点时隐藏输入框，判断输入内容的合法性
                return
            }
            //如果没有return，则输入了内容，可以添加参数
            // row.inputValue push到数组中
            row.attr_vals.push(row.inputValue.trim())
            row.inputValue = ''
            row.inputVisible = false
            // 存储到数据库中，在这之前要重新将数组拼接成字符串
            const {data:res} = await this.$http.put(`categories/${this.cateId}/attributes/${row.attr_id}`, { attr_name: row.attr_name, attr_sel: row.attr_sel, attr_vals: row.attr_vals.join(',')})
            if(res.meta.status != 200) return this.$message.error('修改参数失败！')
            this.$message.success('修改参数成功！')      
        },
```
* 删除参数

## 3. 商品列表
* 渲染面包屑导航区和卡片视图
* 获取数据
* 将获取到的商品列表渲染到页面上
* 在main.js中创建一个全局的时间处理函数，将绝对时间戳转变为时间
```
Vue.filter('dateFormat', function(originVal) {
      const dt = new Date(originVal)
      const y = dt.getFullYear()
      const m = (dt.getMonth() + 1 + '').padStart(2, '0') //月份不足两位首位填充0
      const d = (dt.getDate() + '').padStart(2, '0')
      const hh = (dt.getHours() + '').padStart(2, '0')
      const mm = (dt.getMinutes() + '').padStart(2, '0')
      const ss = (dt.getSeconds() + '').padStart(2, '0')
      return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
}) 
```
* 添加页码
* 搜索与清空功能：input双向绑定属性，button添加click监听事件查询。清空：input添加clearable属性，当clear时重新查询全部数据
* 删除商品

#### 添加按钮添加商品页面
* 创建新页面Add.vue
* 面包屑和基本试图区域内容绘制
* 进度条绘制
> 控制激活项目 :active；需要实现步骤条和tab栏区域信息的联动效果---同步切换；
> 让tab栏区域下的每一项也绑定v-model属性：关键思路---共用同一项数值activeIndex；
> 值得注意的是：进度条和tab栏的切换值属性不一样，一个是数值一个是字符串，因此需要先进行同步操作：'activeIndex-0' 将字符串转换成数字

* 获取分类数据---级联选择器
* 如果当前视图的级联选择器信息未选择完则禁止切换到下一个视图：
>el-tabs添加切换视图监听事件
```
beforeTabLeave(activeName, oldActiveName) {
            if(oldActiveName===0 && this.addForm.good_cat.length!==3) {
                this.$message.error('请先选择商品分类')
                return false
            }  
        }
```
* 获取商品参数
```
//当访问动态参数列表时
if(this.activeIndex === '1') {
            const {data: res} = await this.$http.get(`categories/${this.addForm.goods_cat.length === 3? this.addForm.goods_cat[2]: null}/attributes`, {params: {sel: 'many'}})
    // console.log(res.data)
    if(res.meta.status != 200) return this.$message.error('获取参数列表数据失败！')
    // console.log(res.data)
    this.manyTableData = res.data
}
```
* 使用复选框渲染属性
```
<!-- 复选框组 -->
<el-checkbox-group v-model="item.attr_vals">
    <el-checkbox border :label="cb" v-for="(cb, i) in item.attr_vals" :key="i"></el-checkbox>
</el-checkbox-group>
```
* 商品属性（类似于商品列表，通过v-model绑定到数组元素中）
* 
* **商品图片**
> 1> 上传图片按钮点击事件，弹出上传框---upload上传组件，图片列表缩略图格式；
> 2> 由于上传事件需要携带Authorization字段，该字段是在main.js通过axios请求中配置的。而el-upload并没有使用axios发起请求，而是通过自己封装的ajax请求函数处理的，因此需要重新为其设置token值，可以通过headers设置上传请求头。为上传图片提供token头部。
> 3> 将图片上传到服务器之后，再将图片存储到表单中：监听上传成功的事件，将服务器中缓存到的临时路径添加到数组中
```
//监听图片上传成功事件
        handleSuccess(response) {
            //1. 拼接得到一个图片信息对象
            //2. 将图片信息对象push到pics数组中
            const picInfo = {pic: response.data.tmp_path}
            this.addForm.pics.push(picInfo)
            console.log(this.addForm)
        }
```
> 4. 移除图片。onremove监听事件
```
// 处理移除图片操作
handleRemove(file) {
    // 1. 获取将要删除的图片的临时路径
    const filePath = file.response.data.tmp_path
    // 2. 从pics数组中,找到这个图片对应的索引值
    const i = this.addForm.pics.findIndex(x => 
        x.pic === filePath
    )
    // 3. 调用数组的splice方法,把图片信息对象从pics数组中移除
    this.addForm.pics.splice(i,1)
    console.log(this.addForm)
},
```

> 5. 图片预览：请求304反映；上传路径后，该路径拒绝请求

* 商品内容编辑---商品内容编辑器
富文本编辑框，安装依赖包，在main.js里导入该包将该组件设置为全局可用组件

* 添加商品，为整个页面进行数据校验
**重点**：在级联选择器中，需要的goods_cat双向绑定到的addForm.goods_cat是数组类型，但是在最后提交数据的时候，要求的addForm.goods_cat是字符串类型，需要将生成的goods_cat数组对象转变为字符串。但是如果直接将当前的addForm.goods_cat转换为字符串，由于级联选择器是双向绑定到该对象上的，会造成错误。
因此在提交之前，需要对addForm对象进行深拷贝，从而不改变原addForm的类型
> 深拷贝：可以直接调用lodash包（需要安装），使用其中的cloneDeep(obj)方法

将静态和动态属性加入到addForm中
```
//添加商品
        add() {
            this.$refs.addFormRef.validate(valid=>{
                if(!valid) {
                    return this.$message.error('请填写必要的表单项目!')
                }
                // 添加商品
                // 将goods_cat数组转化为字符串
                const form = _.cloneDeep(this.addForm)
                form.goods_cat = form.goods_cat.join(',')
                // 处理动态参数
                this.manyTableData.forEach(item =>{
                    const newInfo = {attr_id: item.attr_id, 
                    attr_val: item.attr_vals.join(',')
                    }
                    this.addForm.attrs.push(newInfo)
                })
                //静态属性
                this.onlyTableData.forEach(item =>{
                    const newInfo = {attr_id: item.attr_id, 
                    attr_val: item.attr_vals
                    }
                    this.addForm.attrs.push(newInfo)
                })
                form.attrs = this.addForm.attrs
                console.log(form)
            })
        }
```
# 七、订单管理
* 分别渲染面包屑区域，表格区域，底部分页区域
* 修改地址弹出框：
> 直接导入城市信息
* 物流进度
timeline组件
```
<!-- 时间线 -->
       <el-timeline>
          <el-timeline-item
            v-for="(activity, index) in progressInfo"
            :key="index"
            :timestamp="activity.time">
            {{activity.context}}
          </el-timeline-item>
        </el-timeline>
```

# 八、数据报表
需要数据跟随鼠标浮动，需要将获取的数据深拷贝到options中，而不能直接用这个数据
> （1）获取数据
> （2）使用深拷贝将数据与options对象合并
> （3）将合并结果使用图表展示

# 九、优化和部署上线
### （1）优化
##### 添加loading进度条
导入nprogress包
基于拦截器设置进度条的展示和隐藏：
在main.js中，request请求发出->显示；response->隐藏
```
//在request拦截器中展示进度条 NProgress.start()
axios.interceptors.request.use(config =>{
  NProgress.start()
  // 最后必须return config
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
//在response拦截器中，隐藏进度条 NProgress.done()
axios.interceptors.response.use(config =>{
  NProgress.done()
  return config
}) 
```
##### build阶段不需要console.log
使用babel-plugin-transform-remove-console移除即可。
只在发布阶段生效：可以定义一个在项目发布（--mode production）阶段需要用到的babel插件。
```
const prodPlugins = []
if(process.env.NODE_ENV === 'production') {
    prodPlugins.push('transform-remove-console')
}
```
#### 1> 生成打包报告
方式：
（1）命令行方式，通过vue-cli命令vue-cli-service build --report
（2）UI面板通过控制台和分析面板查看报告信息，可以查看哪些文件较大
* 通过vue.config.js修改webpack的默认配置
新增configureWebpack（操作对象）和chainWebpack（链式编程）自定义webpack打包配置，两种都可以
> 通过chainWebpack自定义打包入口
```
module.exports = {
    chainWebpack: config => {
        // 产品发布阶段默认打包入口
        config.when(process.env.NODE_ENV === 'production', config => {
            config.entry('app').clear().add('./src/main-prod.js')
        })
        // 产品开发阶段默认打包入口
        config.when(process.env.NODE_ENV === 'development', config => {
            config.entry('app').clear().add('./src/main-dev.js')
        })
    }
}
```
#### 2> 第三方库启用CDN
通过externals加载外部CDN资源
原因：通过import语法导入的第三方依赖包，最终会被打包合并到同一个文件中，使得打包成功后，单文件体积过大；
解决：通过webpack的externals节点，配置并加载外部的CDN资源，凡是声明在externals中的第三方依赖包，都不会被打包。而是去window全局查找并直接使用该对象。
> 在发布模式中配置external节点；在index.html中新增对应的css样式表和js，在main-pro中删除对应import
#### 3> Element-UI组件按需加载
通过CDN优化element-ui导入，注释掉`import './plugins/element.js'`代码，并在index.html头部区域，通过CDN加载element-ui的js和css样式

#### 4> 路由懒加载
把不同的路由对应的组件分割成不同的代码块，当路由被访问时才加载对应组件。
> 1> 安装@babel/plugin-syntax-dynamic-import包；
> 2> 在babel.config.jx配置文件中声明该插件；
> 3> 将路由改为按需加载的形式
https://router.vuejs.org/zh/guide/advanced/lazy-loading.html
可以实现分组--相同分组被打包到同一个js文件中

#### 5> 首页内容定制
在chainWebpack中通过插件方式定制不同的首页内容---开发模式和发布模式
分别为两个模式设置不同的bool值，根据不同的值渲染不同的内容
```
// 发布阶段
config.plugin('html').taps(args =>{
                args[0].isProd = true
                return args
            })
            
// 开发阶段
config.plugin('html').taps(args =>{
            args[0].isProd = false
            return args
        })
```


