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
   
</div>
</template>

<script>
export default {
    data(){
        //所有角色列表数据
        return {
            rolelist: []
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