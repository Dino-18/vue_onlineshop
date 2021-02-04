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
                    <el-cascader   
                    v-model="selectedCateKeys"
                    :options="CateList"
                    :props="cateProps"
                    @change="handleChange"
                    clearable
                    change-on-select>
                </el-cascader>
                </el-col>
            </el-row>

            <!-- 页签区 -->
            <el-tabs v-model="activeName" @tab-click="handleTabClick">
                <!-- 添加动态参数 -->
                <el-tab-pane label="动态属性" name="many">
                   <el-button type="primary" size="mini" :disabled="isBtnDisabled">动态属性</el-button>
                </el-tab-pane>
                <!-- 添加静态参数 -->
                <el-tab-pane label="静态参数" name="only">
                    <el-button type="primary" size="mini" :disabled="isBtnDisabled">静态参数</el-button>
                </el-tab-pane>
            </el-tabs>
        </el-card>
    </div>



</template>

<script>
export default {
    data() {
        return {
            // 商品分类列表
            CateList: [],
            //级联选择框的配置对象
            cateProps: {
                value: 'cat_id',
                label: 'cat_name',
                children: 'children',
                expandTrigger: 'hover'
            },
            //级联选择框双向绑定的数组
            selectedCateKeys: [],
            //默认选择激活的页签名称
            activeName: 'many'
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
        },
        //级联选择框变化的时候会触发，获取数组里的数据
        handleChange() {
            this.getParamsData()
        },
        
        //tab页签点击事件处理函数
        handleTabClick() {
            console.log(this.activeName)
            this.getParamsData()
        },
        // 无论是选定了三级商品还是切换了当前需要获取的页签，都需要发起数据请求
        async getParamsData() {
            //判断当前选中的是否为三级分类
            if(this.selectedCateKeys.length!=3) {
                this.selectedCateKeys = []
                return
            }
            //当选中三级分类
            // console.log(this.selectedCateKeys)
            //根据所处面板和所取id获取参数
            const {data: res} = await this.$http.get(`categories/${this.cateId}/attributes`, {params: {sel: this.activeName}})
            if(res.meta.status != 200) return this.$message.error('获取参数列表失败！')
            console.log(res.data) 
        }
    },

    computed: {
        //如果按钮需要被禁用，返回true，否则返回false
        isBtnDisabled() {
            if(this.selectedCateKeys.length!=3) {
                return true
            }
            return false
        },
        //当前选中的三级分类的id
        cateId() {
            if(this.selectedCateKeys.length===3) {
                return this.selectedCateKeys[2]
            }
            return null
        }
    }
}
</script>

<style lang="less" scoped>
    .cat_opt {
        margin: 15px 0
    }
</style>