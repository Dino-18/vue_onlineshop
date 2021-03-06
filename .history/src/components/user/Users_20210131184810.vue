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
                        <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
                         <!-- 删除按钮 -->
                        <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
                         <!-- 分配权限按钮 -->
                        <el-tooltip effect="dark" content="分配权限" placement="bottom" :enterable="false">
                        <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
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
        width="50%">
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
            <el-button type="primary" @click="addDialogVisible = false">确 定</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
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
                    { required: true, message:'请输入邮箱', trigger: 'blur' }
                ],
                mobile: [{ required: true, message:'请输入电话', trigger: 'blur' }
                ],
            },
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
        
    }
}
</script>

<style lang="less" scoped>

</style>