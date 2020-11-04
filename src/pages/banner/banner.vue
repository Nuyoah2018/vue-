<template>
<div>
    <el-button type="primary" @click="btn">添加</el-button>
    <v-list :info="info" @edit="willUpdate($event)"></v-list>
    <v-add :info="info" ref="add"></v-add>
</div>
</template>
<script>
import vList from "./components/list"
import vAdd from "./components/add"
export default {
components:{
    vList,
    vAdd
 },
data () {
 return {
     info:{
         isshow:false,
         title:""
     }
 }
},
methods:{
    btn(){
        this.info.isshow=true
        this.info.title="添加轮播图"
        
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