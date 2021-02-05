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
            <el-steps :space="200" :active="activeIndex-0" finish-status="success" align-center>
                <el-step title="基本信息"></el-step>
                <el-step title="商品参数"></el-step>
                <el-step title="商品属性"></el-step>
                <el-step title="商品图片"></el-step>
                <el-step title="商品内容"></el-step>
                <el-step title="完成"></el-step>
            </el-steps>

            <!-- Tab栏区域,用表单包裹 -->
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px" label-position="top">
                <el-tabs v-model="activeIndex" :tab-position="'left'">
                    <el-tab-pane label="基本信息" name="0">
                        <el-form-item label="商品名称" prop="goods_name">
                            <el-input v-model="addForm.goods_name"></el-input>
                        </el-form-item>
                         <el-form-item label="商品价格" prop="goods_price" type="number" label-position:'left'>
                            <el-input v-model="addForm.goods_price"></el-input>
                        </el-form-item>
                         <el-form-item label="商品重量" prop="goods_weight" type="number">
                            <el-input v-model="addForm.goods_weight"></el-input>
                        </el-form-item>
                         <el-form-item label="商品数量" prop="goods_number" type="number">
                            <el-input v-model="addForm.goods_number"></el-input>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="商品参数" name="1"></el-tab-pane>
                    <el-tab-pane label="商品属性" name="2"></el-tab-pane>
                    <el-tab-pane label="商品图片" name="3"></el-tab-pane>
                    <el-tab-pane label="商品内容" name="4"></el-tab-pane>
                </el-tabs>
            </el-form>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            //进度条和标签栏被激活的index
            activeIndex: '0',
            //添加商品的表单数据对象
            addForm: {
                goods_name:'',
                goods_price: 0,
                goods_weight: 0,
                goods_number: 0,
            },
            addFormRules: {
                //商品名称
                goods_name: [{
                    required: true, message: '请输入商品名称', trigger:'blur'
                }],
                //商品价格
                goods_price: [{
                     required: true, message: '请输入商品价格', trigger:'blur'
                }],
                //商品重量
                goods_weight: [{
                     required: true, message: '请输入商品重量', trigger:'blur'
                }],
                //商品数量
                goods_number: [{
                     required: true, message: '请输入商品数量', trigger:'blur'
                }],
            },
            addFormRef: {
             
            }
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