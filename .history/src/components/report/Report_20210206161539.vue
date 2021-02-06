<template>
    <div>
         <!-- 面包屑导航区 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>数据统计</el-breadcrumb-item>
            <el-breadcrumb-item>数据报表</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片视图区域 -->
        <el-card>
            <!-- 为echarts准备具备大小的Dom -->
            <div id="main" style="width: 600px;height:400px;"></div>
        </el-card>
    </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
    data() {
        return {}
    },
    created() {},
    // 执行到mounted函数证明页面上dom已经被渲染完毕,可以进行图表的初始化
    async mounted() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));
        // 准备数据和配置项
        // 指定图表的配置项和数据
        const {data:res} = await this.$http.get('reports/type/1')
        if(res.meta.status != 200) return this.$message.error('获取折线图失败！')
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(res.data);
    },
    
}
</script>

<style lang="less" scoped>

</style>