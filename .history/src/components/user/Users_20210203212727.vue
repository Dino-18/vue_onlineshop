<template>
    <div>
        <!-- 面包屑导航区 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片视图区域 -->
        <el-card>
            <!-- 搜索添加区域 -->  
            <el-row :gutter="20"> 
                <!-- 一行中元素并排显示，按照栅格系统方式排列 -->
                <el-col :span="9">
                    <!-- 搜索框 -->
                    <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUserList">
                    <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <!-- 添加按钮 -->
                    <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
                </el-col>
            </el-row>

            <!-- 用户列表区域 -->
            <el-table :data="userList" border stripe>
                <el-table-column type="index">
                </el-table-column>
                <el-table-column label="姓名" prop="username">
                </el-table-column>
                 <el-table-column label="邮箱" prop="email">
                </el-table-column>
                 <el-table-column label="电话" prop="mobile">
                </el-table-column>
                 <el-table-column label="角色" prop="role_name">
                </el-table-column>
                 <el-table-column label="状态" prop="mg_state">
                     <template slot-scope="scope">
                         <!-- {{scope.row}}表示这一行用户的数据 -->
                         <el-switch v-model="scope.row.mg_state" @change="userStateChange(scope.row)">
                         </el-switch>
                     </template>
                </el-table-column>
                 <el-table-column label="操作" width="180px">
                     <!-- 屏蔽语法检查 -->
                     <!-- eslint-disable-next-line -->
                     <template slot-scope="scope">
                         <!-- 编辑按钮 -->
                        <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)"></el-button>
                         <!-- 删除按钮 -->
                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUserById(scope.row.id)"></el-button>
                         <!-- 分配角色按钮 -->
                        <el-tooltip effect="dark" content="分配角色" placement="bottom" :enterable="false">
                        <el-button type="warning" icon="el-icon-setting" size="mini" @click="setRole(scope.row)"></el-button>
                        </el-tooltip>
                     </template>
                </el-table-column>
            </el-table>
            <!-- 分页显示区域 -->
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryInfo.pagenum"
            :page-sizes="[1, 2, 5, 10]"
            :page-size="queryInfo.pagesize"
            layout="sizes, prev, pager, next, jumper"
            :total="total">
            </el-pagination>
        </el-card>
        <!-- 用户添加对话框 -->
        <el-dialog
        title="提示"
        :visible.sync="addDialogVisible"
        width="50%" @close="addDialogClosed">
        <!-- 用户添加框内容主区域 -->
        <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="addForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="addForm.password"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="addForm.email"></el-input>
            </el-form-item>
            <el-form-item label="手机" prop="mobile">
                <el-input v-model="addForm.mobile"></el-input>
            </el-form-item>
        </el-form>
        <!-- 底部区域 -->
        <span slot="footer" class="dialog-footer">
            <el-button @click="addDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addUser">确 定</el-button>
        </span>
        </el-dialog>
        <!-- 修改用户对话框 -->
        <el-dialog
            title="修改用户"
            :visible.sync="editDialogVisible"
            width="50%" @close="editDialogClosed">
            <!-- 内容主体区 -->
            <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
                <el-form-item label="用户名">
                    <el-input v-model="editForm.username" disabled></el-input>
                </el-form-item>
                 <el-form-item label="邮箱" prop="email">
                    <el-input v-model="editForm.email"></el-input>
                </el-form-item>
                 <el-form-item label="手机号" prop="mobile">
                    <el-input v-model="editForm.mobile"></el-input>
                </el-form-item>
            </el-form>
            <!-- 页脚 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editUserInfo">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 分配角色的对话框 -->
        <el-dialog
            title="分配角色"
            :visible.sync="setDialogDialogVisible"
            width="50%"
            :before-close="handleClose">
            <span>这是一段信息</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        //自定义手机和邮箱的校验规则
        var checkEmail = (rule, value, cb) => {
            //正则表达式验证
            const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
            if(regEmail.test(value)) {
                //邮箱合法
                return cb()
            }
            cb(new Error('请输入合法邮箱'))
        }
        var checkMobile = (rule, value, cb) => {
            const regMobile = /^(0|86|1759)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
            if(regMobile.test(value)) {
                //电话合法
                return cb()
            }
            cb(new Error('请输入合法电话'))
        }
        return {
            // 获取用户列表参数对象
            queryInfo: {
                query: '',
                pagenum: 1, //当前的页数
                pagesize: 2 //当前每页显示的数据量
            },
            userList: [],
            total:0,
            //控制添加对话框的显示和隐藏
            addDialogVisible: false,
            //添加用户数据表单
            addForm: {
                username: '',
                password: '',
            },
            //添加表单用户规则
            addFormRules: {
                username: [
                    { required: true, message:'请输入用户名', trigger: 'blur' },
                    { min:3, max: 10, message: '用户名长度3-10个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message:'请输入密码', trigger: 'blur' },
                    { min:6, max: 15, message: '密码长度6-15个字符', trigger: 'blur' }
                ],
                email: [
                    { required: true, message:'请输入邮箱', trigger: 'blur' },
                    { validator: checkEmail, trigger: 'blur' }
                ],
                mobile: [
                    { required: true, message:'请输入电话', trigger: 'blur' },
                    { validator: checkMobile, trigger: 'blur' }
                ],
            },
            //控制修改用户对话框的显示和隐藏
            editDialogVisible: false,
            //查询到的用户信息对象
            editForm: {},
            //修改表单验证规则对象
            editFormRules: {
                email: [
                        { required: true, message:'请输入邮箱', trigger: 'blur' },
                        { validator: checkEmail, trigger: 'blur' }
                    ],
                mobile: [
                        { required: true, message:'请输入电话', trigger: 'blur' },
                        { validator: checkMobile, trigger: 'blur' }
                    ],
            },
            // 控制分配角色对话框的显示与隐藏
            setDialogDialogVisible: false
        }
    },
    created() {
        this.getUserList()
    },
    methods: {
        async getUserList() {
            const {data: res} = await this.$http.get('users', { params: this.queryInfo })
            if(res.meta.status != 200) return this.$message.error('获取用户列表失败！')
            this.userList = res.data.users
            console.log(this.userList);
            this.total = res.data.total
        },
        //监听pagesize改变的事件
        handleSizeChange(newSize) {
            this.queryInfo.pagesize = newSize
            this.getUserList() //根据新页数获取页面数据
        },
        //监听页码切换事件
        handleCurrentChange(newPage) {
            this.queryInfo.pagenum = newPage
            this.getUserList()
        },
        //监听开关状态函数
        async userStateChange(userinfo) {
            console.log(userinfo)
            const {data:res} = await this.$http.put(`users/${userinfo.id}/state/${userinfo.mg_state}`)
            if(res.meta.status !== 200) {
                //调用接口失败就把状态值重置回去
                userinfo.mg_state =! userinfo.mg_state
                return this.message.error('更新用户状态失败！')
            }
            this.$message.success('更新用户状态成功！')
        },
        //监听关闭添加对话框关闭事件
        addDialogClosed() {
            this.$refs.addFormRef.resetFields()
        },
        //点击确认添加新用户
        addUser() {
            this.$refs.addFormRef.validate(
                async valid => {//valid是否校验成功的bool值
                    if(!valid) return
                    //校验成功则可以添加用户的网络请求
                    const {data: res} = await this.$http.post('users', this.addForm)
                    if(res.meta.status != 201){
                         this.message.error('添加用户失败！')
                    }
                    this.$message.success('添加用户成功！')
                    //隐藏添加用户对话框，并重新获取用户数据
                    this.addDialogVisible = false 
                    this.getUserList()
                })
        },
        //展示编辑用户对话框
        async showEditDialog(id) {
            // console.log(id)
            this.editDialogVisible = true
            const {data: res} = await this.$http.get('users/' + id)
            if(res.meta.status != 200){
                return this.message.error('查询用户失败！')
            }
            this.editForm = res.data
            this.editDialogVisible = true
        },
        //监听修改用户对话框的关闭事件
        editDialogClosed() {
            this.$refs.editFormRef.resetFields()
        },
        //修改用户信息并提交
        editUserInfo() {
            this.$refs.editFormRef.validate(
                async valid => {//valid是否校验成功的bool值
                    if(!valid) return
                    //校验成功则可以添加用户的网络请求
                    const {data: res} = await this.$http.put('users/'+this.editForm.id, {email:this.editForm.email, mobile:this.editForm.mobile})
                    if(res.meta.status != 200){
                         this.message.error('更新用户失败！')
                    }
                    //隐藏添加用户对话框，并重新获取用户数据
                    this.editDialogVisible = false 
                    this.getUserList()
                    this.$message.success('更新用户成功！')
                })
            },
        //根据id删除用户
        async removeUserById(id) {
            //弹框询问确认
             const confirmResult = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).catch(err =>err)
            //如果用户确认删除则返回字符串confirm，取消则返回字符串cancel
            if(confirmResult!=='confirm') {
                return this.$message.info('已经取消删除')
            }
            const {data: res} = await this.$http.delete('user/' + id)
            // console.log(res.meta.status)
            if(res.meta.status != 200){
                return this.$message.error('删除用户失败！')
                }
            this.$message.success('删除用户成功！')
            this.getUserList()
        },
        //显示分配角色的对话框
        setRole() {
            this.setRoleDialogVisible = true
        }
                 
    }
}
</script>

<style lang="less" scoped>

</style>