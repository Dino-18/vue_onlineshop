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
      <el-aside width="200px">
        <!-- 滚动条实现菜单折叠与展开 -->
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- 侧边栏菜单区域 -->
        <el-menu background-color="333744" text-color="#fff" active-text-color="#ffd04b" :unique-opened="true" :collapse="isCollapse">
          <!-- 一级菜单 -->
          <el-submenu :index="item.id +''" v-for="item in menulist" :key="item.id">
            <!-- 一级菜单的模板 -->
            <template slot="title">
              <!-- 图标 -->
              <i class="iconsObj[item.id]"></i>
              <!-- 文本 -->
              <span>{{item.authName}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item :index="subItem.id+''" v-for="subItem in item.children" :key="subItem.id">
              <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-menu"></i>
              <!-- 文本 -->
              <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主体区域 -->
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menulist:[],
      iconsObj: {
        '125': 'iconfont icon-user',
        '103': 'iconfont icon-tijikongjian',
        '101': 'iconfont icon-shangpin',
        '102': 'iconfont icon-danju',
        '145': 'iconfont icon-baobiao'
      },
      //菜单栏是否折叠
      isCollapse: false
    }
  },
  created() {
    // 生命周期
    this.getMenulist()
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // 获取所有菜单
    async getMenulist() {
      const {data: res} = await this.$http.get('/menus');
      // get返回的是promise，可以用awaite和async简化
      if(res.meta.status!==200) return this.$message.error()// 返回失败
      this.menulist = res.data// 获取左侧菜单数据
      console.log(res)
    },
    //实现点击按钮菜单栏折叠功能
    toggleCollapse() {
      this.isCollapse = ! this.isCollapse
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left:0;
  align-items: center;
  color:#fff;
  font-size:20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 20px;
    }
  }
  img {
    display: block;
    height: 80px;
    width: 80px;
    opacity:0.4;
  }
}
.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: 0;//默认有一个右边框，在这里自定义覆盖掉
  }
}
.el-main {
  background-color: #EAEDF1;
}
.iconfont {
  margin-right: 10px;
}

.toggle-button {
  background-color: #4A5064;
  font-size: 10px;
  line-height: 24px;
  color:#fff;
  text-align: center;
  letter-spacing: 0.2px;
  cursor: pointer;
}
</style>
