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
            <el-table-column type="expand">
                <template slot-scope="scope">
                    <el-row :class="['bdbottom', i1===0?'.bdtop':'', 'vcenter']" v-for="(item1, i1) in scope.row.children" :key="item1.id">
                        <!-- 第一列是一级权限 -->
                        <el-col :span="5">
                           <el-tag @close="removeRightById(scope.row, item1.id)">
                                {{item1.authName}}
                           </el-tag>
                           <i class="el-icon-caret-right"></i>
                        </el-col>
                        <!-- 第二列渲染二级和三级权限 -->
                        <el-col :span="19">
                            <!-- 通过for循环嵌套渲染二级权限 -->
                            <el-row :class="[i2===0?'':'bdtop', 'vcenter']" v-for="(item2, i2) in item1.children" :key="item2.id">
                                <!-- 二级权限 -->
                                <el-col :span="6">
                                    <el-tag type="success" @close="removeRightById(scope.row, item2.id)">{{item2.authName}}</el-tag>
                                    <i class="el-icon-caret-right"></i>
                                </el-col>
                                <!-- 三级权限 -->
                                <el-col :span="18">
                                    <el-tag type = "warning" v-for="(item3,i3) in item2.children" :key="item3.id" closable @close="removeRightById(scope.row, item3.id)">{{item3.authName}}</el-tag> <!--eslint-disable-line no-unused-vars-->
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                </template>
            </el-table-column>
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
                    <!-- 分配权限按钮-->
                    <el-button size="mini" type="warning" icon="el-icon-setting">分配权限</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
   <!-- 编辑用户对话框 -->
    <el-dialog
        title="修改用户"
        :visible.sync="editDialogVisible"
        width="50%" @close="editDialogClosed">
        <!-- 内容主体区 -->
        <el-form :model="editForm" label-width="70px" ref="editFormRef">
            <el-form-item label="用户角色">
                <el-input v-model="editForm.roleName"></el-input>
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
        // console.log(this.rolelist)
        },
    //展示编辑用户对话框
    async showEditDialog(id) {
        // console.log(id)
        this.editDialogVisible = true
        const {data: res} = await this.$http.get('roles/' + id)
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
    async editUserInfo() {
        this.$refs.editFormRef.validate(
        async valid => {//valid是否校验成功的bool值
        // console.log(valid)
            if(!valid) return
            //校验成功则可以添加用户的网络请求
            console.log(this.editForm.roleId)
            const {data: res} = await this.$http.put('roles/'+this.editForm.roleId, {roleName:this.editForm.roleName}) 
            // console.log(res)
            if(res.meta.status !== 200) {
                    return this.$message.error('更新用户角色列表失败！')
                }
            //隐藏添加用户对话框，并重新获取用户数据
            this.editDialogVisible = false 
            this.getRoleList()
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
        const {data: res} = await this.$http.delete('roles/' + id)
        // console.log(res.meta.status)
        if(res.meta.status != 200){
            return this.$message.error('删除用户失败！')
            }
        this.$message.success('删除用户成功！')
        this.getRoleList()
        },
    //根据id删除对应权限
    async removeRightById(role, rightId) {
        //弹框提示是否删除
        const comfirmResult = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err => err)
        if(comfirmResult !== 'confirm') {
            return this.$message.info('取消了删除！');
        }
        const {data: res} = await this.$http.delete('roles/${role.id}/rights/${rightId}');
        if(res.meta.status != 200){
            return this.$message.error('删除用户权限失败！');
            }
        // this.getRoleList();//这里会重新渲染整个权限表格，从而导致刚才的页面关闭
        role.children = res.data;
        }
    }
}
</script>

<style lang="less" scoped>
.el-tag {
    margin:7px;
}
//给一级权限加边框线
.bdbottom {
    border-bottom: 1px solid #eee;
}
.bdtop {
    border-top: 1px solid #eee;
}

.vcenter {
    display: flex;
    align-items: center;
}
</style>