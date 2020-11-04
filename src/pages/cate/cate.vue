<template>
  <div>
    <el-button type="primary" @click="btn">添加</el-button>
    <v-list :info="info" @edit="willUpdate($event)"></v-list>
    <v-add ref="add" :info="info"></v-add>
  </div>
</template>
<script>
import vList from "./components/list.vue";
import vAdd from "./components/add.vue";
export default {
  components: {
    vList,
    vAdd,
  },
  data() {
    return {
      info: {
        //传递给add 的数据，由于子组件add 要直接修改isshow，所以不能传递简单类型，需要传递一个引用类型
        //这样才可以实现 子组件直接修改，也起作用
        //定义add 组件的弹框出现的状态
        isshow: false,
        title: "",
      },
    };
  },
  methods: {
    btn() {
      this.info.isshow = true;
      this.info.title = "添加商品分类";
      this.$refs.add.empty()//重置form
    },
    //点了编辑
    willUpdate(id) {
      this.info.isshow = true;
      this.info.title = "编辑商品分类";
      //经过父组件拿到add的方法。获取一条数据
      //父组件要调用子组件的方法或者属性
      this.$refs.add.getOne(id);
    },
  },
  mounted() {},
};
</script>
<style scoped>
</style>