<template>
<div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>订单管理</el-breadcrumb-item>
        <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
        <el-row>
            <el-col :span="8">
                <el-input placeholder="请输入内容" clearable>
                    <el-button slot="append"
                    icon="el-icon-search">
                    </el-button>
                </el-input>
            </el-col>
        </el-row>
    </el-card>
</div>
</template>

<script>
export default {
    data() {
        return {
            queryInfo: {
                query: '',
                pagenum: 1,
                pagesize: 10
            }
        }
    },
    created() {
        this.getOrderList()
    },
    methods: {
        async getOrderList() {
            const {data: res} = await this.$http.get('orders', { params:this.queryInfo })
            if(res.meta.status != 200) return this.$message.error('获取订单列表失败！')
            // console.log(res)
            this.total = res.data.total
            this.orderlist = res.data.goods
        }
    }
}
</script>

<style lang="less" scoped>

</style>

