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
                <el-tabs v-model="activeIndex" :tab-position="'left'" :before-leave="beforeTabLeave" @tab-click="tabClicked">
                    <el-tab-pane label="基本信息" name="0">
                        <el-form-item label="商品名称" prop="goods_name">
                            <el-input v-model="addForm.goods_name"></el-input>
                        </el-form-item>
                         <el-form-item label="商品价格" prop="goods_price">
                            <el-input v-model="addForm.goods_price" type="number"></el-input>
                        </el-form-item>
                         <el-form-item label="商品重量" prop="goods_weight">
                            <el-input v-model="addForm.goods_weight" type="number"></el-input>
                        </el-form-item>
                         <el-form-item label="商品数量" prop="goods_number">
                            <el-input v-model="addForm.goods_number" type="number"></el-input>
                        </el-form-item>
                        <!-- 级联选择框选择商品分类 -->
                        <el-form-item label="商品分类" prop="goods_cat">
                            <el-cascader   
                                v-model="addForm.goods_cat"
                                :options="catelist"
                                :props="cateProps"
                                @change="handleChange"
                                clearable
                                change-on-select>
                            </el-cascader>
                        </el-form-item>
                    </el-tab-pane>
                    <!-- 渲染表单的item项 -->
                    <el-tab-pane label="商品参数" name="1">
                        <el-form-item :label="item.attr_name" v-for="item in manyTableData" :key="item.attr_id">
                            <!-- 复选框组 -->
                            <el-checkbox-group v-model="item.attr_vals">
                                <el-checkbox border :label="cb" v-for="(cb, i) in item.attr_vals" :key="i"></el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="商品属性" name="2">
                        <el-form-item :label="item.attr_name" v-for="item in onlyTableData" :key="item.attr_id">
                           <el-input v-model="item.attr_vals">
                           </el-input>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="商品图片" name="3">
                        <!-- action表示图片上传的url地址 -->
                        <!-- on-preview指定预览事件 -->
                        <!-- list-type指定图片预览呈现的方式 -->
                        <el-upload
                            :action="uploadURL"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            list-type="picture"
                            :headers = "headerObj"
                            :on-seccess = "handleSuccess">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                    </el-tab-pane>
                    <el-tab-pane label="商品内容" name="4">

                    </el-tab-pane>
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
                //商品所属分类数组
                goods_cat: []
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
                //商品分类
                goods_cat: [{
                     required: true, message: '请选择商品分类', trigger:'blur'
                }],
            },
            addFormRef: {},
            //商品分类列表
            catelist: [],
             //指定级联选择器的配置对象
            cateProps:{
                value: 'cat_id',
                label: 'cat_name',
                children: 'children',
                expandTrigger: 'hover', 
            },
            //动态参数列表数据
            manyTableData: [],
            //静态属性列表数据
            onlyTableData: [],
            //上传图片的URL地址
            uploadURL: `http://vueshop.pixiv.download/api/private/v1/upload`,
            //图片上传组件的headers请求头对象
            headerObj: {
                Authorization: window.sessionStorage.getItem('token')
            }
        }
    },
    created() {
        this.getCateList()
    },
    methods: {
        //获取商品分类数据
        async getCateList() {
            const { data: res } = await this.$http.get('categories', { params: this.querInfo })
            if(res.meta.status != 200) return this.$message.error('获取商品分类列表失败！')
            //数据列表赋值给catelist
            // console.log(res.data)
            this.catelist = res.data
        },
        // 级联选择器变化触发
        handleChange() {
            // console.log(this.addForm.goods_cat)
            if(this.addForm.goods_cat.length!==3) {
                this.addForm.goods_cat = []
            }
        },

        beforeTabLeave(activeName, oldActiveName) {
            // console.log(activeName, oldActiveName)
            if(oldActiveName==='0' && this.addForm.goods_cat.length!==3) {
                this.$message.error('请先选择商品分类')
                return false
            }  
        },
        async tabClicked() {
            //当访问动态参数列表时
            if(this.activeIndex === '1') {
                const {data: res} = await this.$http.get(`categories/${this.addForm.goods_cat.length === 3? this.addForm.goods_cat[2]: null}/attributes`, {params: {sel: 'many'}})
                // console.log(res.data)
                if(res.meta.status != 200) return this.$message.error('获取参数列表数据失败！')
                
                res.data.forEach(item => {
                    item.attr_vals = item.attr_vals.length === 0?[]:item.attr_vals.split(',')
                })
                this.manyTableData = res.data
                // console.log(this.manyTableData)
            } //当访问静态属性时
            else if(this.activeIndex === '2') {
                const {data: res} = await this.$http.get(`categories/${this.addForm.goods_cat.length === 3? this.addForm.goods_cat[2]: null}/attributes`, {params: {sel: 'only'}})
                // console.log(res.data)
                if(res.meta.status != 200) return this.$message.error('获取参数列表数据失败！')
                
                res.data.forEach(item => {
                    item.attr_vals = item.attr_vals.length === 0?[]:item.attr_vals.split(',')
                })
                this.onlyTableData = res.data
                // console.log(this.onlyTableData)
            }
        },
        //图片预览事件
        handlePreview() {

        },
        // 处理移除图片操作
        handleRemove() {

        },
        //监听图片上传成功事件
        handleSuccess(response) {
            console.log(response)
        }

    },
}
</script>

<style lang="less" scoped>
.el-checkbox {
    margin: 0 10px 10px 0!important;
    float: left;
}

</style>