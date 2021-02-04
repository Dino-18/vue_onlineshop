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
                <el-col>
                    <span>选择商品分类</span>
                    <!-- 级联选择框选择商品分类 -->
                </el-col>
            </el-row>
        </el-card>
    </div>



</template>

<script>
export default {
    data() {
        return {
            // 商品分类列表
            CateList: []
        }
    },

    created() {
        //获取所有的商品分类列表
        this.getCateList()
    },

    methods: {
        async getCateList() {
            const {data: res} = await this.$http.get('categories')
        if(res.meta.status != 200) return this.$message.error('获取商品分类数据失败！')
        this.CateList = res.data

        console.log(this.CateList)
        }

    }
}
</script>

<style lang="less" scoped>
    .cat_opt {
        margin: 15px 0
    }
</style>