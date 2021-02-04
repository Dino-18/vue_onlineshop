<template>
  <!-- 头部区域 -->
  <el-container>
    <el-header>Header<el-button type="info" @click="logout">退出</el-button></el-header>
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
.el-header {
  background-color: #373D41;
}
</style>
