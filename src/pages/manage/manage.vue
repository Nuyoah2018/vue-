<template>
  <div>
    <el-button type="primary" @click="btn">添加</el-button>
    <v-list :List="list" :info="info" @init="getInit" @edit="willUpdate($event)"></v-list>
    <v-add :info="info" @init="getInit" ref="add"></v-add>

    <!-- 分页 
      page-size :设置一页有几条数据 ，默认是10 
      total:总数
      current-change :当前页码发生改变的时候触发
    
    -->
    <el-pagination
      layout="prev, pager, next"
      :page-size="2"
      @current-change="changePage"
      :total="total"
    ></el-pagination>
  </div>
</template>
<script>
import vList from "./components/list.vue";
import vAdd from "./components/add.vue";
import axios from "axios";
import {
  reqManageList,
  reqRoleList,
  reqManageCount,
} from "../../uitls/request";
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
      //总数
      total: 0,
      //一页的数量
      size: 2,
      //页码
      page: 1,
    };
  },
  methods: {
    btn() {
      this.info.isshow = true;
      this.info.title = "添加角色";
    },

    // 编辑
    willUpdate(uid) {
      this.info.isshow = true;
      this.info.title = "角色编辑";
      this.$refs.add.getOne(uid);
    },
    // 一进来就发送请求/管理员总数（用于计算分页）
    // 因为是分页，调取列表刷新只是当前显示的列表数据。一进来页面就要先调取getInit刷新总数更新一下
    getInit() {
      reqManageCount().then((res) => {
        if (res.data.code == 200) {
          this.total = res.data.list[0].total;
        }
      });
      // 一进页面就让页码成两条，所以先调取
      this.dataList();
    },
    // 管理员列表
    dataList() {
      // 一进来页面先让它取两条数据,使用变量获取
      reqManageList({ size: this.size, page: this.page }).then((res) => {
        if (res.data.code == 200) {
          // this.List=res.data.list
          // 如果取到了的数据是null，那么应该赋值一个空数组
          // 判断res.data.list有没有，如果有就res.data.list。如果没有就是[],这样就是没有报错
          let list = res.data.list ? res.data.list : [];
          // 如果list是空数组，这个时候应该看一下当前页是不是第一页
          // 如果是在第一页，就赋值
          // 如果不是在第一页，假设在第四页，这时候，就应该访问第三页的两条数据
          // 如果list是空数组和page分页大于一页
          if (list.length === 0 && this.page > 1) {
            // 就减一页
            this.page--;
            this.dataList();
            return;
          }
          this.list = list;
        }
      });
    },
    // 页码改变后发生的函数changePage
    changePage(page) {
      this.page = page;
      // 页码发生改变时，调取一下，重新获取列表
      this.dataList();
    },
  },
  mounted() {
    // 调用
    this.getInit();
    this.dataList();
  },
};
</script>
<style scoped>
</style>