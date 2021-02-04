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
                    <el-button type = "primary" @click="showAddCateDialog">添加分类</el-button>
                </el-col>
            </el-row>

            <!-- 表格 -->
            <tree-table :data="catelist" :columns="columns" :selection-type='false' :expand-type='false' show-index index-text='#' border class="treeTable"> 
                <!-- 第二列是否有效 -->
                <template slot="isok" slot-scope="scope">
                    <!-- 引入两个图标，按照scope的值按需渲染 -->
                    <i class="el-icon-success" v-if="scope.row.cat_deleted === false" style="color:lightgreen"></i> 
                    <i class="el-icon-error" v-else style="color:red"></i>
                </template>
                <!-- 第三列排序 -->
                <template slot="order" slot-scope="scope">
                    <el-tag size="mini" v-if="scope.row.cat_level === 0">一级</el-tag>
                    <el-tag size="mini" type="success" v-else-if="scope.row.cat_level === 1">二级</el-tag>
                    <el-tag size="mini" type="warning" v-else>三级</el-tag>
                </template>
                <!-- 第四列操作 -->
                <template slot="opt">
                    <el-button size="mini" type="primary" icon = "el-icon-edit">编辑</el-button>
                    <el-button size="mini" type="danger" icon = "el-icon-delete">删除</el-button>
                </template>
            </tree-table>

            <!-- 分页区域 -->
            <!-- 分页显示区域 -->
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="querInfo.pagenum"
            :page-sizes="[3, 5, 10, 20]"
            :page-size="querInfo.pagesize"
            layout="sizes, prev, pager, next, jumper"
            :total="total">
            </el-pagination>
        </el-card>

        <!-- 添加分类的对话框 -->
         <el-dialog
        title="添加分类"
        :visible.sync="addCateDialogVisible"
        width="50%">
        <!-- 用户添加框分类表单主区域 -->
        <el-form :model="addCateForm" :rules="addCateFormRules" ref="addCateFormRef" label-width="100px">
            <el-form-item label="分类名称：" prop="cat_name">
                <el-input v-model="addCateForm.cat_name"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="addForm.password"></el-input>
            </el-form-item>
        </el-form>
        <!-- 底部区域 -->
        <span slot="footer" class="dialog-footer">
            <el-button @click="addCateDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addCateDialogVisible = false">确 定</el-button>
        </span>
        </el-dialog>
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
            catelist: [],
            //总数据条数
            total: 0,
            //为树形表格指定列的定义
            columns: [{
                label: '分类名称',
                prop: 'cat_name'
            },{
                label: '是否有效',
                type:'template', //将当前列定义为模板列，使用template属性自定义
                template: 'isok', //当前这一列使用的模板名称
            },{
                label: '排序',
                type:'template', //将当前列定义为模板列，使用template属性自定义
                template: 'order', //当前这一列使用的模板名称
            }, {
                label: '操作',
                type:'template', //将当前列定义为模板列，使用template属性自定义
                template: 'opt', //当前这一列使用的模板名称
            }],

            //添加分类弹出框
            addCateDialogVisible: false,
            //添加分类表单数据对象
            addCateForm: {
                //将要添加的分类的名称
                cat_name: '',
                //父级分类id
                cat_pid: 0,
                //当前默认分类等级为一级分类
                cat_level: 0
            },
            //添加分类表单的验证规则
            addCateFormRules: {
                cat_name :[
                    { required: true, message: '请输入分类名称', trigger:'blur'},
                ]
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
            // console.log(res)
            this.catelist = res.data.result
            //为总数据条数赋值
            this.total = res.data.total
        },
        //监听pagesize改变的事件
        handleSizeChange(newSize) {
            this.querInfo.pagesize = newSize
            this.getCateList() //重新刷新页面
        },
        // 监听pagenum的改变
        handleCurrentChange(newPage) {
            this.querInfo.pagenum = newPage
            this.getCateList() //立即刷新列表
        },
        //添加分类弹出框
        showAddCateDialog() {
            this.addCateDialogVisible = true
        }
    }
}
</script>

<style lang="less" scoped>
    .treeTable{
        margin-top: 15px;
    }
</style>

