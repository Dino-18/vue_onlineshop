<template>
<div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
        <!-- 添加角色按钮 -->
        <el-row>
            <el-col>
                <el-button type="primary">添加角色</el-button>
            </el-col>
        </el-row>

        <!-- 角色列表区域 -->
        <el-table :data="rolelist" border stripe>
            <!-- 展开列 -->
            <el-table-column type="expand"></el-table-column>
            <!-- 索引列 -->
            <el-table-column type="index"></el-table-column>
            <el-table-column label="角色名称" prop="roleName">
            </el-table-column>
            <el-table-column label="角色描述" prop="roleDesc">
            </el-table-column>
            <el-table-column label="操作" width="300px">
                <template slot-scope="scope">
                    <!-- 编辑按钮 -->
                    <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)"></el-button>
                    <!-- 删除按钮 -->
                    <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUserById(scope.row.id)"></el-button>
                    <el-button size="mini" type="warning" icon="el-icon-setting">分配权限</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
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
</div>
</template>

<script>
export default {
    data(){
        return {
            //所有角色列表数据
            rolelist: [],
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
            }
        }
    },
    created() {
        this.getRoleList()
    },
    methods: {
    //获取所有角色的列表
    async getRoleList() {
        const {data: res} = await this.$http.get('roles') 
        if(res.meta.status !== 200) {
                return this.$message.error('获取用户角色列表失败！')
            }
        this.rolelist = res.data
        console.log(this.rolelist)
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

    }
}
</script>

<style lang="less" scoped>

</style>