<template>
  <div>
    <el-button type="primary" @click="btn" >添加</el-button>
    <!--@edit="willUpdate($event):接收list页面中的调取，在此父组件中写事件，调给list页面  -->
    <v-list  @edit="willUpdate($event)"></v-list>
    <v-add :info="info" ref="add"></v-add>
  </div>
</template>
<script>
import vList from "./components/list.vue";
import vAdd from "./components/add.vue";
export default {
components:{
    vList,
    vAdd
 },
data () {
 return {
      info:{
        isshow: false,
        title: "",
    },
 }
},
methods:{
    // 点击添加弹窗
    btn(){
        this.info.isshow = true;
      this.info.title = "添加规格";  
       this.$refs.add.empty()
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
mounted(){
}
}
</script>
<style scoped>
</style>