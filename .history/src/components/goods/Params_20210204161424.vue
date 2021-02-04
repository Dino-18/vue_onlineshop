<template>
    <div>
        <!-- 面包屑导航区 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>参数列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 提示框 -->
         <el-alert :closable="false"
            title="注意：只允许为第三级分类设置相关参数！"
            type="warning">
        </el-alert>
        <!-- 卡片视图区 -->
        <el-card>
            123
        </el-card>
    </div>



</template>

<script>
export default {
    data() {
        return {}
    },

    created() {},

    methods: {}
}
</script>

<style lang="less" scoped>

</style>