<template>
<div>
    <v-list @edit="willUpdate($event)"></v-list>
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
    // 点击编辑
    willUpdate(uid){
     this.info.isshow = true;
      this.info.title = "编辑";
    // 父组件调用子组件方法，使用ref
     this.$refs.add.getOne(uid);
    }
},
mounted(){
}
}
</script>
<style scoped>
</style>