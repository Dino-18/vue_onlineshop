<template>
  <!-- 头部区域 -->
  <el-container class="home-container">
    <el-header>
      <div>
        <img src="../assets/logo2.jpg" alt="">
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏区域 -->
      <el-aside width="200px">Aside</el-aside>
      <!-- 右侧内容主体区域 -->
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  position: relative;
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left:0;
  padding-top:0;
  align-items: center;
    div {
      margin-top:0;
      padding-top: 0;
    }
    img {
      position: absolute;
      float: left;
      width: 8%;
      height: 100%;
      background-color: #eee;
    }
}
.el-aside {
  background-color: #333744;
}
.el-main {
  background-color: #EAEDF1;
}
</style>
