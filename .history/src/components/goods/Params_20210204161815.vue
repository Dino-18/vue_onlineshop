<template>
    <div>
        <!-- 面包屑导航区 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>参数列表</el-breadcrumb-item>
        </el-breadcrumb>
        
        <!-- 卡片视图区 -->
        <el-card>
            <!-- 提示框 -->
            <el-alert show-icon
                title="注意：只允许为第三级分类设置相关参数！"
                type="warning" :closable="false">
            </el-alert>
            <!-- 选择商品分类区域 -->
            <el-row class = "cat_opt">
                <el-column>
                    <span>选择商品分类</span>
                    <!-- 级联选择框选择商品分类 -->
                </el-column>
            </el-row>
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
    .cat_opt {
        margin: 15px 0
    }
</style>