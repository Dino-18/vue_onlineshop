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
            <el-input placeholder="请输入内容" v-model="input3">
            <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
        </el-card>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="less" scoped>

</style>