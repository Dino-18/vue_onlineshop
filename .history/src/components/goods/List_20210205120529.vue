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
                    <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear = "getGoodsList">
                    <el-button slot="append"
                    icon="el-icon-search"
                    @click="getGoodsList">
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
                    <template slot-scope = "scope">
                        <el-button size="mini" type="primary" icon = "el-icon-edit"></el-button>
                        <el-button size="mini" type="danger" icon = "el-icon-delete" @click="removeById(scope.row.goods_id)"> </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页显示区域 -->
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryInfo.pagenum"
            :page-sizes="[10, 50, 80, 100]"
            :page-size="queryInfo.pagesize"
            layout="sizes, prev, pager, next, jumper"
            :total="total" background>
            </el-pagination>
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
        },
        //改变一页内显示的条数
        handleSizeChange(newSize) {
            this.queryInfo.pagesize = newSize
            this.getGoodsList()
        },
        //改变页码数
        handleCurrentChange(newPage) {
            this.queryInfo.pagenum = newPage
            this.getGoodsList()
        },
        // 删除商品
        async removeById(id) {
            //弹框询问确认
             const confirmResult = await this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).catch(err =>err)
            //如果用户确认删除则返回字符串confirm，取消则返回字符串cancel
            if(confirmResult!=='confirm') {
                return this.$message.info('已经取消删除')
            }
            const {data: res} = await this.$http.delete('goods/${id}')
            // console.log(res.meta.status)
            if(res.meta.status != 200){
                return this.$message.error('删除商品失败！')
                }
            this.$message.success('删除商品成功！')
            this.getGoodsList()
        },

    }
};
</script>

<style lang="less" scoped>

</style>