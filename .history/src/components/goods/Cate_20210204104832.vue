<template>
    <div>
        <!-- 面包屑导航区 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品分类</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片视图区域 -->
        <el-card>
            <!-- 获取分类按钮 -->
            <el-row>
                <el-col>
                    <el-button type = "primary">添加分类</el-button>
                </el-col>
            </el-row>

            <!-- 表格 -->

            <!-- 分页区域 -->
        </el-card>

    </div>
</template>

<script>
export default {
    data() {
        return {
            //查询条件
            querInfo: {
                type: 3,
                pagenum: 1,
                pagesize: 5
            },
            //商品分类数组列表，默认为空
            catelist: []
        }
    },

    created() {
        this.getCateList()
    },

    methods: {
        //获取商品分类数据
       async getCateList() {
            const { data: res } = await this.$http.get('categories', { params: this.categories })
            
        }
    }
}
</script>

<style lang="less" scoped>

</style>

