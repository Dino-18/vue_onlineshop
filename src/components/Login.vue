<template>
<div class="login_container">
    <!-- login盒子 -->
    <div class="login_box">
        <!-- 1. 头像区域 -->
        <div class="avatar_box">
            <img src="../assets/logo.jpg" alt="">
        </div>
        <!-- 2. 登录表单区域，从element中间寻找样式即可 -->
        <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
            <!-- 用户名 -->
            <el-form-item prop="username">
                <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user"></el-input>
            </el-form-item>
             <!-- 密码 -->
            <el-form-item prop="password">
                <el-input v-model="loginForm.password" prefix-icon="iconfont icon-3702mima" type="password"></el-input>
            </el-form-item>
            <!-- 按钮区域 -->
            <el-form-item class="btns"> 
                <!-- 让按钮靠近右边 -->
                <el-button type="primary" @click="login">登录</el-button>
                <el-button type="info" @click="resetLoginForm">重置</el-button>
            </el-form-item>
        </el-form>
           

    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            //为登录表单数据绑定对象
            loginForm: {
                password:'123456',
                username:'admin'
            },
            //表单验证规则对象
            loginFormRules: {
                //用户名合法性
                username:[
                    { required: true, message: '请输入登录名', trigger: 'blur' },//失去焦点时就验证
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                //密码合法性
                password:[
                    { required: true, message: '请输入登录密码', trigger: 'blur' },//失去焦点时就验证
                    { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        //点击重置按钮，重置表单
        resetLoginForm() {
            this.$refs.loginFormRef.resetFields();
        },
        login() {
            this.$refs.loginFormRef.validate(async valid => {
                if(!valid) return;
                const {data: res} = await this.$http.post('login', this.loginForm)
                console.log('res');
                if(res.meta.status != 200) return this.$message.error('登陆失败');
                this.$message.success('登陆成功');
                console.log(res);
                window.sessionStorage.setItem('token', res.data.token);//将data里的token保存在sessionStorage中
                //通过编程式导航push方法跳转到后台主页，地址时是/home
                this.$router.push('/home')
            });
        }
    }
};
</script>

<style lang="less" scoped>//加scope指令防止样式冲突
.login_container{
    background-color: #2b4b6b;
    height: 100%;
}
.login_box {
    position: absolute; //让盒子居中显示
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    left: 50%;
    top:50%;
    transform: translate(-50%, -50%);
    .avatar_box{
        position: absolute;
        left:50%;
        right: 50%;
        height: 130px;
        width: 130px;
        transform: translate(-50%,-50%);
        background-color: #fff;
        border: 1px solid #eee;
        border-radius: 50%;
        padding: 10px;
        box-shadow: 0 0 10px #ddd; //外边框加阴影
        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #eee;
        }
    }
}
// 按钮
.btns {
    display:flex;//居右对齐
    justify-content: flex-end;
}
// 表单向下，设置浮动底部对齐
.login_form {
    position: absolute;
    width: 100%;
    bottom: 0;
    padding: 0 20px; //表单默认为是常规盒子，加padding会超出父盒子，可以设置其为怪异盒子模型
    box-sizing: border-box;
}
</style>