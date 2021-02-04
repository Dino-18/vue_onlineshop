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
                    <span>选择商品分类：</span>
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
                <el-tab-pane label="动态参数" name="many">
                   <el-button type="primary" size="mini" :disabled="isBtnDisabled" @click="addDialogVisible=true">添加参数</el-button>
                   <!-- 动态参数表格 -->
                    <el-table :data="manyTableData" border stripe>
                        <!-- 展开行 -->
                        <el-table-column type="expand"> 
                            <template slot-scope="scope">
                                <!-- 渲染Tag标签 -->
                                <el-tag v-for="(item, i) in scope.row.attr_vals" :key="i" closable @close = "handleClose(i, scope.row)">
                                    {{item}}
                                </el-tag>
                                <!-- 输入文本框 -->
                                <el-input
                                    class="input-new-tag"
                                    v-if="scope.row.inputVisible"
                                    v-model="scope.row.inputValue"
                                    ref="saveTagInput"
                                    size="small"
                                    @keyup.enter.native="handleInputConfirm(scope.row)"
                                    @blur="handleInputConfirm(scope.row)"
                                >
                                </el-input>
                                <!-- 添加按钮 -->
                                <el-button v-else class="showInput" size="small" @click="showInput(scope.row)">+ New Tag</el-button>
                                <!-- 渲染Tag标签 -->
                            </template>
                        </el-table-column>
                        <el-table-column type="index"> </el-table-column>
                        <!-- 索引列 -->
                        <el-table-column type="index"> </el-table-column>
                        <el-table-column label="参数名称" prop="attr_name"> </el-table-column>
                        <el-table-column label="操作"> 
                            <template slot-scope="scope">
                                <el-button size="mini" type="primary" icon="el-icon-edit" @click="showEditDialog(scope.row.attr_id)" >编辑</el-button>
                                <el-button size="mini" type="danger" icon="el-icon-delete" @click="removeParams(scope.row.attr_id)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <!-- 添加静态参数 -->
                <el-tab-pane label="静态属性" name="only">
                    <el-button type="primary" size="mini" :disabled="isBtnDisabled" @click="addDialogVisible=true">添加属性</el-button>
                    <!-- 静态属性表格 -->
                    <el-table :data="onlyTableData" border stripe>
                        <!-- 展开行 -->
                        <el-table-column type="expand"> </el-table-column>
                        <el-table-column type="index"> </el-table-column>
                        <!-- 索引列 -->
                        <el-table-column type="index"> </el-table-column>
                        <el-table-column label="属性名称" prop="attr_name"> </el-table-column>
                        <el-table-column label="操作"> 
                            <template slot-scope="scope">
                                <el-button size="mini" type="primary" icon="el-icon-edit" @click="showEditDialog(scope.row.attr_id)">编辑</el-button>
                                <el-button size="mini" type="danger" icon="el-icon-delete" @click="removeParams(scope.row.attr_id)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
        </el-card>

        <!-- 静态属性和动态参数添加对话框 -->
        <el-dialog
            :title="'添加'+ titleTex "
            :visible.sync="addDialogVisible"
            width="50%"
            @close="addDialogClosed">
            <!-- 添加参数对话框 -->
            <el-form ref="addFormRef" :model="addForm" :rules="addFormRules" label-width="100px">
                <el-form-item :label="titleTex" prop="attr_name">
                    <el-input v-model="addForm.attr_name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addParams">确 定</el-button>
            </span>
        </el-dialog>

         <!-- 静态属性和动态参数修改对话框 -->
        <el-dialog
            :title="'修改'+ titleTex "
            :visible.sync="editDialogVisible"
            width="50%"
            @close="editDialogClosed">
            <!-- 添加参数对话框 -->
            <el-form ref="editFormRef" :model="editForm" :rules="editFormRules" label-width="100px">
                <el-form-item :label="titleTex" prop="attr_name">
                    <el-input v-model="editForm.attr_name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editParams">确 定</el-button>
            </span>
        </el-dialog>
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
            activeName: 'many',
            //动态参数数据
            manyTableData: [],
            //静态属性数据
            onlyTableData: [],
            //添加对话框
            addDialogVisible: false,
            //添加参数的表单数据对象
            addForm: {},
            addFormRules: {
                attr_name: [{
                    required: true,
                    message: '请输入参数',
                    trigger: 'blur'
                }]
            },
            //控制修改对话框的显示与隐藏
            editDialogVisible: false,
            //修改表单的验证的规则数据对象
            editForm: {},
            editFormRules: {
                // attr_name: [{
                //     required: true,
                //     message: '请输入参数',
                //     trigger: 'blur'
                // }]
            },
            //控制按钮与文本框的切换与显示
            inputVisible: false,
            //文本框输入的内容
            inputValue: []
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
                //同时将下属的参数和属性全部清空
                this.manyTableData = []
                this.onlyTableData = []
                return
            }
            //当选中三级分类
            // console.log(this.selectedCateKeys)
            //根据所处面板和所取id获取参数
            const {data: res} = await this.$http.get(`categories/${this.cateId}/attributes`, {params: {sel: this.activeName}})
            if(res.meta.status != 200) return this.$message.error('获取参数列表失败！')
            // this.$message.success('获取参数列表成功！')
            // console.log(res.data) 
            //需要先判断当前获取的数据属于哪个类别的参数再做对应的渲染
            //将字符串形式的属性数据改成数组
            res.data.forEach(item =>{
                item.attr_vals = item.attr_vals? item.attr_vals.split(','):[]
                //控制文本框的显示与隐藏
                item.inputVisible = false
                item.inputValue = ''
            })
            console.log(res.data)
            if(this.activeName==="many") {
                this.manyTableData = res.data
            } else {
                this.onlyTableData = res.data
            }
        },
        //监听对话框关闭事件
        addDialogClosed() {
            this.$refs.addFormRef.resetFields()
        },
        //点击按钮，添加参数
        addParams() {
            this.$refs.addFormRef.validate(async valid=>
            {
                if(!valid) return 
                const {data:res} = await this.$http.post(`categories/${this.cateId}/attributes`, { attr_name: this.addForm.attr_name, attr_sel: this.activeName})
                if(res.meta.status != 201) return this.$message.error('添加参数失败！')
                this.$message.success('添加参数成功！')
                this.addDialogVisible = false
                this.getParamsData()  
            }) 
        },
        //点击按钮，展示修改的对话框
        async showEditDialog(attr_id) {
            const {data:res} = await this.$http.get(`categories/${this.cateId}/attributes/${attr_id}`, {params: {attr_sel: this.activeName}})
            console.log(res)
            if(res.meta.status != 200) return this.$message.error('获取参数列表失败！')
            this.editForm = res.data
            this.editDialogVisible = true
        },
        //重置修改表单
        editDialogClosed() {
            this.$refs.editFormRef.resetFields()
        },
        //点击按钮修改参数信息
        editParams() {
            this.$refs.editFormRef.validate(async valid=>
            {
                if(!valid) return 
                const {data:res} = await this.$http.put(`categories/${this.cateId}/attributes/${this.editForm.attr_id}`, { attr_name: this.editForm.attr_name, attr_sel: this.activeName})
                console.log(res)
                if(res.meta.status != 200) return this.$message.error('修改参数失败！')
                this.$message.success('修改参数成功！')
                this.getParamsData()  
                this.editDialogVisible = false
           })
        },
        //删除商品属性
        async removeParams(attr_id) {
            const confirmResult = await this.$confirm('此操作将永久删除该参数, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).catch(err=>err)
            if(confirmResult!=='confirm') {
                return this.$message('已取消删除')
            }
            //删除
            const {data: res} = await this.$http.delete(`categories/${this.cateId}/attributes/${attr_id}`)
            if(res.meta.status != 200) return this.$message.error('删除参数失败！')
            this.$message.success('删除参数成功！')
            this.getParamsData()  
        },
        //文本框失去焦点或者按下enter键都会触发
        async handleInputConfirm(row) {
            console.log('OK')
            if(row.inputValue.trim().length===0) {
                row.inputValue = ''
                row.inputVisible = false //当失去焦点时隐藏输入框，判断输入内容的合法性
                return
            }
            //如果没有return，则输入了内容，可以添加参数
            // row.inputValue push到数组中
            row.attr_vals.push(row.inputValue.trim())
            row.inputValue = ''
            row.inputVisible = false
            // 存储到数据库中，在这之前要重新将数组拼接成字符串
            // const {data:res} = await this.$http.put(`categories/${this.cateId}/attributes/${row.attr_id}`, { attr_name: row.attr_name, attr_sel: row.attr_sel, attr_vals: row.attr_vals.join(',')})
            // if(res.meta.status != 200) return this.$message.error('修改参数失败！')
            // this.$message.success('修改参数成功！')  
            this.saveAttrValues(row)
        },

        async saveAttrValues(row) {
            const {data:res} = await this.$http.put(`categories/${this.cateId}/attributes/${row.attr_id}`, { attr_name: row.attr_name, attr_sel: row.attr_sel, attr_vals: row.attr_vals.join(',')})
            if(res.meta.status != 200) return this.$message.error('修改参数失败！')
            this.$message.success('修改参数成功！')    
        },
        //点击按钮，展示文本输入框
        showInput(row) {
            row.inputVisible = true
            //文本框自动获得焦点
            //$nextTick，当页面上的元素被重新渲染之后，才会指定回调函数中的代码
            this.$nextTick(_ => {
            this.$refs.saveTagInput.$refs.input.focus();
            });
        },
        //删除参数标签
        handleClose(i, row) {
            row.attr_vals.splice(i, 1)
            this.saveAttrValues(row)
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
        },
        //动态计算标题的文本
        titleTex() {
            if(this.activeName==='many') {
                return '动态参数'
            } else {
                return '静态属性'
            }
        }
    }
}
</script>

<style lang="less" scoped>
    .cat_opt {
        margin: 15px 0
    }

    .el-tag {
        margin: 10px;
    }
    .input-new-tag {
        width: 120px;
    }
</style>