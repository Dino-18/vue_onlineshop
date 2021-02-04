<template>
<div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
        <el-table :data="rightsList">
            <el-table-column type="index">

            </el-table-column>
            <el-table-column lable="权限名称" prop="authName">

            </el-table-column>
        </el-table>

    </el-card>
</div>
</template>

<script>
export default {
    data() {
        return{
            //所有的权限列表
            rightList: []
        }
    },

    //在生命周期函数中发起请求
    created() {
        this.getRightsList()//通过该函数获取所有的权限
    },
    methods: {
        //获取权限
        async getRightsList() {
            const {data:res} = await this.$http.get('rights/list')
            if(res.meta.status !== 200) {
                return this.$message.error('获取用户权限失败！')
            }
            this.rightsList = res.data
            console.log(this.rightList)
        }
    }
}
</script>

<style lang="less" scoped>

</style>