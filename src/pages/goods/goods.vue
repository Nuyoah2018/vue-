<template>
  <div>
    <el-button type="primary" @click="btn">添加</el-button>
    <v-add :info="info" ref="add"></v-add>
    <v-list @edit="willUpdate($event)"></v-list>
  </div>
</template>
<script>
import vAdd from "./components/add.vue";
import vList from "./components/list.vue";
export default {
  components: {
    vAdd,
    vList,
  },
  data() {
    return {
           info:{
        isshow: false,
        title: "",
      },
    };
  },
  methods: {
    
       // 点击添加弹窗
    btn(){
        this.info.isshow = true;
      this.info.title = "商品管理";  
       this.$refs.add.empty()
    },
    // 点击编辑的事件
    willUpdate(id){
        this.info.isshow = true;
      this.info.title = "商品编辑";  
      //经过父组件拿到add的方法。获取一条数据
      //父组件要调用子组件的方法或者属性
      this.$refs.add.getOne(id);
    }
  },
  mounted() {},
};
</script>
<style scoped>
</style>