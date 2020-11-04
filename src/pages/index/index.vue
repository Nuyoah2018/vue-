<template>
  <div>
    <el-container class="wrapper">
      <el-aside width="200px">
        <!-- 导航 
        default-active 默认激活
        background-color 背景色
        text-color 文本颜色
        active-text-color 激活的文本颜色
        unique-opened 是否只保持一个子菜单的展开
        router 是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转
        -->
        <el-menu
        
          default-active="0"
          class="el-menu-vertical-demo"
          background-color="#20222a"
          text-color="#fff"
          active-text-color="#ffd04b"
          :unique-opened="true"
          router
        >
          <el-menu-item index="/">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <!-- 动态侧边栏 -->
          <div v-for="item in userInfo.menus" :key="item.id" >
            <!-- 有目录 -->
            <el-submenu :index="item.id+''" v-if="item.children">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{item.title}}</span>
              </template>
              <el-menu-item-group>
                <!-- :index="i.url"成了变量所以加个冒号 -->
                <el-menu-item v-for="i in item.children" :key="i.id" :index="i.url">{{i.title}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            
            <!-- 没有目录 -->
            <el-menu-item :index="item.url" v-else>
              <span slot="title">{{item.title}}</span>
            </el-menu-item>
          </div>
          
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          {{userInfo.username}}
          <!-- 点击退出后清除缓存，本地存储和vuex都要清除 -->
          <el-button type="primary" @click="logOut">退出</el-button>
        </el-header>

        <el-main>
          <!-- 面包屑 -->
          <el-breadcrumb separator="/" v-if="$route.name">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
          </el-breadcrumb>
          <!-- 二级路由出口 -->
          <router-view class="con"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      userInfo: "userInfo",
    }),
  },
  methods: {
    // 为了退出清除，所以先调取过来
    ...mapActions(["changeUserInfoAction"]),
    // 点击退出后清除缓存，本地存储和vuex都要清除
    logOut() {
      this.changeUserInfoAction({});
      // 同时跳转到登录页面
      this.$router.push("/login");
    },
  },
  mounted() {},
};
</script>

<style scoped>
.wrapper {
  height: 100vh;
}
.el-aside {
  background: #20222a;
}
.el-header {
  background: #b3c0d1;
}
.con {
  padding-top: 20px;
}
</style>