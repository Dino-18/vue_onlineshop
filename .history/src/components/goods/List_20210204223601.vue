<template>
    <div>
        <!-- 面包屑导航区 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品列表</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片视图区域 -->
        <el-card>
            <!-- 搜索框 -->
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-input placeholder="请输入内容">
                    <el-button type="primary"></el-button>
                </el-col>
                <el-col :span="4"></el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {}
    },
    created() {

    },
    methods() {

    }
}
</script>

<style lang="less" scoped>

</style>