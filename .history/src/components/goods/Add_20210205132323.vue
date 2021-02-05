<template>
    <div>
       <!-- 面包屑导航区 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>添加商品</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片视图 -->
        <el-card>
            <!-- 提示区域 -->
            <el-alert
                title="添加商品信息"
                type="warning"
                center
                show-icon
                :closable="false">
            </el-alert>
            <!-- 进度步骤条 -->
            <el-steps :space="200" :active="activeIndex" finish-status="success" align-center>
                <el-step title="基本信息"></el-step>
                <el-step title="商品参数"></el-step>
                <el-step title="商品属性"></el-step>
                <el-step title="商品图片"></el-step>
                <el-step title="商品内容"></el-step>
                <el-step title="完成"></el-step>
            </el-steps>

            <!-- Tab栏区域 -->
            <el-tabs :tab-position="'left'" style="height: 200px;">
                <el-tab-pane label="用户管理">用户管理</el-tab-pane>
                <el-tab-pane label="配置管理">配置管理</el-tab-pane>
                <el-tab-pane label="角色管理">角色管理</el-tab-pane>
                <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeIndex: 0,
        }
    },
    created() {

    },
    methods: {

    }
}
</script>

<style lang="less" scoped>

</style>