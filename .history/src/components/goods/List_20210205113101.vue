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
                    <el-button slot="append"
                    icon="el-icon-search">
                    </el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary">添加商品</el-button>
                </el-col>
            </el-row>
            <!-- table表格区 -->
            <el-table :data="goodslist" border stripe>
                <el-table-column type="index"></el-table-column>
                <el-table-column label="商品名称" prop="goods_name"></el-table-column>
                <el-table-column label="商品价格（元）" prop="goods_price" width="95px"></el-table-column>
                <el-table-column label="商品重量" prop="goods_weight" width="70px"></el-table-column>
                <el-table-column label="创建时间" prop="add_time" width="140px">
                    <!-- 自定义渲染时间 -->
                    <template slot-scope = "scope">
                        {{scope.row.add_time | dateFormat}}
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="130px">
                    <template slot-scope="scope">
                        {{scope.row}}
                        <el-button size="mini" type="primary" icon = "el-icon-edit">
                            编辑
                        </el-button>
                        <el-button size="mini" type="danger" icon = "el-icon-delete">
                            删除
                        </el-button>
                    </template>

                </el-table-column>
            
            </el-table>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            //查询参数对象
            queryInfo: {
                query: '',
                pagenum: 1,
                pagesize: 10
            },
            // 商品列表
            goodslist: [],
            //总数据条数
            total: 0
        }
    },
    created() {
        this.getGoodsList()
    },
    methods: {
        //根据分页获取所有的商品列表
        async getGoodsList() {
            const {data: res} = await this.$http.get(`goods`, { params: this.queryInfo})
        if(res.meta.status !== 200) {
            return this.message.error('获取商品列表失败！')
        }
            this.$message.success('获取商品列表成功！')
            console.log(res.data)
            //获取数据
            this.goodslist = res.data.goods
            this.total = res.data.total
        }
    }
};
</script>

<style lang="less" scoped>

</style>