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
                    <el-input placeholder="请输入内容" v-model="input3">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <!-- 添加按钮 -->
                    <el-button type="primary">添加用户</el-button>
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
                         <el-switch v-model="scope.row.mg_state">
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
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 获取用户列表参数对象
            queryInfo: {
                query: '',
                pagenum: 1,
                pagesize: 2
            },
            userList: [],
            total:0
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
        }
    }
}
</script>

<style lang="less" scoped>

</style>