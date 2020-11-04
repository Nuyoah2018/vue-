<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>
    <!-- 表格 -->
    <v-list :list="list" @edit="willUpdate($event)" @init="getInit"></v-list>
    <!-- 表单 -->
    <v-add ref="add" :info="info" @init="getInit" ></v-add>
  </div>
</template>
<script>
import vList from "./components/list.vue";
import vAdd from "./components/add.vue";
import { reqRoleList } from "../../uitls/request";
import axios from "axios";
export default {
  components: {
    vList,
    vAdd,
  },
  data() {
    return {
      //传递给add 的数据，由于子组件add 要直接修改isshow，所以不能传递简单类型，需要传递一个引用类型
      //这样才可以实现 子组件直接修改，也起作用
      info: {
        //add 组件的弹框出现的状态
        isshow: false,
        title: "添加角色",
      },
      //列表数据
      list: [],
    };
  },
  methods: {
    // 点击添加
    willAdd() {
      this.info.isshow = true;
      this.info.title = "角色添加";
    },
    // 获取角色列表
    getInit() {
      reqRoleList().then((res) => {
        this.list=res.data.list
      });
    },
    // 编辑
    willUpdate(id){
         this.info.isshow = true;
          this.info.title = "角色编辑";
          this.$refs.add.getOne(id)
    }
  },
  mounted() {
    this.getInit();
  },
};
</script>
<style scoped>
</style>