<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>
    <!-- 表格 -->
    <!-- ($event)接收list里传过来的id -->
    <v-list :list="list" @edit="willUpdate($event)" @init="getInit"></v-list>
    <!-- 添加 -->
    <!-- add发送请求触发init,调用getInit重新加载页面 -->
    <v-add ref="add" :info="info" :list="list" @init="getInit"></v-add>
  </div>
</template>
<script>
import vList from "./components/list";
import vAdd from "./components/add";
import axios from "axios";
import {reqMenuList} from "../../uitls/request"
export default {
  components: {
    vList,
    vAdd,
  },
  data() {
    return {
      //传递给add 的数据，由于子组件add 要直接修改isshow，所以不能传递简单类型，需要传递一个引用类型
      //这样才可以实现 子组件直接修改，也起作用
      //   弹窗相关的状态
      info: {
        isShow: false,
        title: "添加菜单", //默认添加菜单
      },
      //  列表数据
      list: [],
    };
  },
  methods: {
    // 点击弹出
    willAdd() {
      this.info.isShow = true;
      this.info.title = "添加菜单";
    //   调用add的empty()方法，清空数据
    this.$refs.add.empty()
    },
    //  一进来就发请求
    getInit() {
      reqMenuList().then((res) => {
        this.list = res.data.list;
      });
    },
    // 点击编辑，弹出框，传给子组件
    willUpdate(id) {
      this.info.isShow = true;
      this.info.title = "编辑菜单";
      // 根据id,add发起获取一条数据的请求
      // 父组件要调用子组件的方法或属性
      this.$refs.add.getOne(id);
    },
  },
  mounted() {
    //一进来 获取list数据
    this.getInit();
  },
};
</script>
<style scoped>
</style>